import Phaser from 'phaser'

export default class RedBushClump extends Phaser.GameObjects.Container {

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        //children?: Phaser.GameObjects.GameObject[] | undefined
    ) {
        super(
            scene,
            x,
            y
        )
        scene.load.image('bush_red_1', 'bush_red_1.png')
        scene.add.existing(this);

        
        const orangeBush = scene.add.image( this.x, this.y, 'bush_red_1')
        orangeBush.scale = 2
        const orangeBush3 = scene.add.image( this.x - 60 , this.y + 60, 'bush_red_1')
        orangeBush3.blendMode = Phaser.BlendModes.DIFFERENCE
        const orangeBush3Overlay = scene.add.image( this.x - 60, this.y + 60, 'bush_red_1')
        orangeBush3Overlay.setBlendMode(Phaser.BlendModes.ADD).depth = 2
        orangeBush3Overlay.alpha = .25
        orangeBush3.depth = 2
        orangeBush3.scale = 1
        // const orangeBush3Light = 
        //     this.add.pointlight(orangeBush3.x - 30, orangeBush3.y, Color("#ffbf00").rgbNumber().valueOf(), 140, 4, .01)
        // orangeBush3Light.depth = 1
        const orangeBush2 = scene.add.image( this.x + 40, this.y + 60, 'bush_red_1')
        orangeBush2.blendMode = Phaser.BlendModes.NORMAL
        const orangeBush2Overlay = scene.add.image( this.x + 40, this.y + 60, 'bush_red_1')
        orangeBush2Overlay.scale = 1.3
        orangeBush2Overlay.setBlendMode(Phaser.BlendModes.MULTIPLY).depth = 2
        orangeBush2Overlay.alpha = .3
        orangeBush2.depth = 2
        orangeBush2.scale = 1.3

        this.add([orangeBush, orangeBush3, orangeBush3Overlay, orangeBush2, orangeBush2Overlay])
    }
}