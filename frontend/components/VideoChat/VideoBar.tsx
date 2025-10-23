import React, { useEffect, useRef, useState } from 'react'
import { IAgoraRTCRemoteUser } from 'agora-rtc-sdk-ng'
import signal from '@/utils/signal'
import { MicrophoneSlash } from '@phosphor-icons/react'
import AnimatedCharacter from '@/app/play/SkinMenu/AnimatedCharacter'

interface RemoteUser {
    uid: string
    micEnabled: boolean
    cameraEnabled: boolean
    user: IAgoraRTCRemoteUser
}

const VideoBar:React.FC = () => {

    const [remoteUsers, setRemoteUsers] = useState<{ [uid: string]: RemoteUser }>({})

    useEffect(() => {
        const onUserInfoUpdated = (user: IAgoraRTCRemoteUser) => {
            setRemoteUsers(prev => ({ ...prev, [user.uid]: {
                uid: user.uid.toString(),
                micEnabled: user.hasAudio,
                cameraEnabled: user.hasVideo,
                user: user,
            } }))
        }
        const onResetUsers = () => {
            setRemoteUsers({})
        }
        const onUserLeft = (user: IAgoraRTCRemoteUser) => {
            setRemoteUsers(prev => {
                const newUsers = { ...prev }
                delete newUsers[user.uid]
                return newUsers
            })
        }

        signal.on('user-info-updated', onUserInfoUpdated)
        signal.on('reset-users', onResetUsers)
        signal.on('user-left', onUserLeft)
        return () => {
            signal.off('user-info-updated', onUserInfoUpdated)
            signal.off('reset-users', onResetUsers)
            signal.off('user-left', onUserLeft)
        }

    }, [remoteUsers])

    return (
        <main className='absolute z-10 w-full flex flex-col items-center pt-2 top-0'>
            <section className='flex flex-row items-center gap-4' id='video-container'>
                {Object.values(remoteUsers).map(user => (
                    <RemoteUser key={user.uid} user={user} />
                ))}
            </section>
        </main>
    )
}

export default VideoBar

function RemoteUser({ user }: { user: RemoteUser }) {

    const containerRef = useRef<HTMLDivElement>(null)
    const [skin, setSkin] = useState<string>('')

    useEffect(() => {
        const onVideoSkin = (data: { skin: string, uid: string }) => {
            const slicedUid = user.user.uid.toString().slice(0, 36)
            if (data.uid === slicedUid) {
                setSkin(data.skin)
            }
        }

        signal.on('video-skin', onVideoSkin)

        signal.emit('getSkinForUid', user.user.uid.toString().slice(0, 36))
        return () => {
            signal.off('video-skin', onVideoSkin)
        }
    }, [])

    useEffect(() => {
        if (user.cameraEnabled) {
            // if the container has a child, remove it
            if (containerRef.current?.firstChild) {
                containerRef.current.removeChild(containerRef.current.firstChild)
            }

            user.user.videoTrack?.play(`remote-user-${user.uid}`)
        }

    }, [user])

    return (
        <div className='w-[233px] h-[130px] bg-[#0f0f1d] bg-opacity-90 rounded-lg overflow-hidden relative'>
            <div className='absolute w-full h-full grid place-items-center'>
                <div className='w-[48px] h-[48px] bg-[#222222] rounded-full border-2 border-[#424A61] grid place-items-center overflow-hidden'>
                    {skin && <AnimatedCharacter src={`/sprites/characters/Character_${skin}.png`} noAnimation className='w-full h-full relative bottom-1'/>}
                </div>
            </div>
            <div ref={containerRef} id={`remote-user-${user.uid}`} className='w-full h-full'></div>
            <p className='absolute bottom-1 left-2 bg-black bg-opacity-70 rounded-full z-10 text-xs p-1 px-2 select-none flex flex-row items-center gap-1'>
                {!user.micEnabled && <MicrophoneSlash className='w-3 h-3 text-[#FF2F49]' />}
                {user.uid.slice(36)}
            </p>
        </div>
    )
}