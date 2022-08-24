import Phaser, { Scene } from 'phaser'
import Player from '../Actors/Player'; 
import DurationDestroyer from './DurationDestroyer';

export default class BlueOrb extends Phaser.Physics.Arcade.Sprite
{
	constructor(scene: Phaser.Scene, x: number, y: number, velocity: Phaser.Math.Vector2, duration?: number) {

		super(scene, x, y, 'BlueOrb')

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(1);
        this.setBounce(1, 1);
        this.setVelocity(velocity.x, velocity.y);        
        
        new DurationDestroyer(scene, this, duration);
	}
}
