import { SpriteSheetTile } from './spritesheet'
import { SpriteSheetData } from './SpriteSheetData'

const width = 1024
const height = 1536
const url = '/sprites/spritesheets/city.png'
const sprites: SpriteSheetTile[] = [
    { name: 'tl_lgrass_trans', x: 0, y: 32, width: 32, height: 32, layer: 'above_floor' },
    { name: 't_lgrass_trans', x: 32, y: 32, width: 32, height: 32, layer: 'above_floor' },
    { name: 'tr_lgrass_trans', x: 64, y: 32, width: 32, height: 32, layer: 'above_floor' },
    { name: 'l_lgrass_trans', x: 0, y: 64, width: 32, height: 32, layer: 'above_floor' },
    { name: 'light_solid_grass', x: 32, y: 0, width: 32, height: 32 },
    { name: 'r_lgrass_trans', x: 64, y: 64, width: 32, height: 32, layer: 'above_floor' },
    { name: 'bl_lgrass_trans', x: 0, y: 96, width: 32, height: 32, layer: 'above_floor' },
    { name: 'b_lgrass_trans', x: 32, y: 96, width: 32, height: 32, layer: 'above_floor' },
    { name: 'br_lgrass_trans', x: 64, y: 96, width: 32, height: 32, layer: 'above_floor' },
    { name: 'light_detailed_grass', x: 64, y: 0, width: 32, height: 32 },
    { name: 'dark_solid_grass', x: 96, y: 0, width: 32, height: 32 },
    { name: 'dark_detailed_grass', x: 128, y: 0, width: 32, height: 32 },
    { name: 'solid_dirt', x: 160, y: 0, width: 32, height: 32 },
    { name: 'detailed_dirt', x: 192, y: 0, width: 32, height: 32 },
    { name: 'solid_sand', x: 224, y: 0, width: 32, height: 32 },
    { name: 'detailed_sand', x: 256, y: 0, width: 32, height: 32 },
    { name: 'light_concrete', x: 288, y: 0, width: 32, height: 32 },
    { name: 'dark_concrete', x: 320, y: 0, width: 32, height: 32 },
    { name: 'dark_bricks_v', x: 416, y: 0, width: 32, height: 32 },
    { name: 'light_bricks_h', x: 448, y: 0, width: 32, height: 32 },
    { name: 'dark_bricks_h', x: 480, y: 0, width: 32, height: 32 },
    { name: 'tl_bricks_v', x: 320, y: 32, width: 32, height: 32 },
    { name: 't_bricks_v', x: 352, y: 32, width: 32, height: 32 },
    { name: 'tr_bricks_v', x: 384, y: 32, width: 32, height: 32 },
    { name: 'l_bricks_v', x: 320, y: 64, width: 32, height: 32 },
    { name: 'light_bricks_v', x: 384, y: 0, width: 32, height: 32 },
    { name: 'r_bricks_v', x: 384, y: 64, width: 32, height: 32 },
    { name: 'bl_bricks_v', x: 320, y: 96, width: 32, height: 32 },
    { name: 'b_bricks_v', x: 352, y: 96, width: 32, height: 32 },
    { name: 'br_bricks_v', x: 384, y: 96, width: 32, height: 32 },
    { name: 'down_sign', x: 512, y: 32, width: 32, height: 64, layer: 'object', colliders: [{ x: 0, y: 1 }] },
    { name: 'left_sign', x: 544, y: 32, width: 32, height: 64, layer: 'object', colliders: [{ x: 0, y: 1 }] },
    { name: 'red_car', x: 640, y: 0, width: 160, height: 96, layer: 'object', colliders: [
        { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 }, 
        { x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 }
    ] }
]

const citySpriteSheetData = new SpriteSheetData(width, height, url, sprites)

export { citySpriteSheetData }