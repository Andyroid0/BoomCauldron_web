import { Client, ClientState } from "colyseus";
import { ArraySchema, MapSchema } from "@colyseus/schema";
import PlayerState from "../../schema/PlayerState";
import Matter from "matter-js";

const settlePlayer = ( clientId: string, engine: Matter.Engine, players: MapSchema<PlayerState>, playerBodies: Map<string, Matter.Body> ) => {

    Matter.Composite
        .remove( 

            engine.world, 

            playerBodies
                .get( players.get( clientId ).bodyId.toString() )
        );
    players.delete(clientId);
    playerBodies.delete(clientId);

};

export default settlePlayer;