import { Physics } from 'phaser'
import { colyseusClient } from '../../main';
import Color from 'color';
import OtherPlayerController from './OtherPlayerController';

export default class OtherPlayer extends Physics.Matter.Sprite {

    public controller !: OtherPlayerController;

    constructor(world: Phaser.Physics.Matter.World, scene: Phaser.Scene, x: number, y: number, namer: string ) {

        super(world, x, y, 'bush', 0, {circleRadius: 20} )
        this.x = x;
        this.y = y;

        scene.add.existing(this);
        world.add(this);

        this.scale = 6;
        this.controller = new OtherPlayerController(scene, this, colyseusClient, namer);

        switch ( colyseusClient.room?.state.players.size ) { 

            // case 1:

            //     this.tintFill = true;
            //     //red
            //     this.tint = Color("rgb(255,0,0)").rgbNumber().valueOf();
            //     break;
            case 2:

                this.tintFill = true;
                //red
                this.tint = Color("rgb(255,0,0)").rgbNumber().valueOf();
                break;

            case 3:

                this.tintFill = true;
                //green
                this.tint = Color("rgb(0,255,0)").rgbNumber().valueOf();
                break;

            case 4:

                this.tintFill = true;
                //blue
                this.tint = Color("rgb(0,0,255)").rgbNumber().valueOf();
                break;

        }
    }

}

