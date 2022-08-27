import Phaser from 'phaser'
import Player from './Actors/Player'; 
//import { listenTest } from '../Api/Server';
import Server from '../Api/colServer';
import Color from 'color';
import PlayerController from '~/Scripts/PlayerController';

export const server = new Server();

export default class HelloWorldScene extends Phaser.Scene
{
    player !: Player;

    playerController !: PlayerController;

	constructor()
	{
		super('hello-world')
	}

	preload()
    {
        //listenTest();
        this.load.image('crystal1', 'crystal1.png');
        this.load.image('crystal2', 'crystal2.png');
        this.load.image('crystal3', 'crystal3.png');

        this.load.image('grassEdge1', 'grassEdge1.png');
        this.load.image('grassEdge2', 'grassEdge2.png');

        this.load.image('test', 'test.png')
        this.load.image('bush', 'bush_1.png');

        //this.scene.add('Player', Player, true);
    }

    create()
    {
        var frank = this.add.image(400, 300, 'test');
        //this.add.rectangle(400,320,400,300, Color("#488601").rgbNumber().valueOf() );
        this.add.image(400, 400, 'crystal1');
        this.add.image(445, 400, 'crystal2');
        this.add.image(355, 410, 'crystal3');

        var g1 = this.add.image(300, 480, 'grassEdge2')
        g1.tint = Color("#c756c7").rgbNumber().valueOf();
        g1.tintFill = true;
        
        var g2 = this.add.image(325, 480, 'grassEdge1');
        g2.tint = Color("#ff80e5").rgbNumber().valueOf();
        g2.tintFill = true;

        var g3 = this.add.image(275, 480, 'grassEdge1');
        g3.tint = Color("#ff80e5").rgbNumber().valueOf();
        g3.tintFill = true;

        this.player = new Player( this.matter.world, this, 100, 100 );
        this.playerController = this.player.controller;
        //this.scene.launch('Player');
    }
}
