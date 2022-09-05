import Phaser from 'phaser'


export default class MultiplayerSelection extends Phaser.Scene
{
 

	constructor()
	{
		super('multiplayer-selection')


	}

 

	preload() {

    }

    create() {

        this.add.text(100, 100, 'Multi');

    }

    update(time: number, delta: number): void {


    }   
}
    




