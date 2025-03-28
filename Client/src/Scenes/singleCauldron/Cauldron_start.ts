import Phaser from 'phaser'
import Player from '../../Actors/Players/Player';
//import OtherPlayer from '~/Actors/Players/OtherPlayer';
import Color from 'color';
//import Matter from 'matter-js';
import OrangeBushClump from '../../Prefabs/Flora/OrangeBushClump';
import GreenBushClump from '../../Prefabs/Flora/GreenBushClump';
import RedBushClump from '../../Prefabs/Flora/RedBushClump';

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
        this.load.image('bush_green_1', 'bush_green_1.png')
        this.load.image('bush_orange_1', 'bush_orange_1.png')
        this.load.image('bush_red_1', 'bush_red_1.png')
        this.load.image('birch', 'birch_blue_1.png')
        this.load.image('evergreen1', 'everGreen_1.png')
        this.load.image('evergreen2', 'everGreen_2.png')
        this.load.image('evergreen3', 'everGreen_3.png')
        this.load.image('evergreen4', 'everGreen_4.png')
        
        this.load.image('bushal', 'bushal.png');
        this.load.image('pumpkin', 'pumpkin1_.png');
        this.load.image('necro', 'necro_plc.png');
        this.load.image('swampTree1', 'swampTree.png');

        this.load.image('dirt_patch', 'dirt_patch.png');
        this.load.image('dirt_rake', 'dirt_rake.png');
        this.load.image('path', 'path_simple_1.gif')

        this.players = new Map<string, Player>();

    }

    create() {

        this.add.rectangle(500, 400, 800, 300, Color("#95a658").rgbNumber().valueOf())

        this.add.rectangle(500, 700, 800, 300, Color("#95a658").rgbNumber().valueOf())

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

        //this.add.text(100, 100, 'Cauldron Start');
        // this.add.image(300, 500, 'necro');

        const evergreen1 = this.add.image( 780, 120, 'evergreen1')
        evergreen1.scale = 1.3
        evergreen1.alpha = .6
        const evergreen2 = this.add.image( 680, 120, 'evergreen1')
        evergreen2.scale = 1.3
        evergreen2.alpha = .6
        const evergreen3 = this.add.image( 580, 120, 'evergreen1')
        evergreen3.scale = 1.3
        evergreen3.alpha = .6
        const evergreen4 = this.add.image( 480, 120, 'evergreen1')
        evergreen4.scale = 1.3
        evergreen4.alpha = .6
        const evergreen5 = this.add.image( 380, 120, 'evergreen1')
        evergreen5.scale = 1.3
        evergreen5.alpha = .6
        const evergreen6 = this.add.image( 280, 120, 'evergreen1')
        evergreen6.scale = 1.3
        evergreen6.alpha = .6
        const evergreen7 = this.add.image( 180, 120, 'evergreen1')
        evergreen7.scale = 1.3
        evergreen7.alpha = .6

        const foreground_evergreen1 = this.add.image( 720, 120, 'evergreen1')
        foreground_evergreen1.scale = 1.3
        const foreground_evergreen2 = this.add.image( 620, 120, 'evergreen1')
        foreground_evergreen2.scale = 1.3
        const foreground_evergreen3 = this.add.image( 520, 120, 'evergreen1')
        foreground_evergreen3.scale = 1.3
        const foreground_evergreen4 = this.add.image( 420, 120, 'evergreen1')
        foreground_evergreen4.scale = 1.3
        const foreground_evergreen5 = this.add.image( 320, 120, 'evergreen1')
        foreground_evergreen5.scale = 1.3
        const foreground_evergreen6 = this.add.image( 220, 120, 'evergreen1')
        foreground_evergreen6.scale = 1.3
        const foreground_evergreen7 = this.add.image( 120, 120, 'evergreen1')
        foreground_evergreen7.scale = 1.3  
        
        
        const other_evergreen1 = this.add.image( 160, 160, 'evergreen2')
        other_evergreen1.alpha = .4
        const other_evergreen2 = this.add.image( 220, 160, 'evergreen3')
        other_evergreen2.alpha = .4
        const other_evergreen3 = this.add.image( 260, 160, 'evergreen4')
        other_evergreen3.alpha = .4
        const other_evergreen4 = this.add.image( 320, 160, 'evergreen3')
        other_evergreen4.alpha = .4
        const other_evergreen5 = this.add.image( 340, 160, 'evergreen3')
        other_evergreen5.alpha = .6
        other_evergreen5.scale = 1.2
        const other_evergreen6 = this.add.image( 400, 160, 'evergreen4')
        other_evergreen6.alpha = .3
        other_evergreen6.scale = 1.5
        const other_evergreen7 = this.add.image( 460, 160, 'evergreen4')
        other_evergreen7.alpha = .4
        const other_evergreen8 = this.add.image( 515, 160, 'evergreen3')
        other_evergreen8.alpha = .5
        other_evergreen8.scale = 1.3
        const other_evergreen9 = this.add.image( 540, 160, 'evergreen4')
        other_evergreen9.alpha = .4
        const other_evergreen10 = this.add.image( 560, 160, 'evergreen4')
        other_evergreen10.alpha = .4
        const other_evergreen11 = this.add.image( 620, 160, 'evergreen3')
        other_evergreen11.alpha = .4
        const other_evergreen12 = this.add.image( 660, 160, 'evergreen3')
        other_evergreen12.alpha = .2
        const other_evergreen13 = this.add.image( 700, 160, 'evergreen4')
        other_evergreen13.alpha = .3
        const other_evergreen14 = this.add.image( 745, 160, 'evergreen3')
        other_evergreen14.alpha = .5
        other_evergreen14.scale = 1.3

        this.add.image( 880, 180, 'birch').scale = 2

        
        new RedBushClump(this, 280, 120)
        new OrangeBushClump(this, 360, 140)
        new GreenBushClump(this, 200, 140)


        // const path = this.add.image(200, 500, 'path')
        // path.scale = 8
        //this.add.image(275, 500, 'path').scale = 8

        let dirtrake4 = this.add.image( 200, 600, 'dirt_rake');
        dirtrake4.scale = 3;
        dirtrake4.alpha = .5;      
        dirtrake4.flipX = true;   

        // let frank = this.add.image(800, 210, 'bushal');
        // frank.alpha = .8
        // frank.tintFill = true;
        // frank.tint = Color("#ffb448").rgbNumber().valueOf();
        // frank.flipX = true;

        // this.add.pointlight(560, 500, Color("#c756c7").rgbNumber().valueOf(), 200, 10, .01)
        // this.add.pointlight(1000, 440, Color("#c756c7").rgbNumber().valueOf(), 500, 6, .01)
        // this.add.pointlight(1400, 400, Color("#adc758").rgbNumber().valueOf(), 500, 6, .01)

        // this.add.pointlight(1200, 600, Color("#c756c7").rgbNumber().valueOf(), 200, 10, .01);

        // var tree3 : Phaser.GameObjects.Image = this.add.image(1000, 540, 'swampTree1');
        // tree3.scale = 1.5;
        // tree3.tintFill = true
        // tree3.tint = Color("#222222").rgbNumber().valueOf();
        // tree3.flipX = true;

        // var tree : Phaser.GameObjects.Image = this.add.image(1100, 500, 'swampTree1');
        // tree.scale = 2;
        // tree.tintFill = true
        // tree.tint = Color("#444444").rgbNumber().valueOf();
        
        // var tree2 : Phaser.GameObjects.Image = this.add.image(1300, 450, 'swampTree1');
        // tree2.scale = 2.5;
        // tree2.tintFill = true
        // tree2.tint = Color("#444444").rgbNumber().valueOf();
        // tree2.flipX = true;

        // this.add.pointlight(1200, 600, Color("#c756c7").rgbNumber().valueOf(), 200, 7, .01)

        //this.add.rectangle( 500, 500, 100, 100, Color("#c756c7").rgbNumber().valueOf());

        //this.add.tilemap(undefined, 100, 100, 10, 10);

        // this.add.pointlight(1500, 700, Color("#adc758").rgbNumber().valueOf(), 400, 2, .01)

        //this.player = new Player( this.matter.world, this, 100, 100);
        this.players.set("player", new Player( this.matter.world, this, 100, 100 ) )
    }

    update(time: number, delta: number): void {


    }
}










