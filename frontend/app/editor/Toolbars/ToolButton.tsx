import React, { useState } from 'react'

type ToolButtonProps = {
    children?: React.ReactNode
    selected: boolean
    onClick?: () => void
    className?: string
    label?: string
    disabled?: boolean
}

const ToolButton:React.FC<ToolButtonProps> = ({ children, selected, onClick, className, label, disabled }) => {
    
    const [showTooltip, setShowTooltip] = useState<boolean>(false)

    const handleShowToolTip = (show: boolean) => {
        if (disabled) {
            setShowTooltip(false)
        } else {
            setShowTooltip(show)
        }

    }

    return (
        <div className='relative' onMouseEnter={() => handleShowToolTip(true)} onMouseLeave={() => handleShowToolTip(false)}>
            <button className={`${selected ? 'bg-light-secondary' : ''} ${disabled ? 'pointer-events-none text-gray-500 cursor-default' : 'hover:bg-light-secondary'} animate-colors aspect-square grid place-items-center rounded-lg p-1 ${className}`} onClick={onClick}>
                {children}
            </button>
            {showTooltip && label && <div className='absolute p-1 px-2 bg-secondary left-12 top-1 rounded-md whitespace-nowrap select-none'>
                {label}
            </div>}
        </div>
        
    )
}
export default ToolButton