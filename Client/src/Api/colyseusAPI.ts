import * as Colyseus from "colyseus.js"; // not necessary if included via <script> tag.
import Message from "../State/Message";
const address = 'ws://localhost:2567';
import PlayerMoveState from "../State/PlayerMovementState";

export var client = new Colyseus.Client( address );

var Room: Colyseus.Room;

// JOIN TO ROOM

export const JoinOrCreate = async () => {


    await client.joinOrCreate("test_room")
    .then( room => {
        console.log(room.sessionId, "joined", room.name);
        Room = room;
    })
    .catch( e => {
        console.log("JOIN ERROR", e);
    });

};


export const GetAvailableRoomIDs = (): Colyseus.RoomAvailable<any>[] => {

    let result: unknown = async () => await client.getAvailableRooms();
    return result as  Colyseus.RoomAvailable<any>[];
}

export const sendPlayerMoveState = ( moveState:PlayerMoveState ) => {
    Room.send(Message.PlayerMovement, {moveState: moveState});
}

//==========
// ROOM EVENTS
//==========


// ROOM STATE CHANGE

// room.onStateChange( state => {
//     console.log(room.name, "has new state:", state);
// });

// MESSAGE BROADCASTED FROM SERVER

// room.onMessage("message_type", message => {
//     console.log(client.id, "received on", room.name, message);
// });

// ON SERVER ERROR

// room.onError( (code, message) => {
//     console.log(client.id, "couldn't join", room.name);
// });

// ON CLIENT LEAVE ROOM

// room.onLeave( code => {
//     console.log(client.id, "left", room.name);
// });