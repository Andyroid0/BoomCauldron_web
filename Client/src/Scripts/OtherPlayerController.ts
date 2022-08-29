import BlueOrb from '../Scenes/Prefabs/blueOrb';
import Message from '../State/Message';
import Phaser, { Math, Physics, Types } from 'phaser'
import PlayerMoveState from '../State/PlayerMovementState';
import PlayerAttackState from '../State/PlayerMovementState';
import playerType from '../State/playerType';
import Server from '../Api/colServer';
import PlayerState from '~/Api/schema/PlayerState';


export default class OtherPlayerController extends Phaser.Scene
{
    player!: Physics.Matter.Sprite;

    name!: string;

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


	constructor( scene: Phaser.Scene, object: Phaser.Physics.Matter.Sprite, server : Server, namer: string) {

        //var name = server.room.sessionId;

		super(namer)

        this.name = namer;

        scene.scene.add(namer, this, true);

        this.position = new Math.Vector2(0,0);

        this.position = new Math.Vector2(0,0);

        this.previous_playerMoveState = PlayerMoveState.Down;

        this.player = object;

        this.playerMoveState = PlayerMoveState.idle;

        this.playerSpeed = 3;

        this.server = server;

        this.showServerPlayer = false;     

        this.server.room.onStateChange( state => {


            let s = this.server.room.state;

            switch (this.name) {
                
                case s.player1?.id:
    
                    this.playerMoveState = s.player1?.playerMoveState as PlayerMoveState;
                    break;
    
                case s.player2?.id:

                    this.playerMoveState = s.player2?.playerMoveState as PlayerMoveState;
                    break;

                case s.player3?.id:

                    this.playerMoveState = s.player3?.playerMoveState as PlayerMoveState;    
                    break;

                case s.player4?.id:

                    this.playerMoveState = s.player4?.playerMoveState as PlayerMoveState;    
                    break;                
            }
            
        })
	}



	preload() {

        this.load.image('BlueOrb', 'blue_orb.png')
    }

    create() {

        if(this.showServerPlayer) {
            this.serverPlayer = this.add.circle(100, 100, 4, Phaser.Display.Color.GetColor(255, 255, 255))
        }

    }

    update(time: number, delta: number): void {
        

        //this.projectileHandler();

        this.movementStateHandler();

        this.syncPosition();
                   
    }



    // projectileHandler = () => {

    //     const is_down = (btn: Phaser.Input.Keyboard.Key) : boolean => {
    //         return Phaser.Input.Keyboard.JustDown(btn);
    //     };

    //     if( is_down( this.up ) ) {

    //         new BlueOrb(
    //             this.matter.world,
    //             this, 
    //             this.player.body.position.x + 10, 
    //             this.player.body.position.y + 10, 
    //             new Phaser.Math.Vector2(0, -10),
    //             900
    //         );
    //     }
    //     else if( is_down( this.down ) ) {

    //         new BlueOrb(
    //             this.matter.world,
    //             this, 
    //             this.player.body.position.x + 10, 
    //             this.player.body.position.y + 10, 
    //             new Phaser.Math.Vector2(0, 10),
    //             900
    //         );            
    //     }
    //     else if( is_down( this.left ) ) {

    //         new BlueOrb(
    //             this.matter.world,
    //             this, 
    //             this.player.body.position.x + 10, 
    //             this.player.body.position.y + 10, 
    //             new Phaser.Math.Vector2(-10, 0),
    //             900
    //         );            
    //     }
    //     else if( is_down( this.right ) ) {

    //         new BlueOrb(
    //             this.matter.world,
    //             this, 
    //             this.player.body.position.x + 10, 
    //             this.player.body.position.y + 10, 
    //             new Phaser.Math.Vector2(10, 0),
    //             900
    //         );            
    //     }
    // }


    movementStateHandler = async () => {
        // LOGIC EXECUTED AT BOTTOM OF FUNCTION

        const handleMoveState = ( p : PlayerState ) => {

            switch ( p?.playerMoveState ) {

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

        let s = this.server.room.state;

        switch (this.server.room.sessionId) {
            
            case s.player1?.id:

                handleMoveState( s.player1 as PlayerState )
                break;

            case s.player2?.id:

                handleMoveState( s.player2 as PlayerState )
                break;
            case s.player3?.id:

                handleMoveState( s.player3 as PlayerState )
                break;
            case s.player4?.id:

                handleMoveState( s.player4 as PlayerState )
                break;                
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

            let sx: number | undefined;
            let x = this.player.x;
            let state = this.server.room.state;
            let sID = this.server.room.sessionId;

            switch ( sID ) {

                case state.player1?.id: 
    
                    sx = state.player1?.x;
                    break;
    
                case state.player2?.id: 
    
                    sx = state.player2?.x;
                    break;   
    
                case state.player3?.id: 
    
                    sx = state.player3?.x;
                    break;
    
                case state.player4?.id: 
    
                    sx = state.player4?.x;
                    break;
            }

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

            let sy : number | undefined;
            let y = this.player.y;
            let state = this.server.room.state;
            let sID = this.server.room.sessionId;            

            switch ( sID ) {

                case state.player1?.id: 
    
                    sy = state.player1?.y;
                    break;
    
                case state.player2?.id: 
    
                    sy = state.player2?.y;
                    break;   
    
                case state.player3?.id: 
    
                    sy = state.player3?.y;
                    break;
    
                case state.player4?.id: 
    
                    sy = state.player4?.y;
                    break;
            }

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
