import React from 'react'
import Modal from './Modal'
import { useModal } from '@/app/hooks/useModal'

type FailedToConnectModalProps = {
    
}

const FailedToConnectModal:React.FC<FailedToConnectModalProps> = () => {
    
    const { errorModal, failedConnectionMessage } = useModal()

    const onRetry = () => {
        window.location.reload()
    }

    return (
        <Modal open={errorModal === 'Failed To Connect'}>
            <div className='flex flex-col items-center gap-2 p-4 bg-secondary'>
                <h1 className='text-red-500'>Failed to connect to server.</h1>
                <h1 className='text-red-500'>{failedConnectionMessage}</h1>
                <button className='bg-secondary border-2 border-white hover:bg-light-secondary animate-colors text-white px-2 py-1 rounded-md outline-none' onClick={onRetry}>Retry</button>
            </div>
        </Modal>
    )
}

export default FailedToConnectModal