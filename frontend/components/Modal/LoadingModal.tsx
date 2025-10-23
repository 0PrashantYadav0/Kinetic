import React from 'react'
import Modal from './Modal'
import { useModal } from '@/app/hooks/useModal'
import LoadingSpinner from '../LoadingSpinner'

type SaveProps = {
    
}

const LoadingModal:React.FC<SaveProps> = () => {
    
    const { modal, loadingText }  = useModal()

    return (
        <Modal open={modal === 'Loading'} className='bg-transparent'>
            <div className='flex flex-col items-center'>
                <LoadingSpinner />
                <h1>{loadingText}</h1>
            </div>
        </Modal>
    )
}

export default LoadingModal