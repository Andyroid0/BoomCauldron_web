import Phaser from 'phaser'

import HelloWorldScene from './Scenes/HelloWorldScene'

console.log( 'width: ' + window.screen.availWidth + '\n\n' + 'height: ' + window.screen.availHeight)

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	scale: {
		width: 800,
		height: 600
	},
	physics: {
		default: 'matter',
		matter: {
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
const canvas = document.getElementsByTagName('canvas')

console.log(canvas)
export default new Phaser.Game(config)
