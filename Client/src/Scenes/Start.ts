import Phaser from 'phaser'
import { start } from '../Screens/StartScreen';
import { root } from '../main';
import MultiplayerSelection from './MultiPlayerSelection';
import SinglePlayerSelection from './SinglePlayerSelection';


export default class Template extends Phaser.Scene
{
 

	constructor()
	{
		super('start-screen')


	}

 

	preload() {
        this.load.image('startScreen', 'startScreen.png');
        this.scene.add('SinglePlayer-selection',SinglePlayerSelection, false)
        this.scene.add('multiplayer-selection', MultiplayerSelection, false)

    }

    create() {
        start(root as HTMLElement, ()=>this.scene.start('SinglePlayer-selection'), ()=> this.scene.start('multiplayer-selection') );
        this.add.image(960, 540, 'startScreen');

    }

    update(time: number, delta: number): void {


    }   
}
    




