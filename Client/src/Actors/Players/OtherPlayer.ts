import { Physics } from 'phaser'
//import { server } from '../Scenes/HelloWorldScene';
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
        this.controller = new OtherPlayerController(scene, this, server, namer);

        switch ( server.room.sessionId ) {

            case server.room.state.player1?.id:

                this.tintFill = true;
                //red
                this.tint = Color("rgb(255,0,0)").rgbNumber().valueOf();
                break;
            case server.room.state.player2?.id:

                this.tintFill = true;
                //red
                this.tint = Color("rgb(255,0,0)").rgbNumber().valueOf();
                break;

            case server.room.state.player3?.id:

                this.tintFill = true;
                //green
                this.tint = Color("rgb(0,255,0)").rgbNumber().valueOf();
                break;

            case server.room.state.player4?.id:

                this.tintFill = true;
                //blue
                this.tint = Color("rgb(0,0,255)").rgbNumber().valueOf();
                break;

        }
    }

}

