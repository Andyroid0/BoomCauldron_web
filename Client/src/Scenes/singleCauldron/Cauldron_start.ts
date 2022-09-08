import Phaser from 'phaser'
import Player from '../../Actors/Players/Player';
import Color from 'color';


export default class Cauldron_start extends Phaser.Scene
{

    player !: Player;

	constructor() {

		super('Cauldron-start')
	}



	preload() {
        this.load.image('crystal1', 'crystal1.png');
        this.load.image('bush', 'bush_1.png');
        this.load.tilemapImpact
    }

    create() {

        this.player = new Player( this.matter.world, this, 100, 100);
        this.add.image(400, 400, 'crystal1');
        this.add.text(100, 100, 'Cauldron Start');

        this.add.rectangle( 500, 500, 100, 100, Color("#c756c7").rgbNumber().valueOf());

        this.add.tilemap(undefined, 100, 100, 10, 10);
        
    }

    update(time: number, delta: number): void {


    }
}


// Tile should have a custom image object that sets it to the background etc.

type Tile = {

    obstruction: boolean,
    img: Phaser.GameObjects.Image,
    localIndex: {x: number, y: number},
    areaIndex: {x: number, y: number},
    globalIndex: {x: number, y: number},
    width: number,
    height: number

}







