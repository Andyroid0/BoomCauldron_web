import * as Colyseus from "colyseus.js"; // not necessary if included via <script> tag.
import Message from "../State/Message";
import PlayerMoveState from "../State/PlayerMovementState";
import { TestRoomState } from "./schema/TestRoomState";
import TeamRoomState from "./schema/teamRoomState";
const address = 'ws://localhost:2567';


class Server extends Colyseus.Client {

    room !: Colyseus.Room<TeamRoomState>;
    connected !: boolean;
    //public slot !: string;
    

    constructor() {
        super("Server")
        this.endpoint = address;
        this.joinOrCreate("test_room")
        .then( room => {
            console.log(room.sessionId, "joined", room.name);
            this.room = room as Colyseus.Room<TeamRoomState>;
        })
        .then( () => {
    
            // ROOM STATE CHANGE
            this.room.onStateChange( state => {
                //console.log( this.room.name, "has new state:", state.playerMoveState);

                console.log( "player1", "x coord:", state.player1?.x, "y coord:", state.player1?.y);
                console.log( "player2", "x coord:", state.player2?.x, "y coord:", state.player2?.y);
            });
    
    
            // MESSAGE BROADCASTED FROM SERVER
            this.room.onMessage( Message.PlayerMovement, message => {
                console.log("move state: " + message);
            });


            this.room.onLeave( () => {
                this.room.send(Message.PlayerLeaving)
                console.log("you left!")
            })
    
        })
        .catch( e => {
            console.log("JOIN ERROR", e);
        });

    }
    sendPlayerMoveState = ( moveState:PlayerMoveState ) => {
        this.room.send(Message.PlayerMovement, {moveState: moveState});
    }
}

export default Server;
//export var client = 

//var Room!: Colyseus.Room<TestRoomState>;

// JOIN TO ROOM




// export const GetAvailableRoomIDs = (): Colyseus.RoomAvailable<any>[] => {

//     let result: unknown = async () => await client.getAvailableRooms();
//     return result as  Colyseus.RoomAvailable<any>[];
// }

// export const sendPlayerMoveState = ( moveState:PlayerMoveState ) => {
//     Room.send(Message.PlayerMovement, {moveState: moveState});
// }


//==========
// ROOM EVENTS
//==========

// // ROOM STATE CHANGE
// Room.onStateChange( state => {
//     console.log( Room.name, "has new state:", state);
// });


// // MESSAGE BROADCASTED FROM SERVER
// Room.onMessage( Message.PlayerMovement, message => {
//     console.log("move state: " + message);
// });


// ON SERVER ERROR

// room.onError( (code, message) => {
//     console.log(client.id, "couldn't join", room.name);
// });

// ON CLIENT LEAVE ROOM

// room.onLeave( code => {
//     console.log(client.id, "left", room.name);
// });