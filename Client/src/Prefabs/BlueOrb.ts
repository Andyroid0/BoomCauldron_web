import Phaser, { Scene } from 'phaser'
import Player from '../Actors/Player'; 
import DurationDestroyer from './DurationDestroyer';

export default class BlueOrb extends Phaser.Physics.Matter.Sprite
{
	constructor(world: Phaser.Physics.Matter.World, scene: Phaser.Scene, x: number, y: number, velocity: Phaser.Math.Vector2, duration?: number) {

		super( world, x, y, 'BlueOrb', 0, {circleRadius: 10})

        scene.add.existing(this);
        //scene.add.existing;
        world.add(this);

        this.setScale(1);
        this.setBounce(1);
        this.setVelocity(velocity.x, velocity.y);        
        
        new DurationDestroyer(scene, this, duration);
	}
}
