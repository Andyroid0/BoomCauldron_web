import Phaser from 'phaser'

import HelloWorldScene from './scenes/HelloWorldScene'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	scale: {
		width: 800,
		height: 600
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 }
		}
	},
	dom: {
        createContainer: true
    },
	scene: [HelloWorldScene],
	pixelArt: true,

}

export default new Phaser.Game(config)
