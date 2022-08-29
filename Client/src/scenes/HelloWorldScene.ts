import Phaser from 'phaser'
import Player from './Actors/Player'; 
import OtherPlayer from './Actors/OtherPlayer';
//import { listenTest } from '../Api/Server';
import Server from '../Api/colServer';
import Color from 'color';
import PlayerController from '~/Scripts/PlayerController';
import PlayerState from '~/Api/schema/PlayerState';

export const server = new Server();

export default class HelloWorldScene extends Phaser.Scene
{
    player !: Player;

    playerController !: PlayerController;

	constructor()
	{
		super('hello-world')


	}

	preload()
    {
        //listenTest();
        this.load.image('crystal1', 'crystal1.png');
        this.load.image('crystal2', 'crystal2.png');
        this.load.image('crystal3', 'crystal3.png');

        this.load.image('grassEdge1', 'grassEdge1.png');
        this.load.image('grassEdge2', 'grassEdge2.png');

        this.load.image('test', 'test.png')
        this.load.image('bush', 'bush_1.png');

    }

    create()
    {
        //var frank = this.add.image(400, 300, 'test');
        //this.add.rectangle(400,320,400,300, Color("#488601").rgbNumber().valueOf() );
        this.add.image(400, 400, 'crystal1');
        this.add.image(445, 400, 'crystal2');
        this.add.image(355, 410, 'crystal3');

        var g1 = this.add.image(300, 480, 'grassEdge2')
        g1.tint = Color("#c756c7").rgbNumber().valueOf();
        g1.tintFill = true;
        
        var g2 = this.add.image(325, 480, 'grassEdge1');
        g2.tint = Color("#ff80e5").rgbNumber().valueOf();
        g2.tintFill = true;

        var g3 = this.add.image(275, 480, 'grassEdge1');
        g3.tint = Color("#ff80e5").rgbNumber().valueOf();
        g3.tintFill = true;



        // server.room.onStateChange( state => {
        //     console.log("frog")
        //     if( server.room.sessionId == state.player1?.id ) {

        //         if (this.player == undefined && this.player == null) {

        //             this.createPlayer( server.room.state.player1, true );
        //         }
        //         if(state.player2 != null) {
        //             // ADD TEAM MEMBER COMPONENT
        //             this.createPlayer( server.room.state.player2, false );
        //         }
        //         if(state.player3 != null) {
        //             // ADD TEAM MEMBER COMPONENT
        //             this.createPlayer( server.room.state.player3, false );
        //         }
        //         if(state.player4 != null) {
        //             // ADD TEAM MEMBER COMPONENT
        //             this.createPlayer( server.room.state.player4, false );
        //         }
        //     }
        //     else if( server.room.sessionId == state.player2?.id ) {

        //         if (this.player == undefined && this.player == null) {

        //             this.createPlayer( server.room.state.player2, true );
        //         }
        //         if(state.player1 != null) {
        //             // ADD TEAM MEMBER COMPONENT
        //             this.createPlayer( server.room.state.player1, false );
        //         }
        //         if(state.player3 != null) {
        //             // ADD TEAM MEMBER COMPONENT
        //             this.createPlayer( server.room.state.player3, false );
        //         }
        //         if(state.player4 != null) {
        //             // ADD TEAM MEMBER COMPONENT
        //             this.createPlayer( server.room.state.player4, false );
        //         }                    
        //     }
        //     else if( server.room.sessionId == state.player3?.id ) {

        //         if (this.player == undefined && this.player == null) {

        //             this.createPlayer( server.room.state.player3, true );
        //         }
        //         if(state.player1 != null) {
        //             // ADD TEAM MEMBER COMPONENT
        //             this.createPlayer( server.room.state.player1, false );
        //         }
        //         if(state.player2 != null) {
        //             // ADD TEAM MEMBER COMPONENT
        //             this.createPlayer( server.room.state.player2, false );
        //         }
        //         if(state.player4 != null) {
        //             // ADD TEAM MEMBER COMPONENT
        //             this.createPlayer( server.room.state.player4, false );
        //         }                    
        //     }
        //     else if( server.room.sessionId == state.player4?.id ) {

        //         if (this.player == undefined && this.player == null) {

        //             this.createPlayer( server.room.state.player4, true );
        //         }
        //         if(state.player1 != null) {
        //             // ADD TEAM MEMBER COMPONENT
        //             this.createPlayer( server.room.state.player1, false );
        //         }
        //         if(state.player2 != null) {
        //             // ADD TEAM MEMBER COMPONENT
        //             this.createPlayer( server.room.state.player2, false );
        //         }
        //         if(state.player3 != null) {
        //             // ADD TEAM MEMBER COMPONENT
        //             this.createPlayer( server.room.state.player3, false );
        //         }                    
        //     }
        // })        

    }

