import BlueOrb from '../Scenes/Prefabs/blueOrb';
import Message from '../State/Message';
import Phaser, { Math, Physics, Types } from 'phaser'
import PlayerMoveState from '../State/PlayerAttackState';
import PlayerAttackState from '../State/PlayerMovementState';
import playerType from '../State/playerType';
import Server from '../Api/colServer';



export default class PlayerController extends Phaser.Scene
{
    player!: Physics.Matter.Sprite;

    name!: string;

    cursors!: Types.Input.Keyboard.CursorKeys;

    position!: Math.Vector2;

    previousPosition!: Math.Vector2;

    playerMoveState !: PlayerMoveState;

    previous_playerMoveState !: PlayerMoveState;

    playerSpeed !: number;

    server !: Server;

    serverPlayer !: Phaser.GameObjects.Arc;

    showServerPlayer !: boolean;


    up!: Phaser.Input.Keyboard.Key;
    left!: Phaser.Input.Keyboard.Key;
    down!: Phaser.Input.Keyboard.Key;
    right!: Phaser.Input.Keyboard.Key;

	constructor( scene: Phaser.Scene, object: Phaser.Physics.Matter.Sprite, server : Server) {

        var name = "PlayerController"

		super(name)

        this.name = name;

        scene.scene.add(name, this, true);

        this.position = new Math.Vector2(0,0);

        this.position = new Math.Vector2(0,0);

        this.previous_playerMoveState = PlayerMoveState.Down;

        this.player = object;

        this.playerMoveState = PlayerMoveState.idle;

        this.playerSpeed = 3;

        this.server = server;

        this.showServerPlayer = false;     

	}



	preload() {

        this.load.image('BlueOrb', 'blue_orb.png')
    }

