import React, { useEffect, useRef, useState } from 'react'
import signal from '@/utils/signal'
import { useModal } from '../hooks/useModal'
import { Trash } from '@phosphor-icons/react'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-toastify'
import { removeExtraSpaces, formatForComparison } from '@/utils/removeExtraSpaces'

type RoomItemProps = {
    rooms: string[]
    selectedRoomIndex: number
    roomIndex: number
    roomName: string,
    setRooms: (rooms: string[]) => void
}

const RoomItem:React.FC<RoomItemProps> = ({ rooms, selectedRoomIndex, roomIndex, roomName, setRooms }) => {
    
    const { setModal, setRoomToDelete } = useModal()
    const inputRef = useRef<HTMLInputElement>(null)
    const [inputDisabled, setInputDisabled] = useState<boolean>(true)
    const previousRoomName = useRef<string>(roomName)

    const onRoomClick = () => {
        if (selectedRoomIndex === roomIndex) return

        signal.emit('changeRoom', roomIndex)
    }

    const onTrashClick = (e: React.MouseEvent<SVGSVGElement>) => {
        e.stopPropagation()
        setModal('Delete Room')
        setRoomToDelete({
            name: roomName,
            index: roomIndex
        })
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = e.target.value
        newValue = removeExtraSpaces(newValue)
        signal.emit('changeRoomName', { index: roomIndex, newName: newValue })
    }

    const onPencilClick = (e: React.MouseEvent<SVGSVGElement>) => {
        e.stopPropagation()
        setInputDisabled(false)
        inputRef.current?.focus()
        inputRef.current?.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length)

        if (inputRef.current?.value) {
            previousRoomName.current = inputRef.current.value
        }
    }

    function roomNameAlreadyExists(newName: string) {
        newName = formatForComparison(newName)
        // check if newName exists twice in the array
        let count = 0
        rooms.forEach(room => {
            const roomName = formatForComparison(room)
            if (roomName === newName) count++
        })

        return count > 1
    }

    function revertRoomName() {
        const newRooms = [...rooms]
        newRooms[roomIndex] = previousRoomName.current
        setRooms(newRooms)
        signal.emit('changeRoomName', { index: roomIndex, newName: previousRoomName.current })
    }

    function fixRoomNameErrors() {
        if (roomNameAlreadyExists(rooms[roomIndex])) {
            revertRoomName()
            toast.error('Room names must be unique.')
            return
        } else if (rooms[roomIndex].trim() === '') {
            revertRoomName()
            toast.error('Room name cannot be empty.')
            return
        } 
    }

    useEffect(() => {
        // add event listener for inputRef on blur 
        const onBlur = () => {
            setInputDisabled(true)

            fixRoomNameErrors()
        }

        inputRef.current?.addEventListener('blur', onBlur)

        return () => {
            inputRef.current?.removeEventListener('blur', onBlur)
        }
    }, [rooms, roomIndex])

    return (
        <div 
            onClick={onRoomClick} 
            className={`${selectedRoomIndex === roomIndex ? 'bg-light-secondary' : 'bg-darkblue cursor-pointer'} hover:bg-light-secondary w-full p-1 px-2 rounded-md flex flex-row items-center justify-between animate-colors`} 
        >
            <input type='text' value={rooms[roomIndex]} className={`${inputDisabled ? 'pointer-events-none' : ''} grow bg-transparent outline-none select-none`} ref={inputRef} onChange={onInputChange} maxLength={32}/>
            <div className='flex flex-row items-center gap-1'>
                <PencilSquareIcon className='h-5 w-5 cursor-pointer hover:bg-darkblue rounded-md p-[2px] animate-colors' onClick={onPencilClick}/>
                <Trash className={`h-5 w-5 cursor-pointer hover:bg-darkblue rounded-md p-[2px] animate-colors ${rooms.length <= 1 ? 'hidden' : ''}`} onClick={onTrashClick}/>
            </div>
        </div>
    )
}

export default RoomItem