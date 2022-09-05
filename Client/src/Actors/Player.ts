import { Physics } from 'phaser'
import { server } from '../Scenes/HelloWorldScene';
import PlayerController from '../Scripts/PlayerController';

export default class Player extends Physics.Matter.Sprite {

    public controller !: PlayerController;

    constructor(world: Phaser.Physics.Matter.World, scene: Phaser.Scene, x: number, y: number ) {

        super(world, x, y, 'bush', 0, {circleRadius: 20} )
        this.x = x;
        this.y = y;
        scene.add.existing(this);
        scene.add.existing;
        world.add(this);

        this.scale = 6;
        this.controller = new PlayerController(scene, this, server)
    }
 
}
