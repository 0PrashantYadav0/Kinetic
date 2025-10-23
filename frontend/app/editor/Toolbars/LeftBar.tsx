'use client'
import React, { useState, useEffect } from 'react'
import ToolButton from './ToolButton'
import { HandRaisedIcon } from '@heroicons/react/24/outline'
import { Tool, TileMode, SpecialTile, Layer } from '@/utils/pixi/types'
import { MagnifyingGlassPlusIcon, MagnifyingGlassMinusIcon } from '@heroicons/react/24/solid'
import { Eraser, ArrowUUpLeft, ArrowUUpRight } from '@phosphor-icons/react'
import { GridFour, Square, Eye, EyeSlash, Wall, FlowerTulip, Couch, Atom } from '@phosphor-icons/react'
import signal from '@/utils/signal'

type LeftBarProps = {
    tool: Tool,
    tileMode: TileMode,
    selectTool: (tool:Tool) => void
    selectTileMode: (mode: TileMode) => void
    specialTile: SpecialTile
    selectEraserLayer: (layer: Layer | 'gizmo') => void
    eraserLayer: Layer | 'gizmo'
}

const LeftBar:React.FC<LeftBarProps> = ({ tool, tileMode, selectTool, selectTileMode, specialTile, selectEraserLayer, eraserLayer }) => {

    const [showGizmos, setShowGizmos] = useState<boolean>(false)
    const [undoEnabled, setUndoEnabled] = useState<boolean>(false)
    const [redoEnabled, setRedoEnabled] = useState<boolean>(false)

    function toggleShowGizmos() {
        const show = !showGizmos
        setShowGizmos(show)
        signal.emit('showGizmos', show)
    }

    function undo() {
        signal.emit('undo')
    }

    function redo() {
        signal.emit('redo')
    }

    useEffect(() => {

        const onShowGizmos = () => {
            setShowGizmos(true)
        }

        const onUndoEnabled = (enabled: boolean) => {
            setUndoEnabled(enabled)
        }

        const onRedoEnabled = (enabled: boolean) => {
            setRedoEnabled(enabled)
        }

        signal.on('gizmosVisible', onShowGizmos)
        signal.on('undoEnabled', onUndoEnabled)
        signal.on('redoEnabled', onRedoEnabled)

        return () => {
            signal.off('gizmosVisible', onShowGizmos)
            signal.off('undoEnabled', onUndoEnabled)
            signal.off('redoEnabled', onRedoEnabled)
        }
    }, [])

    return (
        <div className='w-[48px] bg-secondary flex flex-col items-center py-1 gap-2'>
            <ToolButton selected={tool === 'Hand'} label={'Hand'} onClick={() => selectTool('Hand')}>
                <HandRaisedIcon className='h-8 w-8 text-white'/>
            </ToolButton>
            <ToolButton selected={tool === 'ZoomIn'} label={'Zoom In'} onClick={() => selectTool('ZoomIn')}>
                <MagnifyingGlassPlusIcon className='h-8 w-8 text-white'/>
            </ToolButton>
            <ToolButton selected={tool === 'ZoomOut'} label={'Zoom Out'} onClick={() => selectTool('ZoomOut')}>
                <MagnifyingGlassMinusIcon className='h-8 w-8 text-white'/>
            </ToolButton>
            <ToolButton selected={tool === 'Eraser'} label={'Eraser'} onClick={() => selectTool('Eraser')}>
                <Eraser className='h-8 w-8'/>
            </ToolButton>
            <div className='w-full h-[2px] bg-black'/>
            <ToolButton selected={tileMode === 'Single'} label={'Single Tile'} onClick={() => selectTileMode('Single')}>
                <Square className='h-8 w-8'/>
            </ToolButton>
            <ToolButton selected={tileMode === 'Rectangle'} label={'Rectangle'} onClick={() => selectTileMode('Rectangle')}>
                <GridFour className='h-8 w-8'/>
            </ToolButton>
            <div className='w-full h-[2px] bg-black'/>
            <ToolButton selected={false} onClick={toggleShowGizmos} label={'Toggle Special Tiles'} className={specialTile !== 'None' ? 'pointer-events-none text-gray-500' : ''}>
                {showGizmos ? <EyeSlash className='h-8 w-8'/> : <Eye className='h-8 w-8'/>}
            </ToolButton>
            <div className='w-full h-[2px] bg-black'/>
            <ToolButton selected={false} label={'Undo'} onClick={undo} disabled={!undoEnabled}>
                <ArrowUUpLeft className='h-8 w-8'/>
            </ToolButton>
            <ToolButton selected={false} label={'Redo'} onClick={redo} disabled={!redoEnabled}>
                <ArrowUUpRight className='h-8 w-8'/>
            </ToolButton>
            <div className='w-full h-[2px] bg-black'/>
            {tool === 'Eraser' && (
                <div className='flex flex-col gap-2'>
                    <ToolButton selected={eraserLayer === 'floor'} label={'Erase Floor'} onClick={() => selectEraserLayer('floor')}>
                        <Wall className='h-8 w-8'/>
                    </ToolButton>
                    <ToolButton selected={eraserLayer === 'above_floor'} label={'Erase Above Floor'} onClick={() => selectEraserLayer('above_floor')}>
                        <FlowerTulip className='h-8 w-8'/>
                    </ToolButton>
                    <ToolButton selected={eraserLayer === 'object'} label={'Erase Objects'} onClick={() => selectEraserLayer('object')}>
                        <Couch className='h-8 w-8'/>
                    </ToolButton>
                    <ToolButton selected={eraserLayer === 'gizmo'} label={'Erase Special Tiles'} onClick={() => selectEraserLayer('gizmo')}>
                        <Atom className='h-8 w-8'/>
                    </ToolButton>
                </div>
            )}
        </div>
    )
}

export default LeftBar