import { Physics } from 'phaser'
import EnemyController from './EnemyController';
import { colyseusClient } from '../../main';

/** Instantiates a Matter Body and Phaser Sprite with a @class PlayerController
 * @class
 * 
 * @param {Matter.World} [world] *Matter.World* reference
 * @param {Phaser.Scene} [scene] *Phaser.Scene* reference
 * @param {number} [x] *number* Cartesian coordinate
 * @param {number} [y] *number* Cartesian coordinate
 * 
 */
export default class Enemy extends Physics.Matter.Sprite {

    public controller !: EnemyController;

    constructor( world: Phaser.Physics.Matter.World, scene: Phaser.Scene, x: number, y: number ) {

        super( world, x, y, 'necro', 0, {

            circleRadius: 20,

            render: { sprite: { yOffset: .3 }}

        })

        this.x = x;

        this.y = y;

        scene.add.existing(this);

        world.add(this);

        this.scale = 1;

        this.controller = new EnemyController( scene, this, colyseusClient, false);

    }
}