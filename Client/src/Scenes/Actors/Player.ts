import Phaser, {LEFT, Math } from 'phaser'
import BlueOrb from '../Prefabs/blueOrb';
//import { writeTest, placeTest } from '../Api/Server';
import PlayerMoveState from '../../State/PlayerMovementState';
import { server } from '../HelloWorldScene';
import Message from '../../State/Message';

class Player extends Phaser.Scene {

    bush!: Phaser.Physics.Matter.Sprite;

    //body!: MatterJS.BodyType;
    //pad: Gamepad;
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

    timer!: number;

    position!: Math.Vector2;

    previousPosition!: Math.Vector2;

    playerMoveState !: PlayerMoveState;

    previous_playerMoveState !: PlayerMoveState;

    playerSpeed !: number;

    serverPlayer !: Phaser.GameObjects.Arc;

    showServerPlayer !: boolean;


    up!: Phaser.Input.Keyboard.Key;
    left!: Phaser.Input.Keyboard.Key;
    down!: Phaser.Input.Keyboard.Key;
    right!: Phaser.Input.Keyboard.Key;

	constructor()
	{
        super("player")
        this.position = new Math.Vector2(0,0);
        this.position = new Math.Vector2(0,0);
        this.previous_playerMoveState = PlayerMoveState.movingDown;
        this.playerMoveState = PlayerMoveState.idle;
        this.playerSpeed = 3;

        this.showServerPlayer = true
	}


	preload() {

        this.load.image('bush', 'bush_1.png');
        this.load.image('BlueOrb', 'blue_orb.png')
        this.timer = 0;
    }

    create() {

        this.bush = this.matter.add.sprite(100, 100,'bush',0, {"circleRadius": 20});

        if(this.showServerPlayer) {
            this.serverPlayer = this.add.circle(100, 100, 4, Phaser.Display.Color.GetColor(255, 255, 255))
        }

        this.bush.scale = 6;
        //this.pad = this.input.gamepad.getPad(1);

        this.cursors = this.input.keyboard.createCursorKeys();

        //writeTest();
        this.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W); 
        this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); 
        this.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S); 
        this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D); 

    }

    update(time: number, delta: number): void {
        

        this.inputHandler();

        //this.projectileHandler();

        this.movementStateHandler();

        this.serverSync();

        this.syncPosition();
                   
    }


    inputHandler = () => {

        const c = this.cursors;

 
        if( c.left.isDown && c.up.isUp && c.down.isUp && c.right.isUp ) {

            this.playerMoveState = PlayerMoveState.movingLeft;
        }
        else if( c.right.isDown && c.up.isUp && c.down.isUp && c.left.isUp ) {

            this.playerMoveState = PlayerMoveState.movingRight;
        } 
        else if( c.up.isDown && c.left.isUp && c.right.isUp && c.down.isUp ) {
            
            this.playerMoveState = PlayerMoveState.movingUp;
        }
        else if( c.down.isDown && c.left.isUp && c.right.isUp && c.up.isUp ) {

            this.playerMoveState = PlayerMoveState.movingDown;
        }
        else if( c.down.isDown && c.left.isDown && c.right.isUp && c.up.isUp ) {

            this.playerMoveState = PlayerMoveState.movingDownLeft;
        }
        else if (c.down.isDown && c.right.isDown && c.left.isUp && c.up.isUp ) {

            this.playerMoveState = PlayerMoveState.movingDownRight;
        }
        else if ( c.up.isDown && c.right.isDown && c.left.isUp && c.down.isUp ) {

            this.playerMoveState = PlayerMoveState.movingUpRight;
        }
        else if ( c.up.isDown && c.left.isDown && c.right.isUp && c.down.isUp ) {

            this.playerMoveState = PlayerMoveState.movingUpLeft;
        }
        else if( c.up.isUp && c.down.isUp && c.right.isUp && c.left.isUp ) {

            this.playerMoveState = PlayerMoveState.idle;
        }
    }


    projectileHandler = () => {

        const is_down = (btn: Phaser.Input.Keyboard.Key) : boolean => {
            return Phaser.Input.Keyboard.JustDown(btn);
        };

        if( is_down( this.up ) ) {

            new BlueOrb(
                this, 
                this.bush.body.position.x + 10, 
                this.bush.body.position.y + 10, 
                new Phaser.Math.Vector2(0, -240),
                900
            );
        }
        else if( is_down( this.down ) ) {

            new BlueOrb(
                this, 
                this.bush.body.position.x + 10, 
                this.bush.body.position.y + 10, 
                new Phaser.Math.Vector2(0, 240),
                900
            );            
        }
        else if( is_down( this.left ) ) {

            new BlueOrb(
                this, 
                this.bush.body.position.x + 10, 
                this.bush.body.position.y + 10, 
                new Phaser.Math.Vector2(-240, 0),
                900
            );            
        }
        else if( is_down( this.right ) ) {

            new BlueOrb(
                this, 
                this.bush.body.position.x + 10, 
                this.bush.body.position.y + 10, 
                new Phaser.Math.Vector2(240, 0),
                900
            );            
        }
    }


    movementStateHandler = async () => {

            switch ( this.playerMoveState ) {

                case PlayerMoveState.idle:
    
                    if(this.bush.body.velocity.x != 0 && this.bush.body.velocity.y != 0 ) {
                        let x = this.bush.body.velocity.x;
                        let y = this.bush.body.velocity.y;
                        this.bush.setVelocity(x/3, y/3)
                    }
                    else this.bush.setVelocity(0,0);
                    break;
    
                case PlayerMoveState.movingDown:

                    this.bush.setVelocity(0, this.playerSpeed);
                    break;        
    
                case PlayerMoveState.movingDownLeft:
    
                    this.bush.setVelocity(-this.playerSpeed, this.playerSpeed);
                    break;
    
                case PlayerMoveState.movingDownRight:
                    
                    this.bush.setVelocity(this.playerSpeed, this.playerSpeed);
                    break;
    
                case PlayerMoveState.movingUp:
    
                    this.bush.setVelocity( 0, -this.playerSpeed );
                    break;
    
                case PlayerMoveState.movingUpLeft:

                    this.bush.setVelocity( -this.playerSpeed, -this.playerSpeed );
                    break;
    
                case PlayerMoveState.movingUpRight:
    
                    this.bush.setVelocity( this.playerSpeed, -this.playerSpeed );
                    break;
    
                case PlayerMoveState.movingLeft:

                    this.bush.setVelocity( -this.playerSpeed, 0 );
                    break;
    
                case PlayerMoveState.movingRight:

                    this.bush.setVelocity( this.playerSpeed, 0 );
                    break;
            }
    }


    serverSync = () => {

        if( this.playerMoveState != this.previous_playerMoveState ) {
            server.room.send(Message.PlayerMovement, this.playerMoveState)
            this.previous_playerMoveState = this.playerMoveState;
        }
    }


    syncPosition = () => {

        if(this.showServerPlayer) {

            this.serverPlayer.x = server.room.state.x;
            this.serverPlayer.y = server.room.state.y;            
        }


        this.bush.x = Phaser.Math.Linear(
            this.bush.x,
            server.room.state.x,
            0.05
        )
        this.bush.y = Phaser.Math.Linear(
            this.bush.y,
            server.room.state.y,
            0.05
        )     

        
    }

}

