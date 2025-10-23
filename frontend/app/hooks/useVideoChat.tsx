'use client'

import React, { createContext, useContext, ReactNode, useEffect, useState, useMemo, useRef } from 'react'
import signal from '../../utils/signal'

// Dynamic imports for AgoraRTC to avoid SSR issues
let AgoraRTC: any = null
let AgoraRTCProvider: any = null

if (typeof window !== 'undefined') {
    import('agora-rtc-react').then(module => {
        AgoraRTC = module.default
        AgoraRTCProvider = module.AgoraRTCProvider
    })
}
// Dynamic import for videoChat to avoid SSR issues
let videoChat: any = null
if (typeof window !== 'undefined') {
    import('../../utils/video-chat/video-chat').then(module => {
        videoChat = module.videoChat
    })
}

interface VideoChatContextType {
    toggleCamera: () => void
    toggleMicrophone: () => void
    isCameraMuted: boolean
    isMicMuted: boolean
}

const VideoChatContext = createContext<VideoChatContextType | undefined>(undefined)

interface AgoraVideoChatProviderProps {
    children: ReactNode
    uid: string
}

interface VideoChatProviderProps {
  children: ReactNode
}

export const AgoraVideoChatProvider: React.FC<AgoraVideoChatProviderProps> = ({ children }) => {
    const [isClient, setIsClient] = useState(false)
    const [client, setClient] = useState<any>(null)

    useEffect(() => {
        setIsClient(true)
        if (AgoraRTC) {
            const newClient = AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })
            AgoraRTC.setLogLevel(4)
            setClient(newClient)
        }
    }, [])

    if (!isClient || !client || !AgoraRTCProvider) {
        return <VideoChatProvider>{children}</VideoChatProvider>
    }

    return (
        <AgoraRTCProvider client={client}>
            <VideoChatProvider>
                {children}
            </VideoChatProvider>
        </AgoraRTCProvider>
    )
}

const VideoChatProvider: React.FC<VideoChatProviderProps> = ({ children }) => {
    const [isCameraMuted, setIsCameraMuted] = useState(true)
    const [isMicMuted, setIsMicMuted] = useState(true)

    useEffect(() => {
        return () => {
            if (videoChat) {
                videoChat.destroy()
            }
        }
    }, [])

    const toggleCamera = async () => {
        if (videoChat) {
            const muted = await videoChat.toggleCamera()
            setIsCameraMuted(muted)
        }
    }

    const toggleMicrophone = async () => {
        if (videoChat) {
            const muted = await videoChat.toggleMicrophone()
            setIsMicMuted(muted)
        }
    }

    const value: VideoChatContextType = {
        toggleCamera,
        toggleMicrophone,
        isCameraMuted,
        isMicMuted,
    }

    return (
        <VideoChatContext.Provider value={value}>
            {children}
        </VideoChatContext.Provider>
    )
}

export const useVideoChat = () => {
  const context = useContext(VideoChatContext)
  if (context === undefined) {
    throw new Error('useVideoChat must be used within a VideoChatProvider')
  }
  return context
}