import Phaser from 'phaser'
import { singlePlayer_start_btn } from '../Screens/SinglePlayerSelectionScreen';
import Cauldron_start from './singleCauldron/Cauldron_start';
import { root } from '../main';

export default class SinglePlayerSelection extends Phaser.Scene
{
 

	constructor()
	{
		super('SinglePlayer-selection')


	}

 

	preload() {

        this.scene.add('Cauldron-start',Cauldron_start, false)
        
        
    }

    create() {
        singlePlayer_start_btn(root as HTMLElement, ()=>this.scene.start('Cauldron-start'))
        this.add.text(100, 100, 'Single');
    }

    update(time: number, delta: number): void {


    }   
}
    




