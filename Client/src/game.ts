import Phaser from 'phaser'

import Start from './Scenes/Start';

import Cauldron_start from './Scenes/singleCauldron/Cauldron_start'

console.log( 'width: ' + window.screen.availWidth + '\n\n' + 'height: ' + window.screen.availHeight)

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	scale: {
		width: 1920,
		height: 1080,
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.Center.CENTER_BOTH,
	},
	physics: {
		default: 'matter',
		matter: {
			gravity: { y: 0 },
			// debug: {
			// 	showBody: true,
			// 	showStaticBody: true
			// }
		}
	},
	scene: [Cauldron_start],
	//scene: [Start],
	pixelArt: true,
	fps: {
		target: 60,
		forceSetTimeOut: true
	},

}
export default new Phaser.Game(config)