    update(time: number, delta: number): void {

        if( server.room && this.player == undefined || server.room && this.player == null ) {


            if( server?.room?.sessionId == server?.room?.state?.player1?.id ) {

                console.log("sloppy don miloso vitch")
                this.createPlayer( server?.room?.state?.player1 );

                // if(server.room.state.player2 != null) {
                //     // ADD TEAM MEMBER COMPONENT
                //     this.createOtherPlayer( state.player2 );
                // }
                // if(server.room.state.player3 != null) {
                //     // ADD TEAM MEMBER COMPONENT
                //     this.createOtherPlayer( state.player3 );
                // }
                // if(server.room.state.player4 != null) {
                //     // ADD TEAM MEMBER COMPONENT
                //     this.createOtherPlayer( state.player4 );
                // }
            }
            else if( server?.room?.sessionId == server?.room?.state?.player2?.id ) {
                console.log("blog")
                this.createPlayer( server?.room?.state?.player2 );

                if(server?.room?.state?.player1 != null) {
                    // ADD TEAM MEMBER COMPONENT
                    this.createOtherPlayer( server?.room?.state?.player1 );
                }
                // if(server.room.state.player3 != null) {
                //     // ADD TEAM MEMBER COMPONENT
                //     this.createOtherPlayer( server.room.state.player3 );
                // }
                // if(server.room.state.player4 != null) {
                //     // ADD TEAM MEMBER COMPONENT
                //     this.createOtherPlayer( server.room.state.player4 );
                // }                    
            }
            else if( server?.room?.sessionId == server?.room?.state?.player3?.id ) {

                this.createPlayer( server?.room?.state?.player3 );

                // if(server.room.state.player1 != null) {
                //     // ADD TEAM MEMBER COMPONENT
                //     this.createOtherPlayer( state.player1 );
                // }
                // if(server.room.state.player2 != null) {
                //     // ADD TEAM MEMBER COMPONENT
                //     this.createOtherPlayer( state.player2 );
                // }
                // if(server.room.state.player4 != null) {
                //     // ADD TEAM MEMBER COMPONENT
                //     this.createOtherPlayer( state.player4 );
                // }                    
            }
            else if( server?.room?.sessionId == server?.room?.state?.player4?.id ) {

                this.createPlayer( server?.room?.state?.player4 );

                // if(server.room.state.player1 != null) {
                //     // ADD TEAM MEMBER COMPONENT
                //     this.createOtherPlayer( state.player1 );
                // }
                // if(server.room.state.player2 != null) {
                //     // ADD TEAM MEMBER COMPONENT
                //     this.createOtherPlayer( state.player2 );
                // }
                // if(server.room.state.player3 != null) {
                //     // ADD TEAM MEMBER COMPONENT
                //     this.createOtherPlayer( state.player3 );
                // }  
            }                  
        }   
    }


    createPlayer = ( ps: PlayerState | null ) => {
        if(ps?.id == server?.room?.sessionId) {

            this.player = new Player( 
                this.matter.world, 
                this, 
                ps?.x as number, 
                ps?.y as number 
            );
            this.playerController = this.player.controller;
        }
    }

    createOtherPlayer = ( ps: PlayerState | null ) => {
        new OtherPlayer( 
            this.matter.world, 
            this, 
            ps?.x as number, 
            ps?.y as number,
            ps?.id as string 
        );
    }

}
