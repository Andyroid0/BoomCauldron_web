import Phaser from 'phaser'
import Player from '../Actors/Player'; 
import { listenTest } from '../Api/Server';



export default class HelloWorldScene extends Phaser.Scene
{
	constructor()
	{
		super('hello-world')
	}

	preload()
    {
        listenTest();
        this.load.image('test', 'test.png')
        this.scene.add('Player', Player, true);
    }

    create()
    {

        this.add.image(400, 300, 'test')
        this.scene.launch('Player')

    }
}
