import { Room, Client, ClientState } from "colyseus";
import { MyRoomState } from "../schema/MyRoomState";
import CauldronRoomState from "../schema/CauldronRoomState";
import Message from "../../State/Message";

import Matter, { Bodies, Body, Composite, Engine, Runner } from 'matter-js';
import PlayerMoveState from "../../State/PlayerMovementState";
import PlayerState from "../schema/PlayerState";
import Test_Message from "../../State/Test_Message";
import { ArraySchema } from "@colyseus/schema";
import settlePlayer from "./functions/settlePlayer";
import syncPlayer from "./functions/syncPlayer";
import onBoardPlayer from "./functions/onBoardPlayer";

export default class CauldronRoom extends Room<CauldronRoomState> {

    playerBodies : Map<string, Body>;
    engine : Engine;

    onCreate (options: any) {

        this.engine = Matter.Engine.create();
        this.engine.gravity.y = 0;        
        this.playerBodies = new Map<string, Body>();
        this.setSimulationInterval( deltaTime => this.update(deltaTime) );
        this.setState(new CauldronRoomState());
        Composite.add(this.engine.world, []);
        this.PlayerStateHandler();
        this.PlayerLeaveHandler();

    }

    onJoin (client: Client, options: any) {

        onBoardPlayer( client.id, 100, 100, this.state.players, this.playerBodies, this.engine )

    }

    onLeave (client: Client, consented: boolean) {

        settlePlayer( client.id, this.engine, this.state.players, this.playerBodies );

    }

    onDispose() {

        console.log("room", this.roomId, "disposing...");
    }

    update ( deltaTime: number ) {

        Engine.update(this.engine, deltaTime);

        syncPlayer(this.state.players, this.playerBodies);
    }


//==========================================
//  Listeners
//==========================================    

    PlayerStateHandler = () => {

        this.onMessage( Message.PlayerMovement, ( client, message ) => {

            // HANDLE PLAYER MOVE STATE MESSAGES
            this.state.players.forEach( player => {
                if ( player.id === client.sessionId ) {
                    player.playerMoveState = message;
                }
            })
        });
    };

    PlayerLeaveHandler = () => {

        this.onMessage( Message.PlayerLeaving, client => {

            settlePlayer( client.sessionId , this.engine, this.state.players, this.playerBodies );

        });
    };

}