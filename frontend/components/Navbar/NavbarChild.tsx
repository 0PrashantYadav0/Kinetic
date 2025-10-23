'use client'
import React from 'react'
import Image from 'next/image'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { useModal } from '@/app/hooks/useModal'
import BasicButton from '../BasicButton'

type NavbarChildProps = {
    name: string,
    avatar_url: string
}

export const NavbarChild:React.FC<NavbarChildProps> = ({ name, avatar_url }) => {

    const { setModal } = useModal()

    return (
        <div className='h-16'>
            <div className='w-full fixed bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50 flex flex-row items-center p-2 pl-8 justify-end sm:justify-between z-10'>
                <BasicButton 
                    onClick={() => setModal('Create Realm')} 
                    className='hidden sm:flex flex-row items-center gap-2 py-3 px-4 bg-gray-700 hover:bg-gray-600 border border-gray-600 hover:border-gray-500 rounded-xl transition-all duration-300 text-white font-medium'
                >
                    Create Space
                    <PlusCircleIcon className='h-5'/>
                </BasicButton>
                <div 
                    className='flex flex-row items-center gap-4 hover:bg-gray-700/50 animate-colors rounded-full cursor-pointer py-2 px-3 select-none transition-all duration-300' 
                    onClick={() => setModal('Account Dropdown')}
                >
                    <p className='text-white font-medium'>{name}</p>
                    <Image alt='avatar' src={avatar_url} width={40} height={40} className='aspect-square rounded-full border-2 border-gray-600' />
                </div>
            </div>
        </div> 
    )
}