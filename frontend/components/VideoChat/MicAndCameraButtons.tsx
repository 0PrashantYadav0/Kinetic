import React from 'react'
import { VideoCameraSlash, MicrophoneSlash, VideoCamera, Microphone } from '@phosphor-icons/react'
import { useVideoChat } from '@/app/hooks/useVideoChat'

type MicAndCameraButtonsProps = {
    
}

const MicAndCameraButtons:React.FC<MicAndCameraButtonsProps> = () => {

    const { isCameraMuted, isMicMuted, toggleCamera, toggleMicrophone } = useVideoChat()
    

    const micClass = `w-6 h-6 ${!isMicMuted ? 'text-[#08D6A0]' : 'text-[#FF2F49]'}`
    const cameraClass = `w-6 h-6 ${!isCameraMuted ? 'text-[#08D6A0]' : 'text-[#FF2F49]'}`
    return (
        <section className='flex flex-row gap-2'>
            <button 
                className={`${!isMicMuted ? 'bg-[#2A4B54] hover:bg-[#3b6975]' : 'bg-[#682E44] hover:bg-[#7a3650]'} 
                p-2 rounded-full animate-colors outline-none`}
                onClick={toggleMicrophone}
            >
                {isMicMuted ? <MicrophoneSlash className={micClass} /> : <Microphone className={micClass} />}
            </button>
            <button 
                className={`${!isCameraMuted ? 'bg-[#2A4B54] hover:bg-[#3b6975]' : 'bg-[#682E44] hover:bg-[#7a3650]'} 
                p-2 rounded-full animate-colors outline-none`}
                onClick={toggleCamera}
            >
                {isCameraMuted ? <VideoCameraSlash className={cameraClass} /> : <VideoCamera className={cameraClass} />}
            </button>
        </section>
        
    )
}

export default MicAndCameraButtons