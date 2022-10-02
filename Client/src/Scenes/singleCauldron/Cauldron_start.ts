import Phaser from 'phaser'
import Player from '../../Actors/Players/Player';
import OtherPlayer from '~/Actors/Players/OtherPlayer';
import Color from 'color';
//import Matter from 'matter-js';


export default class Cauldron_start extends Phaser.Scene
{


    player !: Player;

    players !: Map<string,Player>;

	constructor() {

		super('Cauldron-start')
	}



	preload() {

        this.load.image('crystal1', 'crystal1.png');
        this.load.image('bush', 'bush_1.png');
        this.load.image('bushal', 'bushal.png');
        this.load.image('pumpkin', 'pumpkin1_.png');
        this.load.image('necro', 'necro_plc.png');
        this.load.image('swampTree1', 'swampTree.png');

        this.load.image('dirt_patch', 'dirt_patch.png');
        this.load.image('dirt_rake', 'dirt_rake.png');

        this.players = new Map<string, Player>();
    }

    create() {
        
        this.add.rectangle(500, 400, 800, 300, Color("#95a658").rgbNumber().valueOf())

        let dirt = this.add.image( 400, 400, 'dirt_patch');
        dirt.scale = 3;
        dirt.alpha = .2

        let dirt2 = this.add.image( 440, 450, 'dirt_patch');
        dirt2.scale = 3;
        dirt2.alpha = .1
        dirt2.tint = Color("#1a9cc7").rgbNumber().valueOf();
        dirt2.tintFill = true;

        let dirtrake = this.add.image( 440, 450, 'dirt_rake');
        dirtrake.scale = 3;
        dirtrake.alpha = .4;

        let dirtrake2 = this.add.image( 420, 420, 'dirt_rake');
        dirtrake2.scale = 3;
        dirtrake2.alpha = .4;
        
        let dirtrake3 = this.add.image( 420, 410, 'dirt_rake');
        dirtrake3.scale = 3;
        dirtrake3.alpha = .5;      
        dirtrake3.flipX = true;    
        // dirt2.tint = Color("#c756c7").rgbNumber().valueOf();
        // dirt2.tintFill = true;        
        //this.add.image(400, 400, 'crystal1');

        // this.add.image(450, 450, 'pumpkin').scale = 2;

        // this.add.image(500, 500, 'pumpkin');
        // this.add.image(450, 510, 'pumpkin').scale = .5;

        this.add.text(100, 100, 'Cauldron Start');
        this.add.image(300, 500, 'necro');


        this.add.image(200, 200, 'bushal').alpha = .8;
        this.add.image(300, 190, 'bushal').scale = 1.2;

        this.add.image(140, 230, 'bushal').scale = .6;

        let frank = this.add.image(800, 210, 'bushal');
        frank.alpha = .8
        frank.tintFill = true;
        frank.tint = Color("#ffb448").rgbNumber().valueOf();
        frank.flipX = true;
        
        let frank2 = this.add.image(700, 190, 'bushal');
        frank2.scale = 1.3;
        frank2.tintFill = true;
        frank2.tint = Color("#ffb448").rgbNumber().valueOf();
        frank2.flipX = false;

        let frank3 = this.add.image(900, 210, 'bushal');
        frank3.tintFill = true;
        frank3.tint = Color("#ffb448").rgbNumber().valueOf();
        frank3.flipX = true;
        // this.add.pointlight(560, 500, Color("#c756c7").rgbNumber().valueOf(), 200, 10, .01)
        // this.add.pointlight(1000, 440, Color("#c756c7").rgbNumber().valueOf(), 500, 6, .01)
        // this.add.pointlight(1400, 400, Color("#adc758").rgbNumber().valueOf(), 500, 6, .01)

        // this.add.pointlight(1200, 600, Color("#c756c7").rgbNumber().valueOf(), 200, 10, .01);

        var tree3 : Phaser.GameObjects.Image = this.add.image(1000, 540, 'swampTree1');
        tree3.scale = 1.5;
        tree3.tintFill = true
        tree3.tint = Color("#222222").rgbNumber().valueOf();
        tree3.flipX = true;

        var tree : Phaser.GameObjects.Image = this.add.image(1100, 500, 'swampTree1');
        tree.scale = 2;
        tree.tintFill = true
        tree.tint = Color("#444444").rgbNumber().valueOf();
        
        var tree2 : Phaser.GameObjects.Image = this.add.image(1300, 450, 'swampTree1');
        tree2.scale = 2.5;
        tree2.tintFill = true
        tree2.tint = Color("#444444").rgbNumber().valueOf();
        tree2.flipX = true;

        this.add.pointlight(1200, 600, Color("#c756c7").rgbNumber().valueOf(), 200, 7, .01)

        //this.add.rectangle( 500, 500, 100, 100, Color("#c756c7").rgbNumber().valueOf());

        this.add.tilemap(undefined, 100, 100, 10, 10);


        this.add.pointlight(1500, 700, Color("#adc758").rgbNumber().valueOf(), 400, 2, .01)

        //this.player = new Player( this.matter.world, this, 100, 100);
        this.players.set("player", new Player( this.matter.world, this, 100, 100 ) );

        this.add.pointlight(1100, 960, Color("#c756c7").rgbNumber().valueOf(), 800, 4, .01)

        this.add.pointlight(1500, 960, Color("#adc758").rgbNumber().valueOf(), 400, 1, .02)

    }

    update(time: number, delta: number): void {


    }
}










