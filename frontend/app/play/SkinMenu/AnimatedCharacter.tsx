import React from 'react'

type AnimatedCharacterProps = {
    src: string
    className?: string
    noAnimation?: boolean
}

const AnimatedCharacter:React.FC<AnimatedCharacterProps> = ({ src, className, noAnimation }) => {
    
    return (
        <div className={`relative aspect-square w-20 overflow-hidden ${className}`}>
            <div className={noAnimation ? 'static-character-container' : 'character-container'}>
                <img src={src} style={{imageRendering: 'pixelated'}} className={noAnimation ? 'static-character' : 'character'}/>
            </div>
        </div>
    )
}

export default AnimatedCharacter