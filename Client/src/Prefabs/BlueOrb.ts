import Phaser, { Scene } from 'phaser'
import DurationDestroyer from './DurationDestroyer';


/**
 * Instantiates as a BlueOrb
 * @param world [Matter.World] : The physics world simulation to be added to
 * @param scene [Phaser.Scene] : the scene that this will be instantiated to
 * @param position [object] : the position to instantiate at (x and y coodinates)
 * @param velocity [object] : x and y velocity
 * @param duration [object] : milliseconds until self destruction
 * @returns a BlueOrb
 */
export default class BlueOrb extends Phaser.Physics.Matter.Sprite
{
	constructor(world: Phaser.Physics.Matter.World, scene: Phaser.Scene, position: {x: number, y: number} , velocity: {x: number, y: number}, duration?: number) {

		super( world, position.x, position.y, 'BlueOrb', 0, {circleRadius: 10})

        scene.add.existing(this);
        world.add(this);

        this.setScale(1);
        this.setBounce(1);
        this.setVelocity(velocity.x, velocity.y);        
        
        new DurationDestroyer(scene, this, duration);
	}
}