export default Player;


enum PlayerFacingState {

    // SIMPLE DIRECTIONS

    Up,

    Down,

    Left,

    Right,

// DIAGONALS DIRECTIONS

    UpLeft,

    UpRight,

    DownLeft,

    DownRight,

}

enum PlayerShootingState {

    // SIMPLE DIRECTIONS

    Up,

    Down,

    Left,

    Right,

// DIAGONALS DIRECTIONS

    UpLeft,

    UpRight,

    DownLeft,

    DownRight,
}



class handleDirectionalInput extends Phaser.Scene {

    public cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

    public peripheralState!: PeripheralState;

    constructor() {
        super("handleDirectionalInput")
    }

    init() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
    
    }

    update(time: number, delta: number): void {
    
    }

    directionalReturn = (): Phaser.Math.Vector2 => {
        // SHOULD RETURN A DIRECTIONAL VECTOR2 REGARDLESS OF PERIPHERAL
        const vec2 = Phaser.Math.Vector2;

        return new vec2();
    };

    public changePeripheral = () => {

        switch ( this.peripheralState ) {

            case PeripheralState.gamepad:

                this.peripheralState = PeripheralState.keyboard;
                break;
        
            case PeripheralState.keyboard:

                this.peripheralState = PeripheralState.gamepad;
                break;
        }
    }

    public getPeripheralState = () : string => {

        switch ( this.peripheralState ) {

            case PeripheralState.gamepad:

                return 'gamepad'
        
            case PeripheralState.keyboard:

                return 'keyboard'
        }        
    }


};

enum PeripheralState {
    gamepad,
    keyboard
}