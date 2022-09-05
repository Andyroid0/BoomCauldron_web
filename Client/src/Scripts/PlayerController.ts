import BlueOrb from '../Prefabs/blueOrb';
import Message from '../State/Message';
import Phaser, { Math, Physics, Types } from 'phaser'
import PlayerMoveState from '../State/PlayerMovementState';
import PlayerAttackState from '../State/PlayerAttackState';
import playerType from '../State/playerType';
import ColyseusClient from '~/Api/ColyseusClient';
import InputHandler from '~/Actors/Players/functions/InputHandler';

export default class PlayerController extends Phaser.Scene
{
    player!: Physics.Matter.Sprite;

    name!: string;

    cursors!: Types.Input.Keyboard.CursorKeys;

    online!: boolean;

    position!: Math.Vector2;

    previousPosition!: Math.Vector2;

    playerMoveState !: PlayerMoveState;

    previous_playerMoveState !: PlayerMoveState;

    playerSpeed !: number;

    colyseusClient !: ColyseusClient;

    serverX !: any;

    serverY !: any;

    serverPlayer !: Phaser.GameObjects.Arc;

    showServerPlayer !: boolean;

    slot !: string;

    up!: Phaser.Input.Keyboard.Key;
    left!: Phaser.Input.Keyboard.Key;
    down!: Phaser.Input.Keyboard.Key;
    right!: Phaser.Input.Keyboard.Key;

	constructor( scene: Phaser.Scene, object: Phaser.Physics.Matter.Sprite, colyseusClient : ColyseusClient, online: boolean) {

        var name = colyseusClient?.room?.sessionId;//"PlayerController"

		super( name as string )

        this.name = name as string;

        this.online = online;

        scene.scene.add( name as string, this, true );

        this.position = new Math.Vector2(0,0);

        this.position = new Math.Vector2(0,0);

        this.previous_playerMoveState = PlayerMoveState.Down;

        this.player = object;

        this.playerMoveState = PlayerMoveState.idle;

        this.playerSpeed = 3;

        this.colyseusClient = colyseusClient;

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

        //console.log(this.player.x)
        InputHandler(this.cursors, this.playerMoveState);

        this.projectileHandler();

        this.movementStateHandler();


        if( this.online ) {

            this.serverSync();
            this.syncPosition();
        }

    }



    VelocityAndState_setter = (state: PlayerMoveState, x: number, y: number) => {
        // not in use
        let speed = this.colyseusClient.room?.state.players.get(this.name)?.moveSpeed
        this.playerMoveState = state;
        this.player.setVelocity(x*speed!, y*speed!)
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

            this.colyseusClient.room?.send(Message.PlayerMovement, this.playerMoveState);
            this.previous_playerMoveState = this.playerMoveState;
        }
    }


    syncPosition = () => {

        let state = this.colyseusClient.room?.state;

        let Ydelta = Math.Difference( this.player.y, state?.players.get(this.name)?.y as number);
        let Xdelta = Math.Difference( this.player.x, state?.players.get(this.name)?.x as number);



        // SYNC PLAYER POSITION WITH THE SERVER AND EASES DIFFERENCES
        // METHODS EXECUTED AT BOTTOM OF FUNCTION

        const serverPlayer_positionDebugger = () => {

            if(this.showServerPlayer) {

                this.serverPlayer.x = this.serverX;
                this.serverPlayer.y = this.serverY;
            }
        }

        const easeX = () => {

            let x = this.player.x;
            let state = this.colyseusClient?.room?.state;
            let sx = state?.players.get(this.name)?.x;


            if ( Xdelta > 5 ) {

                this.player.x = Phaser.Math.Linear( x, sx as number, 0.05 );
            }
            else if ( Xdelta > 1 && Xdelta <= 5 ) {

                this.player.x = Phaser.Math.Linear( x, sx as number, 0.1 );
            }
            else {

                this.player.x = Phaser.Math.Linear( x, sx as number, 0.3 );
            }
        };

        const easeY = () => {

            let y = this.player.y;
            let state = this.colyseusClient?.room?.state;
            let sy = state?.players.get(this.name)?.y;

            if (   Ydelta > 5 ) {

                this.player.y = Phaser.Math.Linear( y, sy as number, 0.05 );
            }
            else if ( Ydelta > 1 && Ydelta <=5 ) {

                this.player.y = Phaser.Math.Linear( y, sy as number, 0.1 );
            }
            else {

                this.player.y = Phaser.Math.Linear( y, sy as number, 0.3 );
            }
        };


        easeX();
        easeY();
        serverPlayer_positionDebugger();
    }


}
