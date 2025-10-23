import { SpriteSheetTile } from './spritesheet'

export class SpriteSheetData {
    public width: number
    public height: number
    public url: string
    public sprites: { [key: string]: SpriteSheetTile } = {}
    public spritesList: SpriteSheetTile[]

    constructor(width: number, height: number, url: string, spritesList: SpriteSheetTile[]) {
        this.width = width
        this.height = height
        this.url = url
        this.spritesList = spritesList

        for (const sprite of this.spritesList) {
            this.sprites[sprite.name] = sprite
        }
    }
}