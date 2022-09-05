import PlayerState from "../../schema/PlayerState";
import { Client } from "colyseus";
import Matter, {Bodies, Composite, } from "matter-js";
import PlayerMoveState from "../../../State/PlayerMovementState";
import { ArraySchema, MapSchema } from "@colyseus/schema";


const onBoardPlayer = ( clientId: string, x:number, y:number, players: MapSchema<PlayerState>, playerBodies: Map<string, Matter.Body>, engine: Matter.Engine ) => {

    //let x = 100;
    //let y = 100;
    let player = new PlayerState();
    let body = Bodies.circle( x, y, 20);
    player.bodyId = body.id;
    player.id = clientId;
    player.x = x;
    player.y = y;

    players.set(clientId, player)
    playerBodies.set(clientId, body)
    Composite.add( engine.world, body);

    player.listen('playerMoveState', state => {

        switch (state) {
            case PlayerMoveState.idle:

                Matter.Body.setVelocity( body, Matter.Vector.create( 0, 0))
                break;
        
                case PlayerMoveState.Down:
        
                Matter.Body.setVelocity( body, Matter.Vector.create( 0, player.moveSpeed ));
        
                break;
        
                case PlayerMoveState.DownLeft:
        
                Matter.Body.setVelocity( body, Matter.Vector.create( -player.moveSpeed, player.moveSpeed));
                break;
        
                case PlayerMoveState.DownRight:
        
                Matter.Body.setVelocity( body, Matter.Vector.create( player.moveSpeed, player.moveSpeed));
                break;
        
                case PlayerMoveState.Left:
        
                Matter.Body.setVelocity( body, Matter.Vector.create( -player.moveSpeed, 0));
                break;
        
                case PlayerMoveState.Right:
        
                Matter.Body.setVelocity( body, Matter.Vector.create( player.moveSpeed, 0));
                break;
        
                case PlayerMoveState.Up:
        
                Matter.Body.setVelocity( body, Matter.Vector.create( 0, -player.moveSpeed));
                break;
        
                case PlayerMoveState.UpLeft:
        
                Matter.Body.setVelocity( body, Matter.Vector.create( -player.moveSpeed, -player.moveSpeed));
                break;
        
                case PlayerMoveState.UpRight:
        
                Matter.Body.setVelocity( body, Matter.Vector.create( player.moveSpeed, -player.moveSpeed));
                break;
        }
    })
};

export default onBoardPlayer;