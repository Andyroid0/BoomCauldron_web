import * as Colyseus from "colyseus.js"; // not necessary if included via <script> tag.
import Cauldron from "./RoomClasses/CauldronClass";
import CauldronRoomState from "./schema/CauldronRoomState";
import TeamRoomState from "./schema/teamRoomState";
const address = 'ws://localhost:2567';


class ColyseusClient extends Colyseus.Client {

    room ?: Colyseus.Room<CauldronRoomState>;

    constructor() {

        super("Colyseus-Client")

        this.endpoint = address;

        new Cauldron( this );

    }

}

export default ColyseusClient;
