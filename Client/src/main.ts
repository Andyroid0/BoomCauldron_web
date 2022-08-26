import Phaser from 'phaser'

import HelloWorldScene from './Scenes/HelloWorldScene'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	scale: {
		width: 800,
		height: 600
	},
	physics: {
		default: 'matter',
		matter: {
			//enableSleeping: true,
			gravity: { y: 0 },
			debug: {
				showBody: true,
				showStaticBody: true
			}
		}
	},
	dom: {
        createContainer: true
    },
	scene: [HelloWorldScene],
	pixelArt: true,
	fps: {
		target: 60,
		forceSetTimeOut: true
	}

}

export default new Phaser.Game(config)
