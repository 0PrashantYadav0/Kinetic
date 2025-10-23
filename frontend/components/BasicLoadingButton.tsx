import React from 'react'
import LoadingSpinner from './LoadingSpinner'

type BasicLoadingButtonProps = {
    onClick?: () => void
    loading: boolean
    children?: React.ReactNode
    className?: string
}

const BasicLoadingButton:React.FC<BasicLoadingButtonProps> = ({ onClick, loading, children, className }) => {
    
    return (
        <button className={`bg-quaternary hover:bg-quaternaryhover animate-colors py-1 px-2 rounded-lg text-button relative ${className} ${loading ? 'pointer-events-none' : ''}`} onClick={onClick}>
            <div className={`${loading ? 'opacity-0' : ''} `}>
                {children}
            </div>
            {loading && (
                <div className='grid place-items-center absolute w-full h-full top-0 left-0'>
                    <LoadingSpinner small/>
                </div>
            )}
        </button>
    )
}

export default BasicLoadingButton