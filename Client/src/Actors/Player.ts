import Phaser, {Math} from 'phaser'

import { writeTest, placeTest } from '../Api/Server';


class Player extends Phaser.Scene
{
    bush!: Phaser.Physics.Arcade.Sprite;
    //pad: Gamepad;
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

    timer!: number;

    position!: Math.Vector2;
    previousPosition!: Math.Vector2;

	constructor()
	{
        super("player")
        this.position = new Math.Vector2(0,0);
        this.position = new Math.Vector2(0,0);
	}

	preload() {
        this.load.image('bush', 'bush_1.png');
        this.timer = 0;
    }

    create() {
        this.bush = this.physics.add.sprite(100, 100,'bush');
        this.bush.scale = 6;
        //this.pad = this.input.gamepad.getPad(1);

        this.cursors = this.input.keyboard.createCursorKeys();
        writeTest();
    }

    update(time: number, delta: number): void {
        

        this.bush.setGravity(0);
        if( this.cursors.left.isDown) {
            this.bush.setVelocityX(-160);
        }
        else if( this.cursors.right.isDown) {
            this.bush.setVelocityX(160);
        } 
        else this.bush.setVelocityX(this.bush.body.velocity.x/3);
        if( this.cursors.up.isDown) {
            this.bush.setVelocityY(-160);
        }
        else if( this.cursors.down.isDown) {
            this.bush.setVelocityY(160);
        }
        else this.bush.setVelocityY(this.bush.body.velocity.y/3);


        this.timeHandler(delta);
        
    }


    timeHandler = (delta: number) => {

        this.position = this.bush.body.position;

        this.timer += delta;

        if(this.timer > 200) {
            console.log("frame")
            this.timer = 0;
            if(this.position != this.previousPosition) {
                this.previousPosition = this.bush.body.position;
                placeTest(this.bush.body.position.x, this.bush.body.position.y);
            }
        }
    }
}

export default Player;
