'use client'
import signal from '@/utils/signal'
import React, { useState, useEffect, useRef } from 'react'
import { Chat, ArrowUpLeft } from '@phosphor-icons/react'

type ChatLogProps = {}

type Message = {
    content: string,
    username: string,
    color?: 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'pink' | 'orange' | 'cyan' | 'white' | 'black'
}

function getColorClass(color: Message['color']) {
    switch (color) {
        case 'red':
            return 'text-red-500'
        case 'blue':
            return 'text-blue-500'
        case 'green':
            return 'text-green-500'
        case 'yellow':
            return 'text-yellow-500'
        case 'purple':
            return 'text-purple-500'
        case 'pink':
            return 'text-pink-500'
        case 'orange':
            return 'text-orange-500'
        case 'cyan':
            return 'text-cyan-500'
        case 'white':
            return 'text-white'
        case 'black':
            return 'text-black'
        default:
            return 'text-white'
    }
}

const ChatLog: React.FC<ChatLogProps> = () => {
    const [messages, setMessages] = useState<Message[]>([])
    const [expanded, setExpanded] = useState(true)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const onNewMessage = (message: Message) => {
            setMessages(prevMessages => [message, ...prevMessages])
            containerRef.current?.scrollTo(0, containerRef.current.scrollHeight)
        }

        const onNewRoomChat = (data: { name: string, channelId: string }) => {
            setMessages([{
                content: `Joined room ${data.name}. ${data.channelId ? 'Chat will be sent to channel: #' + data.channelId : ''}`,
                username: '',
                color: 'green'
            }])
        }

        signal.on('newMessage', onNewMessage)
        signal.on('newRoomChat', onNewRoomChat)

        return () => {
            signal.off('newMessage', onNewMessage)
            signal.off('newRoomChat', onNewRoomChat)
        }
    }, [])

    const expand = () => {
        setExpanded(true)
    }

    const collapse = () => {
        setExpanded(false)
    }

    return (
        <div className='absolute top-0 left-0 hidden sm:flex'>
            {!expanded && (
                <div
                    className='bg-secondary hover:bg-light-secondary animate-colors p-2 grid place-items-center rounded-br-lg cursor-pointer'
                    onClick={expand}
                >
                    <Chat className='h-7 w-7' />
                </div>
            )}
            {expanded && (
                <div className='bg-secondary bg-opacity-80 w-[500px] h-[200px] rounded-br-lg transparent-scrollbar relative p-1'>
                    <div className='cursor-pointer absolute bottom-0 right-0 rounded-tl-lg rounded-br-lg bg-darkblue hover:bg-light-secondary animate-colors bg-opacity-80 p-2' onClick={collapse}>
                        <ArrowUpLeft className='h-4 w-4' />
                    </div>
                    <div className='w-full h-full flex flex-col-reverse overflow-y-scroll p-2 pr-4'>
                        {messages.map((message, index) => (
                            <div key={index} className={getColorClass(message.color)}>
                                {message.username && <span className='font-bold'>{message.username}:</span>} {message.content}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ChatLog
