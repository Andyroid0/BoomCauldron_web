import { Scene, GameObjects } from 'phaser'

class Area extends GameObjects.Container {

    blitter !: GameObjects.Blitter;

    constructor(scene: Scene, x: number, y: number, groundTexture: string) {

        
        super( scene, x, y )

        // TODO: Add children
        scene.add.existing(this);
        this.x = x;
        this.y = y;

        this.blitter = new GameObjects.Blitter(scene, x, y, groundTexture);

        new GameObjects.Bob(this.blitter, 0, 0, 0, true);
        

    }
}

// 144 Tiles