import Phaser from 'phaser'
import Player from '../Actors/Players/Player';
import OtherPlayer from '../Actors/Players/OtherPlayer';
import Color from 'color';
import PlayerController from '~/Scripts/PlayerController';
import PlayerState from '~/Api/schema/PlayerState';
import { colyseusClient } from '../main';
import * as Colyseus from "colyseus.js";
import CauldronRoomState from '../Api/schema/CauldronRoomState';



export default class CauldronMode extends Phaser.Scene
{
    player !: Player;

    playerController !: PlayerController;

    room !: Colyseus.Room<CauldronRoomState>;

	constructor()
	{
		super('cauldron-world')

        this.room = colyseusClient.room as Colyseus.Room<CauldronRoomState>

	}

    createPlayer = ( ps: PlayerState | null ) => {
        if(ps?.id == colyseusClient?.room?.sessionId) {

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

	preload()
    {

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



        this.createPlayer(
            colyseusClient.room?.state.players
                .find(
                    player => {
                        return player.id === colyseusClient.room?.sessionId
                    }
                ) as PlayerState
        );

        const players: unknown = colyseusClient.room?.state.players;
        const defined = players as ArraySchema<PlayerState>
            .onAdd = (item, key) => {}


               //onStateChange( state => {

            const handlePlayerCreation = function () {
                colyseusClient.room?.state.
            }

            if( colyseusClient.room?.sessionId == state.player1?.id ) {

                // if (this.player == undefined && this.player == null) {

                //     this.createPlayer( colyseusClient.room.state.player1 );
                // }
                if(state.player2 != null && !this.scene.manager.getScene(state.player2.id as string) ) {
                    // ADD TEAM MEMBER COMPONENT
                    this.createOtherPlayer( colyseusClient.room?.state.player2 );
                }
                if(state.player3 != null) {
                    // ADD TEAM MEMBER COMPONENT
                    this.createOtherPlayer( colyseusClient.room?.state.player3 );
                }
                if(state.player4 != null) {
                    // ADD TEAM MEMBER COMPONENT
                    this.createOtherPlayer( colyseusClient.room?.state.player4 );
                }
            }
            else if( colyseusClient.room?.sessionId == state.player2?.id ) {

                // if (this.player == undefined && this.player == null) {

                //     this.createPlayer( colyseusClient.room.state.player2 );
                // }
                if(state.player1 != null) {
                    // ADD TEAM MEMBER COMPONENT
                    this.createOtherPlayer( colyseusClient.room?.state.player1 );
                }
                if(state.player3 != null) {
                    // ADD TEAM MEMBER COMPONENT
                    this.createOtherPlayer( colyseusClient.room?.state.player3 );
                }
                if(state.player4 != null) {
                    // ADD TEAM MEMBER COMPONENT
                    this.createOtherPlayer( colyseusClient.room?.state.player4 );
                }
            }
            else if( colyseusClient.room?.sessionId == state.player3?.id ) {

                // if (this.player == undefined && this.player == null) {

                //     this.createPlayer( colyseusClient.room.state.player3 );
                // }
                if(state.player1 != null) {
                    // ADD TEAM MEMBER COMPONENT
                    this.createOtherPlayer( colyseusClient.room?.state.player1 );
                }
                if(state.player2 != null) {
                    // ADD TEAM MEMBER COMPONENT
                    this.createOtherPlayer( colyseusClient.room?.state.player2 );
                }
                if(state.player4 != null) {
                    // ADD TEAM MEMBER COMPONENT
                    this.createOtherPlayer( colyseusClient.room?.state.player4 );
                }
            }
            else if( colyseusClient.room?.sessionId == state.player4?.id ) {

                // if (this.player == undefined && this.player == null) {

                //     this.createPlayer( colyseusClient.room.state.player4 );
                // }
                if(state.player1 != null) {
                    // ADD TEAM MEMBER COMPONENT
                    this.createOtherPlayer( colyseusClient.room?.state.player1 );
                }
                if(state.player2 != null) {
                    // ADD TEAM MEMBER COMPONENT
                    this.createOtherPlayer( colyseusClient.room?.state.player2 );
                }
                if(state.player3 != null) {
                    // ADD TEAM MEMBER COMPONENT
                    this.createOtherPlayer( colyseusClient.room?.state.player3 );
                }
            }
        })

    }

    update(time: number, delta: number): void {

        if( colyseusClient.room && this.player == undefined || colyseusClient.room && this.player == null ) {


            if( colyseusClient?.room?.sessionId == colyseusClient?.room?.state?.player1?.id ) {

                console.log("sloppy don miloso vitch")
                this.createPlayer( colyseusClient?.room?.state?.player1 );

                // if(colyseusClient.room.state.player2 != null) {
                //     // ADD TEAM MEMBER COMPONENT
                //     this.createOtherPlayer( state.player2 );
                // }
                // if(colyseusClient.room.state.player3 != null) {
                //     // ADD TEAM MEMBER COMPONENT
                //     this.createOtherPlayer( state.player3 );
                // }
                // if(colyseusClient.room.state.player4 != null) {
                //     // ADD TEAM MEMBER COMPONENT
                //     this.createOtherPlayer( state.player4 );
                // }
            }
            else if( colyseusClient?.room?.sessionId == colyseusClient?.room?.state?.player2?.id ) {
                console.log("blog")
                this.createPlayer( colyseusClient?.room?.state?.player2 );

                if(colyseusClient?.room?.state?.player1 != null) {
                    // ADD TEAM MEMBER COMPONENT
                    this.createOtherPlayer( colyseusClient?.room?.state?.player1 );
                }
                // if(colyseusClient.room.state.player3 != null) {
                //     // ADD TEAM MEMBER COMPONENT
                //     this.createOtherPlayer( colyseusClient.room.state.player3 );
                // }
                // if(colyseusClient.room.state.player4 != null) {
                //     // ADD TEAM MEMBER COMPONENT
                //     this.createOtherPlayer( colyseusClient.room.state.player4 );
                // }
            }
            else if( colyseusClient?.room?.sessionId == colyseusClient?.room?.state?.player3?.id ) {

                this.createPlayer( colyseusClient?.room?.state?.player3 );

                // if(colyseusClient.room.state.player1 != null) {
                //     // ADD TEAM MEMBER COMPONENT
                //     this.createOtherPlayer( state.player1 );
                // }
                // if(colyseusClient.room.state.player2 != null) {
                //     // ADD TEAM MEMBER COMPONENT
                //     this.createOtherPlayer( state.player2 );
                // }
                // if(colyseusClient.room.state.player4 != null) {
                //     // ADD TEAM MEMBER COMPONENT
                //     this.createOtherPlayer( state.player4 );
                // }
            }
            else if( colyseusClient?.room?.sessionId == colyseusClient?.room?.state?.player4?.id ) {

                this.createPlayer( colyseusClient?.room?.state?.player4 );

                // if(colyseusClient.room.state.player1 != null) {
                //     // ADD TEAM MEMBER COMPONENT
                //     this.createOtherPlayer( state.player1 );
                // }
                // if(colyseusClient.room.state.player2 != null) {
                //     // ADD TEAM MEMBER COMPONENT
                //     this.createOtherPlayer( state.player2 );
                // }
                // if(colyseusClient.room.state.player3 != null) {
                //     // ADD TEAM MEMBER COMPONENT
                //     this.createOtherPlayer( state.player3 );
                // }
            }
        }





