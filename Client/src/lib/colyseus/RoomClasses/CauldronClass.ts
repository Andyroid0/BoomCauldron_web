import CauldronRoomState from "../schema/CauldronRoomState";
import * as Colyseus from "colyseus.js";
import ColyseusClient from "../ColyseusClient";
import Message from "../../../State/Message";

export default class Cauldron {

    room !: Colyseus.Room<CauldronRoomState>;
    client !: ColyseusClient;

    constructor( client : ColyseusClient, setRoom: (room: Colyseus.Room<CauldronRoomState>) => void ) {

        client.joinOrCreate("cauldron")
            .then( room => {

                this.room = room as Colyseus.Room<CauldronRoomState>;
                setRoom(this.room);
                console.log(room.sessionId, "joined", room.name);
            })
            .then( () => {
        
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
}