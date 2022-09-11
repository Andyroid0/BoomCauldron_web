import Phaser from 'phaser'
import Player from '../../Actors/Players/Player';
import Color from 'color';
//import Matter from 'matter-js';


export default class Cauldron_start extends Phaser.Scene
{

    player !: Player;

	constructor() {

		super('Cauldron-start')
	}



	preload() {
        this.load.image('crystal1', 'crystal1.png');
        this.load.image('bush', 'bush_1.png');
        this.load.image('pumpkin', 'pumpkin1_.png');
        this.load.image('necro', 'necro_plc.png');

        this.load.tilemapImpact
    }

    create() {

        this.player = new Player( this.matter.world, this, 100, 100);
        this.add.image(400, 400, 'crystal1');

        this.add.image(450, 450, 'pumpkin').scale = 2;

        this.add.image(500, 500, 'pumpkin');
        this.add.image(450, 510, 'pumpkin').scale = .5;

        this.add.text(100, 100, 'Cauldron Start');
        this.add.image(300, 500, 'necro');

        this.add.pointlight(560, 500, Color("#c756c7").rgbNumber().valueOf(), 200, 10, .01)

        //this.add.rectangle( 500, 500, 100, 100, Color("#c756c7").rgbNumber().valueOf());

        this.add.tilemap(undefined, 100, 100, 10, 10);

    }

    update(time: number, delta: number): void {


    }
}










