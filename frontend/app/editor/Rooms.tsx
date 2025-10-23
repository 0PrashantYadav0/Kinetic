import React, { useEffect, useState, useRef } from 'react'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import BasicButton from '@/components/BasicButton'
import signal from '@/utils/signal'
import { useModal } from '../hooks/useModal'
import RoomItem from './RoomItem'
import { toast } from 'react-toastify'

type RoomsProps = {
    rooms: string[]
    setRooms: (rooms: string[]) => void
    roomIndex: number
    setRoomIndex: (index: number) => void
}

const Rooms:React.FC<RoomsProps> = ({ rooms, setRooms, roomIndex, setRoomIndex }) => {
    const roomsContainerRef = useRef<HTMLDivElement>(null)
    const { setModal, setLoadingText }= useModal()
    const firstRender = useRef(true)

    function onClickCreateRoom() {
        if (rooms.length >= 50) {
            toast.error('You can only have up to 50 rooms.')
            return
        }

        signal.emit('createRoom')
    }

    useEffect(() => {
        // scroll when new room is created
        if (firstRender.current === false) {
            roomsContainerRef.current?.scrollTo(0, roomsContainerRef.current.scrollHeight)
        }

        const onNewRoom = (newRoom: string) => {
            setRooms([...rooms, newRoom])
            firstRender.current = false
        }

        const onLoadingRoom = () => {
            setModal('Loading')
            setLoadingText('Loading room...')
        }

        const onRoomChanged = (index: number) => {
            setRoomIndex(index)
            setModal('None')
        }

        const onRoomDeleted = ({ deletedIndex, newIndex }: { deletedIndex: number, newIndex: number }) => {
            setRoomIndex(newIndex)
            const newRooms = [...rooms]
            newRooms.splice(deletedIndex, 1)
            setRooms(newRooms)
        }

        const onRoomNameChanged = ({ index, newName }: { index: number, newName: string }) => {
            const newRooms = [...rooms]
            newRooms[index] = newName
            setRooms(newRooms)
        }

        signal.on('newRoom', onNewRoom)
        signal.on('loadingRoom', onLoadingRoom)
        signal.on('roomChanged', onRoomChanged)
        signal.on('roomDeleted', onRoomDeleted)
        signal.on('roomNameChanged', onRoomNameChanged)

        return () => {
            signal.off('newRoom', onNewRoom)
            signal.off('loadingRoom', onLoadingRoom)
            signal.off('roomChanged', onRoomChanged)
            signal.off('roomDeleted', onRoomDeleted)
            signal.off('roomNameChanged', onRoomNameChanged)
        }
    }, [rooms])

    return (
        <div className='flex flex-col items-center px-3 grow gap-2 w-full'>
                <h1 className='w-full'>Rooms</h1>
                <div className='flex flex-col items-center w-full overflow-y-auto max-h-[150px] gap-1 transparent-scrollbar' ref={roomsContainerRef}>
                    {rooms.map((room, index) => <RoomItem rooms={rooms} selectedRoomIndex={roomIndex} roomIndex={index} roomName={room} setRooms={setRooms} key={index}/>)}
                </div>
                <BasicButton className='flex flex-row items-center gap-1 text-lg mb-4 w-full justify-center' onClick={onClickCreateRoom}>
                    Create Room
                    <PlusCircleIcon className='h-5 cursor-pointer hover:bg-darkblue animate-colors'/>
                </BasicButton>
        </div>
    )
}

export default Rooms