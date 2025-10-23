import * as PIXI from 'pixi.js'
import { citySpriteSheetData } from './city'
import { groundSpriteSheetData } from './ground'
import { grasslandsSpriteSheetData } from './grasslands'
import { villageSpriteSheetData } from './village'
import { Layer } from '../types'
import { SpriteSheetData } from './SpriteSheetData'

export type Collider = {
    x: number,
    y: number,
}

export interface SpriteSheetTile {
    name: string,
    x: number
    y: number
    width: number
    height: number
    layer?: Layer
    colliders?: Collider[]
}

type Sheets = {
    [key in SheetName]?: PIXI.Spritesheet
}

export type SheetName = 'ground' | 'grasslands' | 'village' | 'city'

class Sprites {
    public spriteSheetDataSet: { [key in SheetName]: SpriteSheetData } = {
        ground: groundSpriteSheetData,
        city: citySpriteSheetData,
        grasslands: grasslandsSpriteSheetData,
        village: villageSpriteSheetData,
    }
    public sheets: Sheets = {}

    public async load(sheetName: SheetName) {
        if (!this.spriteSheetDataSet[sheetName]) {
            throw new Error(`Sheet ${sheetName} not found`)
        }

        if (this.sheets[sheetName]) {
            return
        }

        await PIXI.Assets.load(this.spriteSheetDataSet[sheetName].url)
        this.sheets[sheetName] = new PIXI.Spritesheet(PIXI.Texture.from(this.spriteSheetDataSet[sheetName].url), this.getSpriteSheetData(this.spriteSheetDataSet[sheetName]))
        await this.sheets[sheetName]!.parse()
    }

    public async getSpriteForTileJSON(tilename: string) {
        const [sheetName, spriteName] = tilename.split('-')
        await this.load(sheetName as SheetName)
        return {
            sprite: this.getSprite(sheetName as SheetName, spriteName),
            data: this.getSpriteData(sheetName as SheetName, spriteName),
        }
    }

    public getSprite(sheetName: SheetName, spriteName: string) {
        if (!this.sheets[sheetName]) {
            throw new Error(`Sheet ${sheetName} not found`)
        }

        if (!this.sheets[sheetName]!.textures[spriteName]) {
            throw new Error(`Sprite ${spriteName} not found in sheet ${sheetName}`)
        }

        const sprite = new PIXI.Sprite(this.sheets[sheetName]!.textures[spriteName])
        return sprite
    }

    public getSpriteLayer(sheetName: SheetName, spriteName: string) {
        if (!this.spriteSheetDataSet[sheetName]) {
            throw new Error(`Sheet ${sheetName} not found`)
        }

        if (!this.spriteSheetDataSet[sheetName].sprites[spriteName]) {
            throw new Error(`Sprite ${spriteName} not found in sheet ${sheetName}`)
        }

        return this.spriteSheetDataSet[sheetName].sprites[spriteName].layer || 'floor'
    }

    public getSpriteData(sheetName: SheetName, spriteName: string) {
        if (!this.spriteSheetDataSet[sheetName]) {
            throw new Error(`Sheet ${sheetName} not found`)
        }

        if (!this.spriteSheetDataSet[sheetName].sprites[spriteName]) {
            throw new Error(`Sprite ${spriteName} not found in sheet ${sheetName}`)
        }

        return this.spriteSheetDataSet[sheetName].sprites[spriteName]
    }

    private getSpriteSheetData(data: SpriteSheetData) {
        const spriteSheetData = {
            frames: {} as any,
            meta: {
                image: data.url,
                size: {
                    w: data.width,
                    h: data.height
                },
                format: 'RGBA8888',
                scale: 1
            },
            animations: {}
        }

        for (const spriteData of data.spritesList) {
            if (spriteData.name === 'empty') {
                continue
            }

            spriteSheetData.frames[spriteData.name] = {
                frame: {
                    x: spriteData.x,
                    y: spriteData.y,
                    w: spriteData.width,
                    h: spriteData.height,
                },
                spriteSourceSize: {
                    x: 0,
                    y: 0,
                    w: spriteData.width,
                    h: spriteData.height,
                },
                sourceSize: {
                    w: spriteData.width,
                    h: spriteData.height,
                },
                anchor: {
                    x: 0,
                    y: 1 - (32 / spriteData.height),
                }
            }
        }

        return spriteSheetData
    }   
}

const sprites = new Sprites()

export { sprites }