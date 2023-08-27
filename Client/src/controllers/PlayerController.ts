import BlueOrb from '../Prefabs/BlueOrb';
import Message from '../State/Message';
import Phaser, { Math, Physics, Types } from 'phaser'
import PlayerMoveState from '../State/PlayerMovementState';
import PlayerAttackState from '../State/PlayerAttackState';
import playerType from '../State/playerType';
import ColyseusClient from '../Api/ColyseusClient';
import InputHandler from '../Actors/Players/functions/InputHandler';
import MovementStateHandler from '../Actors/Players/functions/MovementStateHandler';
import AttackInputHandler from '../Actors/Players/functions/AttackInputHandler';
import AttackStateHandler from '../Actors/Players/functions/AttackStateHandler';
import ProjectileHandler from '../Actors/Players/functions/ProjectileHandler';
import FlipHandler from '../Actors/Players/functions/FlipHandler';
import Ease from '../Actors/Players/functions/Ease';
import Buff from '../models/Buff';
import Item from '../../models/interface/Item';
import PowerUp from '../../models/interface/PowerUp';
import Skill from '../../models/interface/Skill';
import Trait from '../../models/interface/Trait'
import { colyseusClient } from '../main';
export default class PlayerController extends Phaser.Scene {
    
    health!: number;
    
    player!: Physics.Matter.Sprite;

    name!: string;

    cursors!: Types.Input.Keyboard.CursorKeys;

    online!: boolean;

    position!: Math.Vector2;

    previousPosition!: Math.Vector2;

    playerMoveState !: PlayerMoveState;

    previous_playerMoveState !: PlayerMoveState;

    playerAttackState !: PlayerAttackState;

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

	constructor( scene: Phaser.Scene, object: Phaser.Physics.Matter.Sprite, online: boolean) {

        //let name = colyseusClient?.room?.sessionId;//"PlayerController"

		super( 'Player')//name as string )

        this.name = 'Player'//name as string;

        this.online = online;

        scene.scene.add( 'Player', this, true)//name as string, this, true );

        this.position = new Math.Vector2(0,0);

        this.position = new Math.Vector2(0,0);

        this.previous_playerMoveState = PlayerMoveState.Down;

        this.playerAttackState = PlayerAttackState.idle;

        this.player = object;

        this.playerMoveState = PlayerMoveState.idle;

        this.playerSpeed = 3;

        //this.colyseusClient = colyseusClient;

        this.showServerPlayer = false;

	}



	preload() {

        this.load.image('BlueOrb', 'blue_orb.png')
    }

    create() {

        if ( !this.input.keyboard ) return 

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

        if ( !this.player || !this.player.body ) return

        this.playerMoveState = InputHandler(

            this.cursors.up.isDown, 
            this.cursors.down.isDown, 
            this.cursors.left.isDown,
            this.cursors.right.isDown,
        );

        this.playerAttackState = AttackInputHandler( 

            Phaser.Input.Keyboard.JustDown(this.up), 
            Phaser.Input.Keyboard.JustDown(this.down), 
            Phaser.Input.Keyboard.JustDown(this.left), 
            Phaser.Input.Keyboard.JustDown(this.right),             
        );

        ProjectileHandler( this.playerAttackState, () => {

            new BlueOrb(

                this.matter.world, 
                this, 
                AttackStateHandler(
                    this.playerAttackState, 
                    {
                        x: this.player.x, 
                        y: this.player.y
                    },
                    10
                )!,
                900 
            );
        });

        const velocityVector = MovementStateHandler(
            this.playerMoveState, 
            this.player.body.velocity,
            this.playerSpeed
        );
        this.player.setVelocity(velocityVector.x, velocityVector.y);

        if( this.online ) {

            this.moveStateSync();
            this.syncPosition(
                
                this.player.x, 
                this.player.y, 
                this.colyseusClient.room?.state?.players.get(this.name)?.x as number, 
                this.colyseusClient.room?.state?.players.get(this.name)?.y as number
            );
        }

        this.player.flipX = FlipHandler(this.player.body.velocity, this.player.flipX);

    }


    moveStateSync = () => {

        if( this.playerMoveState != this.previous_playerMoveState ) {

            this.colyseusClient.room?.send(Message.PlayerMovement, this.playerMoveState);
            this.previous_playerMoveState = this.playerMoveState;
        }
    }

    
/** Syncs and eases the player positions across the server and client.
 * 
 * @param {number} [x] local x position
 * @param {number} [y] local y position
 * @param {number} [sx] server x position
 * @param {numbebr} [sy] server y position
 */
    syncPosition = ( x: number, y: number, sx: number, sy: number ) => {

        this.player.x = Ease.X( x, sx );

        this.player.y = Ease.Y( y, sy );

    }



}
