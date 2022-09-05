import Phaser from 'phaser'


export default class Template extends Phaser.Scene
{
 

	constructor()
	{
		super('Template')


	}

 

	preload() {
        this.load.image('crystal1', 'crystal1.png');

    }

    create() {

        this.add.image(400, 400, 'crystal1');

    }

    update(time: number, delta: number): void {


    }   
}
    




