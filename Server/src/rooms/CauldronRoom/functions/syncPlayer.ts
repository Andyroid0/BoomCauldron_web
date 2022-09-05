import { ArraySchema, MapSchema } from "@colyseus/schema";
import PlayerState from "../../schema/PlayerState";
import Matter from "matter-js";

const syncPlayer = ( players: MapSchema<PlayerState>, playerBodies: Map<string, Matter.Body> ) => {

    players.forEach( player => {

        const body = playerBodies.get( player.bodyId.toString() )

        player.x = body.position.x;
        player.y = body.position.y;
    });
};

export default syncPlayer;