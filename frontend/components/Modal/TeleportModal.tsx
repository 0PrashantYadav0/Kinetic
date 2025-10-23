import React, { useState } from 'react'
import Modal from './Modal'
import { useModal } from '@/app/hooks/useModal'
import BasicInput from '../BasicInput'
import BasicButton from '../BasicButton'
import signal from '@/utils/signal'

type TeleportModalProps = {
    
}

const TeleportModal:React.FC<TeleportModalProps> = () => {

    const { modal, setModal, roomList } = useModal()
    const [ selectedRoomIndex, setSelectedRoomIndex ] = useState<number>(0)
    const [ x, setX ] = useState<string>('0')
    const [ y, setY ] = useState<string>('0')

    const onXChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setX(e.target.value)
    }

    const onYChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setY(e.target.value)
    }

    function onSubmit() {
        const xInt = parseInt(x)
        const yInt = parseInt(y)
        signal.emit('teleport', {
            roomIndex: selectedRoomIndex,
            x: xInt,
            y: yInt,
        })
        setModal('None')
    }

    return (
        <Modal open={modal === 'Teleport'} closeOnOutsideClick>
            <div className='flex flex-col items-center gap-4 p-4'>
                <div className='flex flex-row gap-8'>
                    <div className='flex flex-col gap-1 items-center overflow-y-auto transparent-scrollbar max-h-[250px]'>
                        <h1 className='text-lg'>Destination Room</h1>
                        {roomList.map((room, index) => {

                            function selectRoom(index: number) {
                                setSelectedRoomIndex(index)
                            }

                            return (
                                <div 
                                    key={index} 
                                    className={`${selectedRoomIndex === index ? 'border-white' : 'border-secondary'} border-2 bg-quaternary px-1 rounded-lg cursor-pointer w-36 text-center text-button hover:bg-quaternaryhover animate-colors`}
                                    onClick={() => selectRoom(index)}
                                >
                                    {room}
                                </div>
                            )
                        })}
                    </div>
                    <div className='flex flex-col gap-1 items-center'>
                        <h1 className='text-lg'>Coordinates</h1>
                        <div className='flex flex-row gap-1 items-center'>
                            <h1>X:</h1>
                            <BasicInput className='w-12 h-6' type='number' value={x} onChange={onXChange}/>
                            <h1>Y:</h1>
                            <BasicInput className='w-12 h-6' type='number' value={y} onChange={onYChange}/>
                        </div>
                    </div>
                </div>
                <BasicButton onClick={onSubmit} className='text-lg'>
                    Confirm
                </BasicButton>
            </div>
        </Modal>
    )
}

export default TeleportModal