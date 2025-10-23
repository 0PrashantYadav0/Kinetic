import React from 'react'
import SpecialTileItem from './SpecialTileItem'
import { SpecialTile } from '@/utils/pixi/types'
import { Placeholder, FlyingSaucer, Tree, Desk } from '@phosphor-icons/react'

type SpecialTilesProps = {
    specialTile: SpecialTile
    selectSpecialTile: (specialTile: SpecialTile) => void
}

const SpecialTiles:React.FC<SpecialTilesProps> = ({ specialTile, selectSpecialTile }) => {

    return (
        <div className='w-full flex flex-col items-center'>
            <SpecialTileItem 
                iconColor='yellow' 
                title='Private Area' 
                description='Specify an area where players can talk privately.' 
                selected={specialTile === 'Private Area'} 
                onClick={() => selectSpecialTile('Private Area')}>
                <Desk className='w-12 h-12'/>
            </SpecialTileItem>
            <SpecialTileItem 
                iconColor='red' 
                title='Impassable' 
                description='Specify tiles that cannot be walked on.' 
                selected={specialTile === 'Impassable'} 
                onClick={() => selectSpecialTile('Impassable')}>
                <Placeholder className='w-12 h-12'/>
            </SpecialTileItem>
            <SpecialTileItem 
                iconColor='blue' 
                title='Teleport' 
                description='Set up a one-way teleporter between tiles.' 
                selected={specialTile === 'Teleport'} 
                onClick={() => selectSpecialTile('Teleport')}>
                <FlyingSaucer className='w-12 h-12'/>
            </SpecialTileItem>
            <SpecialTileItem 
                iconColor='green' 
                title='Spawn Point' 
                description='Specify where players spawn into your Realm.' 
                selected={specialTile === 'Spawn'} 
                onClick={() => selectSpecialTile('Spawn')}>
                <Tree className='w-12 h-12'/>
            </SpecialTileItem>
        </div>
    )
}

export default SpecialTiles