'use client'
import React, { useState } from 'react'
import Dropdown from '../../components/Dropdown'
import { SheetName } from '@/utils/pixi/spritesheet/spritesheet'
import TileMenuGrid from './TileMenuGrid'
import Rooms from './Rooms'
import { TileWithPalette } from './Editor'
import { Layer } from '@/utils/pixi/types'
import ToolButton from './Toolbars/ToolButton'
import { Wall, FlowerTulip, Couch } from '@phosphor-icons/react'

type TileMenuProps = {
    selectedTile: TileWithPalette,
    setSelectedTile: (tile: TileWithPalette) => void
    rooms: string[]
    setRooms: (rooms: string[]) => void
    roomIndex: number
    setRoomIndex: (index: number) => void
    palettes: SheetName[]
    selectedPalette: SheetName
    setSelectedPalette: (palette: SheetName) => void
}


const TileMenu:React.FC<TileMenuProps> = ({ selectedTile, setSelectedTile, rooms, setRooms, roomIndex, setRoomIndex, palettes, selectedPalette, setSelectedPalette }) => {

    const [selectedLayer, setSelectedLayer] = useState<Layer>('floor')

    return (
        <div className='flex flex-col items-center gap-2 p-2'>
            <div className='flex flex-row items-center justify-between w-full'>
                Palette
                <Dropdown items={palettes} selectedItem={selectedPalette} setSelectedItem={setSelectedPalette}/>
            </div>
            <div className='w-full flex flex-row gap-2'>
                <ToolButton selected={selectedLayer === 'floor'} onClick={() => setSelectedLayer('floor')}>
                    <Wall className='w-8 h-8'/>
                </ToolButton>
                <ToolButton selected={selectedLayer === 'above_floor'} onClick={() => setSelectedLayer('above_floor')}>
                    <FlowerTulip className='w-8 h-8'/>
                </ToolButton>
                <ToolButton selected={selectedLayer === 'object'} onClick={() => setSelectedLayer('object')}>
                    <Couch className='w-8 h-8'/>
                </ToolButton>
            </div>  
            <TileMenuGrid selectedPalette={selectedPalette} selectedTile={selectedTile} setSelectedTile={setSelectedTile} layer={selectedLayer}/>
            <Rooms 
                rooms={rooms}
                setRooms={setRooms}
                roomIndex={roomIndex}
                setRoomIndex={setRoomIndex}
            />
        </div>  
    )
}

export default TileMenu