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

    serverX !: any;

    serverY !: any;

    serverPlayer !: Phaser.GameObjects.Arc;

    showServerPlayer !: boolean;

    slot !: string;

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

        let slot = this.server.slot;

        switch (slot) {
            
            case "player1": 
                this.slot = "player1";
                break;
            case "player2": 
                this.slot = "player2";
                break;           
            case "player3": 
                this.slot = "player3";
                break;
            case "player4": 
                this.slot = "player4"
                break;
        }

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
        let Ydelta = Math.Difference( this.player.y, this.serverY );
        let Xdelta = Math.Difference( this.player.x, this.serverX );



        const serverPlayer_positionDebugger = () => {

            if(this.showServerPlayer) {

                this.serverPlayer.x = this.serverX;
                this.serverPlayer.y = this.serverY;            
            }
        }

        const easeX = () => {

            let sx;
            let x = this.player.x;

            switch ( this.slot ) {

                case "player1": 
    
                    sx = this.server.room.state.player1?.x;
                    break;
    
                case "player2": 
    
                    sx = this.server.room.state.player2?.x;
                    break;   
    
                case "player3": 
    
                    sx = this.server.room.state.player3?.x;
                    break;
    
                case "player4": 
    
                    sx = this.server.room.state.player4?.x;
                    break;
            }

            if ( Xdelta > 5 ) {

                this.player.x = Phaser.Math.Linear( x, sx, 0.05 ); 
            }
            else if ( Xdelta > 1 && Xdelta <= 5 ) {
                
                this.player.x = Phaser.Math.Linear( x, sx, 0.1 ); 
            }        
            else {

                this.player.x = Phaser.Math.Linear( x, sx, 0.3 );
            }
        };

        const easeY = () => {

            let sy;
            let y = this.player.y;

            switch ( this.slot ) {

                case "player1": 
    
                    sy = this.server.room.state.player1?.y;
                    break;
    
                case "player2": 
    
                    sy = this.server.room.state.player2?.y;
                    break;   
    
                case "player3": 
    
                    sy = this.server.room.state.player3?.y;
                    break;
    
                case "player4": 
    
                    sy = this.server.room.state.player4?.y;
                    break;
            }

            if (   Ydelta > 5 ) {

                this.player.y = Phaser.Math.Linear( y, sy, 0.05 );    
            }
            else if ( Ydelta > 1 && Ydelta <=5 ) {
    
                this.player.y = Phaser.Math.Linear( y, sy, 0.1 );    
            }        
            else {
    
                this.player.y = Phaser.Math.Linear( y, sy, 0.3 );                
            }
        };


        easeX();
        easeY();
        serverPlayer_positionDebugger();
    }


}
