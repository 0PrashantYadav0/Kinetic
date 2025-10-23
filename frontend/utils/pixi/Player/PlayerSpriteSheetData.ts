const data = {
    frames: {
        walk_down_0: {
            frame: { x: 0, y:0, w:48, h:48 },
            sourceSize: { w: 48, h: 48 },
            spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 },
            anchor: {
                x: 0.5,
                y: 1
            }
        },
        walk_down_1: {
            frame: { x: 48, y:0, w:48, h:48 },
            sourceSize: { w: 48, h: 48 },
            spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 },
            anchor: {
                x: 0.5,
                y: 1
            }
        },
        walk_down_2: {
            frame: { x: 96, y:0, w:48, h:48 },
            sourceSize: { w: 48, h: 48 },
            spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 },
            anchor: {
                x: 0.5,
                y: 1
            }
        },
        walk_down_3: {
            frame: { x: 144, y:0, w:48, h:48 },
            sourceSize: { w: 48, h: 48 },
            spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 },
            anchor: {
                x: 0.5,
                y: 1
            }
        },
        walk_left_0: {
            frame: { x: 0, y:48, w:48, h:48 },
            sourceSize: { w: 48, h: 48 },
            spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 },
            anchor: {
                x: 0.5,
                y: 1
            }
        },
        walk_left_1: {
            frame: { x: 48, y:48, w:48, h:48 },
            sourceSize: { w: 48, h: 48 },
            spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 },
            anchor: {
                x: 0.5,
                y: 1
            }
        },
        walk_left_2: {
            frame: { x: 96, y:48, w:48, h:48 },
            sourceSize: { w: 48, h: 48 },
            spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 },
            anchor: {
                x: 0.5,
                y: 1
            }
        },
        walk_left_3: {
            frame: { x: 144, y:48, w:48, h:48 },
            sourceSize: { w: 48, h: 48 },
            spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 },
            anchor: {
                x: 0.5,
                y: 1
            }
        },
        walk_right_0: {
            frame: { x: 0, y:96, w:48, h:48 },
            sourceSize: { w: 48, h: 48 },
            spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 },
            anchor: {
                x: 0.5,
                y: 1
            }
        },
        walk_right_1: {
            frame: { x: 48, y:96, w:48, h:48 },
            sourceSize: { w: 48, h: 48 },
            spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 },
            anchor: {
                x: 0.5,
                y: 1
            }
        },
        walk_right_2: {
            frame: { x: 96, y:96, w:48, h:48 },
            sourceSize: { w: 48, h: 48 },
            spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 },
            anchor: {
                x: 0.5,
                y: 1
            }
        },
        walk_right_3: {
            frame: { x: 144, y:96, w:48, h:48 },
            sourceSize: { w: 48, h: 48 },
            spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 },
            anchor: {
                x: 0.5,
                y: 1
            }
        },
        walk_up_0: {
            frame: { x: 0, y:144, w:48, h:48 },
            sourceSize: { w: 48, h: 48 },
            spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 },
            anchor: {
                x: 0.5,
                y: 1
            }
        },
        walk_up_1: {
            frame: { x: 48, y:144, w:48, h:48 },
            sourceSize: { w: 48, h: 48 },
            spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 },
            anchor: {
                x: 0.5,
                y: 1
            }
        },
        walk_up_2: {
            frame: { x: 96, y:144, w:48, h:48 },
            sourceSize: { w: 48, h: 48 },
            spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 },
            anchor: {
                x: 0.5,
                y: 1
            }
        },
        walk_up_3: {
            frame: { x: 144, y:144, w:48, h:48 },
            sourceSize: { w: 48, h: 48 },
            spriteSourceSize: { x: 0, y: 0, w: 48, h: 48 },
            anchor: {
                x: 0.5,
                y: 1
            }
        }
    },
    meta: {
        image: '',
        format: 'RGBA8888',
        size: { w: 192, h: 192 },
        scale: 1
    },
    animations: {
        idle_down: ['walk_down_1'] ,
        idle_left: ['walk_left_1'],
        idle_right: ['walk_right_1'],
        idle_up: ['walk_up_1'],
        walk_down: ['walk_down_0', 'walk_down_1', 'walk_down_2', 'walk_down_3'],
        walk_left: ['walk_left_0', 'walk_left_1', 'walk_left_2', 'walk_left_3'],
        walk_right: ['walk_right_0', 'walk_right_1', 'walk_right_2', 'walk_right_3'],
        walk_up: ['walk_up_0', 'walk_up_1', 'walk_up_2', 'walk_up_3']
    }
}

export default data