    create() {

        if(this.showServerPlayer) {
            this.serverPlayer = this.add.circle(100, 100, 4, Phaser.Display.Color.GetColor(255, 255, 255))
        }

        this.cursors = this.input.keyboard.createCursorKeys();

        this.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W); 
        this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); 
        this.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S); 
        this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D); 

    }

    update(time: number, delta: number): void {
        

        this.inputHandler();

        this.projectileHandler();

        this.movementStateHandler();

        this.serverSync();

        this.syncPosition();
                   
    }


    inputHandler = () => {

        const c = this.cursors;

 
        if( c.left.isDown && c.up.isUp && c.down.isUp && c.right.isUp ) {

            this.playerMoveState = PlayerMoveState.Left;
        }
        else if( c.right.isDown && c.up.isUp && c.down.isUp && c.left.isUp ) {

            this.playerMoveState = PlayerMoveState.Right;
        } 
        else if( c.up.isDown && c.left.isUp && c.right.isUp && c.down.isUp ) {
            
            this.playerMoveState = PlayerMoveState.Up;
        }
        else if( c.down.isDown && c.left.isUp && c.right.isUp && c.up.isUp ) {

            this.playerMoveState = PlayerMoveState.Down;
        }
        else if( c.down.isDown && c.left.isDown && c.right.isUp && c.up.isUp ) {

            this.playerMoveState = PlayerMoveState.DownLeft;
        }
        else if (c.down.isDown && c.right.isDown && c.left.isUp && c.up.isUp ) {

            this.playerMoveState = PlayerMoveState.DownRight;
        }
        else if ( c.up.isDown && c.right.isDown && c.left.isUp && c.down.isUp ) {

            this.playerMoveState = PlayerMoveState.UpRight;
        }
        else if ( c.up.isDown && c.left.isDown && c.right.isUp && c.down.isUp ) {

            this.playerMoveState = PlayerMoveState.UpLeft;
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
                this.matter.world,
                this, 
                this.player.body.position.x + 10, 
                this.player.body.position.y + 10, 
                new Phaser.Math.Vector2(0, -10),
                900
            );
        }
        else if( is_down( this.down ) ) {

            new BlueOrb(
                this.matter.world,
                this, 
                this.player.body.position.x + 10, 
                this.player.body.position.y + 10, 
                new Phaser.Math.Vector2(0, 10),
                900
            );            
        }
        else if( is_down( this.left ) ) {

            new BlueOrb(
                this.matter.world,
                this, 
                this.player.body.position.x + 10, 
                this.player.body.position.y + 10, 
                new Phaser.Math.Vector2(-10, 0),
                900
            );            
        }
        else if( is_down( this.right ) ) {

            new BlueOrb(
                this.matter.world,
                this, 
                this.player.body.position.x + 10, 
                this.player.body.position.y + 10, 
                new Phaser.Math.Vector2(10, 0),
                900
            );            
        }
    }


    movementStateHandler = async () => {

            switch ( this.playerMoveState ) {

                case PlayerMoveState.idle:
    
                    if(this.player.body.velocity.x != 0 && this.player.body.velocity.y != 0 ) {
                        let x = this.player.body.velocity.x;
                        let y = this.player.body.velocity.y;
                        this.player.setVelocity(x/3, y/3)
                    }
                    else this.player.setVelocity(0,0);
                    break;
    
                case PlayerMoveState.Down:

                    this.player.setVelocity(0, this.playerSpeed);
                    break;        
    
                case PlayerMoveState.DownLeft:
    
                    this.player.setVelocity(-this.playerSpeed, this.playerSpeed);
                    break;
    
                case PlayerMoveState.DownRight:
                    
                    this.player.setVelocity(this.playerSpeed, this.playerSpeed);
                    break;
    
                case PlayerMoveState.Up:
    
                    this.player.setVelocity( 0, -this.playerSpeed );
                    break;
    
                case PlayerMoveState.UpLeft:

                    this.player.setVelocity( -this.playerSpeed, -this.playerSpeed );
                    break;
    
                case PlayerMoveState.UpRight:
    
                    this.player.setVelocity( this.playerSpeed, -this.playerSpeed );
                    break;
    
                case PlayerMoveState.Left:

                    this.player.setVelocity( -this.playerSpeed, 0 );
                    break;
    
                case PlayerMoveState.Right:

                    this.player.setVelocity( this.playerSpeed, 0 );
                    break;
            }
    }


    serverSync = () => {

        if( this.playerMoveState != this.previous_playerMoveState ) {
            this.server.room.send(Message.PlayerMovement, this.playerMoveState)
            this.previous_playerMoveState = this.playerMoveState;
        }
    }


    syncPosition = () => {

        // SYNC PLAYER POSITION WITH THE SERVER AND EASES DIFFERENCES
        // METHODS EXECUTED AT BOTTOM OF FUNCTION
        let Ydelta = Math.Difference(this.player.y, this.server.room.state.y);
        let Xdelta = Math.Difference(this.player.x, this.server.room.state.x);



        const serverPlayer_positionDebugger = () => {

            if(this.showServerPlayer) {

                this.serverPlayer.x = this.server.room.state.x;
                this.serverPlayer.y = this.server.room.state.y;            
            }
        }

        const easeX = () => {

            if ( Xdelta > 5 ) {

                this.player.x = Phaser.Math.Linear(
                    this.player.x,
                    this.server.room.state.x,
                    0.05
                ) 
            }
            else if ( Xdelta > 1 && Xdelta <= 5 ) {
                
                this.player.x = Phaser.Math.Linear(
                    this.player.x,
                    this.server.room.state.x,
                    0.1
                ) 
            }        
            else {
                this.player.x = Phaser.Math.Linear(
                    this.player.x,
                    this.server.room.state.x,
                    0.3
                ) 
            }
        }
        const easeY = () => {

            if (   Ydelta > 5 ) {

                this.player.y = Phaser.Math.Linear(
                    this.player.y,
                    this.server.room.state.y,
                    0.05
                )    
            }
            else if ( Ydelta > 1 && Ydelta <=5 ) {
    
                this.player.y = Phaser.Math.Linear(
                    this.player.y,
                    this.server.room.state.y,
                    0.1
                )    
            }        
            else {
    
                this.player.y = Phaser.Math.Linear(
                    this.player.y,
                    this.server.room.state.y,
                    0.3
                )                
            }
        }


        easeX();
        easeY();
        serverPlayer_positionDebugger();
    }


}
