import * as PIXI from 'pixi.js'
import { Layer, RealmData, ColliderMap, TilePoint, Room } from './types'
import { sprites, Collider } from './spritesheet/spritesheet'

PIXI.TextureStyle.defaultOptions.scaleMode = 'nearest'

export class App {
    protected app: PIXI.Application = new PIXI.Application()
    protected initialized: boolean = false
    protected layers: { [key in Layer]: PIXI.Container } = {
        floor: new PIXI.Container(),
        above_floor: new PIXI.Container(),
        object: new PIXI.Container(),
    }
    public currentRoomIndex: number = 0    
    public realmData: RealmData
    protected collidersFromSpritesMap: ColliderMap = {}
    protected backgroundColor: number = 0x0F0F0F

    constructor(realmData: RealmData) {
        this.realmData = JSON.parse(JSON.stringify(realmData))
    }

    public async init() {
        const container = document.getElementById('app-container')
        if (!container) {
            throw new Error('Container not found')
        }

        await this.app.init({
            resizeTo: container,
            backgroundColor: this.backgroundColor,
            roundPixels: true,
        })
        this.initialized = true

        this.app.stage.addChild(this.layers.floor)
        this.app.stage.addChild(this.layers.above_floor)
        this.app.stage.addChild(this.layers.object)
    }

    protected async loadRoomFromData(room: Room) {
        // Clear the current room
        this.layers.floor.removeChildren()
        this.layers.above_floor.removeChildren()
        this.layers.object.removeChildren()
        this.collidersFromSpritesMap = {}

        for (const [tilePoint, tileData] of Object.entries(room.tilemap)) {
            const floor = tileData.floor
            const above_floor = tileData.above_floor
            const object = tileData.object

            const [x, y] = tilePoint.split(',').map(Number)

            if (floor) {
                await this.placeTileFromJson(x, y, 'floor', floor)
            }

            if (above_floor) {
                await this.placeTileFromJson(x, y, 'above_floor', above_floor)
            }

            if (object) {
                await this.placeTileFromJson(x, y, 'object', object)
            }
        }

        this.sortObjectsByY()
    }

    protected async loadRoom(index: number) {
        const room = this.realmData.rooms[index]
        await this.loadRoomFromData(room)
    }

    private placeTileFromJson = async (x: number, y: number, layer: Layer, tileName: string) => {
        const screenCoordinates = this.convertTileToScreenCoordinates(x, y)
        const { sprite, data } = await sprites.getSpriteForTileJSON(tileName)
        sprite.position.set(screenCoordinates.x, screenCoordinates.y)
        this.layers[layer].addChild(sprite)

        // set up default tile colliders 
        if (data.colliders) {
            data.colliders.forEach((collider) => {
                const colliderCoordinates = this.getTileCoordinatesOfCollider(collider, sprite)

                const key = `${colliderCoordinates.x}, ${colliderCoordinates.y}` as TilePoint
                this.collidersFromSpritesMap[key] = true
            })
        }
    }

    protected getTileCoordinatesOfCollider = (collider: Collider, sprite: PIXI.Sprite) => {
        const topLeftX = sprite.x - sprite.width * sprite.anchor.x
        const topLeftY = sprite.y - sprite.height * sprite.anchor.y

        const gridCoordinates = this.convertScreenToTileCoordinates(topLeftX, topLeftY)

        return {
            x: gridCoordinates.x + collider.x,
            y: gridCoordinates.y + collider.y,
        }
    }

    public getApp = () => {
        if (!this.initialized) {
            throw new Error('App not initialized')
        }

        return this.app
    }

    public convertScreenToTileCoordinates = (x: number, y: number) => {
        const tileSize = 32
        return {
            x: Math.floor(x / tileSize),
            y: Math.floor(y / tileSize),
        }
    }

    public convertTileToScreenCoordinates = (x: number, y: number) => {
        const tileSize = 32
        return {
            x: x * tileSize,
            y: y * tileSize,
        }
    }

    public sortObjectsByY = () => {
        this.layers.object.children.forEach((child) => {
            child.zIndex = this.getZIndex(child)
        })
    }

    public getZIndex = (child: PIXI.ContainerChild) => {
        if (child instanceof PIXI.Sprite) {
            const containerChild = child as PIXI.ContainerChild
            return containerChild.y + 32
        } else {
            return child.y
        }
    }

    public destroy() {
        if (this.initialized) {
            this.app.destroy()
        }
    }
}