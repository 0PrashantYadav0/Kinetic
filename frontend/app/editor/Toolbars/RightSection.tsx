import React, { useState } from 'react'
import TileMenu from '../TileMenu'
import { SpecialTile } from '@/utils/pixi/types'
import SpecialTiles from '../SpecialTiles'
import { SheetName } from '@/utils/pixi/spritesheet/spritesheet'
import { TileWithPalette } from '../Editor'

type RightSectionProps = {
    selectedTile: TileWithPalette
    setSelectedTile: (tile: TileWithPalette) => void
    selectSpecialTile: (specialTile: SpecialTile) => void
    specialTile: SpecialTile
    rooms: string[]
    setRooms: (rooms: string[]) => void
    roomIndex: number
    setRoomIndex: (index: number) => void
    palettes: SheetName[]
    selectedPalette: SheetName
    setSelectedPalette: (palette: SheetName) => void
}

type Tab = 'Tile' | 'Special Tiles'

const RightSection:React.FC<RightSectionProps> = ({ selectedTile, setSelectedTile, specialTile, selectSpecialTile, rooms, setRooms, roomIndex, setRoomIndex, palettes, selectedPalette, setSelectedPalette }) => {
    
    const [tab, setTab] = useState<Tab>('Tile')

    return (
        <div className='w-[400px] bg-secondary flex flex-col select-none'>
            <div className='flex flex-row h-10 px-2 pt-[4px]'>
                <div 
                    className={`grow hover:bg-darkblue animate-colors rounded-t-md cursor-pointer grid place-items-center select-none ${tab === 'Tile' ? 'pointer-events-none bg-light-secondary' : 'bg-secondary'}`}
                    onClick={() => setTab('Tile')}
                >
                    Tiles
                </div>
                <div 
                    className={`grow hover:bg-darkblue animate-colors rounded-t-md cursor-pointer grid place-items-center select-none ${tab === 'Special Tiles' ? 'pointer-events-none bg-light-secondary' : 'bg-secondary'}`}
                    onClick={() => setTab('Special Tiles')}
                >
                    Special Tiles
                </div>
            </div>
            <div className='bg-light-secondary h-[4px]'/>
        <div>
                {tab === 'Tile' && (
                    <TileMenu 
                        selectedTile={selectedTile} 
                        setSelectedTile={setSelectedTile} 
                        rooms={rooms}
                        setRooms={setRooms}
                        roomIndex={roomIndex}
                        setRoomIndex={setRoomIndex}
                        palettes={palettes}
                        selectedPalette={selectedPalette}
                        setSelectedPalette={setSelectedPalette}
                    />
                )}
                {tab === 'Special Tiles' && <SpecialTiles specialTile={specialTile} selectSpecialTile={selectSpecialTile}/>}
            </div>
        </div>
    )
}

export default RightSection