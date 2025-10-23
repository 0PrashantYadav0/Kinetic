'use client'
import React, { useRef } from 'react'
import { EditorApp } from '@/utils/pixi/EditorApp'
import { useEffect } from 'react'
import { RealmData } from '@/utils/pixi/types'
import { useModal } from '../hooks/useModal'

type PixiEditorProps = {
    className?: string
    setGameLoaded: (loaded:boolean) => void
    realmData: RealmData
}

const PixiEditor:React.FC<PixiEditorProps> = ({ className, setGameLoaded, realmData }) => {

    const appRef = useRef<EditorApp | null>(null)
    const { setModal, setLoadingText } = useModal()

    useEffect(() => {
        const mount = async () => {
            const app = new EditorApp(realmData)
            appRef.current = app
            setModal('Loading')
            setLoadingText('Loading editor...')
            await app.init()
            setGameLoaded(true)
            setModal('None')

            const pixiApp = app.getApp()
            
            document.getElementById('app-container')!.appendChild(pixiApp.canvas)
        }

        if (!appRef.current) {
            mount()
        }
        
        return () => {
            if (appRef.current) {
                appRef.current.destroy()
            }
        }
    }, [])

    return (
        <div id='app-container' className={`overflow-hidden ${className}`}>
            
        </div>
    )
}

export default PixiEditor
