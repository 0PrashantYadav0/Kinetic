import React from 'react'

type SpecialTileItemProps = {
    children: React.ReactNode
    iconColor: 'red' | 'blue' | 'green' | 'yellow'
    title: string,
    description: string
    selected: boolean
    onClick: () => void
}

const SpecialTileItem:React.FC<SpecialTileItemProps> = ({ children, iconColor, title, description, selected, onClick }) => {
    
    function getColorClassName() {
        switch (iconColor) {
            case 'red':
                return 'bg-red-500'
            case 'blue':
                return 'bg-blue-500'
            case 'green':
                return 'bg-green-500'
            case 'yellow':
                return 'bg-yellow-500'
        }
    }

    return (
        <div className={`${selected ? 'bg-light-secondary' : ''} w-full hover:bg-light-secondary cursor-pointer animate-colors`} onClick={onClick}>
            <div className='flex flex-row items-center gap-4 p-8 h-24 w-[400px]'>
                <div className={`${getColorClassName()} rounded-md p-1`}>
                    {children}
                </div>
                <div className='flex flex-col'>
                    <h1 className='text-lg font-bold'>{title}</h1>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    )
}

export default SpecialTileItem