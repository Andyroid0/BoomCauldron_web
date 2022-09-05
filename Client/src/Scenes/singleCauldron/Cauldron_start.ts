import Phaser from 'phaser'
import Player from '../../Actors/Player';


export default class Cauldron_start extends Phaser.Scene
{
 

	constructor()
	{
		super('Cauldron-start')


	}

 

	preload() {
        this.load.image('crystal1', 'crystal1.png');
        this.load.image('bush', 'bush_1.png');

    }

    create() {
        new Player( this.matter.world, this, 100, 100);
        this.add.image(400, 400, 'crystal1');
        this.add.text(100, 100, 'Cauldron Start');

    }

    update(time: number, delta: number): void {


    }   
}
    




