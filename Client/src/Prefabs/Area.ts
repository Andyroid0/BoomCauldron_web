import { Scene, GameObjects } from 'phaser'

class Area extends GameObjects.Container {

    constructor(scene: Scene, x: number, y: number) {
        super( scene, x, y )

        // TODO: Add children
        scene.add.existing(this);
        this.x = x;
        this.y = y;

        new GameObjects.Blitter(scene, x, y, texture)
        

    }
}