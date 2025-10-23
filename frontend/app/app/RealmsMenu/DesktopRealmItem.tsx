import { DotsThreeVertical, Link as LinkIcon, SignIn } from '@phosphor-icons/react'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useModal } from '@/app/hooks/useModal'
import Link from 'next/link'
import { toast } from 'react-toastify'

type DesktopRealmItemProps = {
    name: string,
    id: string,
    shareId: string,
    shared?: boolean,
    playerCount?: number
}

const DesktopRealmItem:React.FC<DesktopRealmItemProps> = ({ name, id, shareId, shared, playerCount }) => {
    
    const [showMenu, setShowMenu] = useState<boolean>(false)  
    const router = useRouter()
    const menuRef = useRef<HTMLDivElement>(null)
    const dotsRef = useRef<HTMLDivElement>(null)
    const { setRealmToDelete, setModal } = useModal()

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node) && dotsRef.current && !dotsRef.current.contains(event.target as Node)) {
                setShowMenu(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    function handleDotsClick() {
        setShowMenu(!showMenu)
    }

    function handleDelete() {
        setRealmToDelete({ name, id })
        setModal('Delete Realm')
    }

    function getLink() {
        if (shared) {
            return `/play/${id}?shareId=${shareId}`
        } else {
            return `/play/${id}`
        }
    }

    function copyShareLink() {
        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}/play/${id}?shareId=${shareId}`)
        toast.success('Link copied!')
    }

    return (
        <div className='relative select-none'>
            <Link href={getLink()}>
                <div className='w-full aspect-video relative rounded-3xl border-4 border-transparent hover:border-light-secondary overflow-hidden'>
                    {/* Background pulse animation */}
                    <div className='animate-pulse bg-secondary absolute inset-0' />
                    
                    {/* Thumbnail image */}
                    <img 
                        src='/thumbnail.png' 
                        className='absolute z-10' 
                        style={{imageRendering: 'pixelated'}} 
                    />
                    
                    {/* Hover effect and sign-in icon */}
                    <div className='absolute inset-0 grid place-items-center z-20 opacity-0 hover:opacity-100 transition-opacity duration-300'>
                        <div className='rounded-full bg-black bg-opacity-70 grid place-items-center absolute p-2'>
                            <SignIn className='w-8 h-8' />
                        </div>
                    </div>
                    
                    {/* Player count indicator */}
                    {playerCount != null && (
                        <div className='pointer-events-none absolute top-2 left-2 rounded-full px-2 py-1 flex items-center gap-2 bg-black bg-opacity-80 max-w-max z-30'>
                            <div className='bg-green-500 w-3 h-3 rounded-full' />
                            <p className='text-sm'>{playerCount}</p>
                        </div>
                    )}
                </div>
            </Link>
            <div className='mt-2 flex flex-row justify-between'>
                <p className='text-sm font-semibold'>{name}</p>
                {!shared && (
                    <div className='flex flex-row'>
                        <LinkIcon className='h-7 w-7 cursor-pointer hover:bg-[#545C8E] rounded-md p-1 animate-colors' onClick={copyShareLink}/>
                    <div ref={dotsRef}>
                        <DotsThreeVertical weight='bold' className='h-7 w-7 cursor-pointer hover:bg-[#545C8E] rounded-md p-1 animate-colors' onClick={handleDotsClick}/>
                    </div>
                </div>)}
            </div>
            {showMenu && (
                <div className='absolute w-36 h-24 rounded-lg bg-white right-0 flex flex-col z-10 text-black' ref={menuRef}>
                    <button className='grow w-full hover:bg-[#B2C5FF] rounded-t-lg text-left pl-4' onClick={() => router.push(`/editor/${id}`)}>
                        Edit Map
                    </button>
                    <button className='grow w-full hover:bg-[#B2C5FF] text-left pl-4' onClick={() => router.push(`/manage/${id}`)}>Manage</button>
                    <button className='grow w-full hover:bg-red-500 hover:text-white rounded-b-lg text-left pl-4' onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    )
}

export default DesktopRealmItem