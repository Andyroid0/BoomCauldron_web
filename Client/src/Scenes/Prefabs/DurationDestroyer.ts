import Phaser from 'phaser'


export default class DurationDestroyer extends Phaser.Scene
{
    object!: Phaser.Physics.Arcade.Sprite;
    duration?: number;
    elapsed!: number;
    name!: string;

	constructor( scene: Phaser.Scene, object: Phaser.Physics.Arcade.Sprite, duration?: number ) {

        var name = 'DurationDestroyer' + Phaser.Math.FloatBetween(-999, 999);
		super(name)
        this.name = name;
        this.object = object;
        this.elapsed = 0;
        this.duration = duration;
        scene.scene.add(name, this, true);
        
	}

    update(time: number, delta: number): void {
        
        if( this.duration) {
            this.elapsed += delta;
            if( this.elapsed >= this.duration ) {
                this.object.destroy();
                this.scene.remove(this);
            }
        }
    }
}
