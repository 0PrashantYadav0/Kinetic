import React from 'react'
import Modal from './Modal'
import { useModal } from '@/app/hooks/useModal'
import signal from '@/utils/signal'

type DeleteRoomModalProps = {
    
}

const DeleteRoomModal:React.FC<DeleteRoomModalProps> = () => {
    
    const { modal, roomToDelete, setModal } = useModal()

    const onClickDelete = () => {
        setModal('None')
        signal.emit('deleteRoom', roomToDelete.index)   
    }

    const onClickCancel = () => {
        setModal('None')
    }

    return (
        <Modal open={modal === 'Delete Room'} closeOnOutsideClick>
            <div className='p-2 flex flex-col items-center gap-2'>
                <h1 className='text-center'>Are you sure you want to delete <span className='text-red-500'>{roomToDelete.name}</span>? It will be gone forever!</h1>
                <div className='flex flex-row items-center gap-2'>
                    <button className='bg-red-600 hover:bg-red-500 animate-colors text-white px-2 py-1 rounded-md outline-none' onClick={onClickDelete}>Delete</button>
                    <button className='bg-darkblue hover:bg-light-secondary animate-colors text-white px-2 py-1 rounded-md outline-none' onClick={onClickCancel}>Cancel</button>
                </div>
            </div>
        </Modal>
    )
}

export default DeleteRoomModal