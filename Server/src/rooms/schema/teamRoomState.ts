import { 

  ArraySchema,
  Context, 
  Schema, 
  type

} from "@colyseus/schema";

import PlayerMoveState from "../../State/PlayerMovementState";
import {Vector} from "matter-js";

enum powerUpTypes {
  hpPlusTen = "hp+10"
}

class Player extends Schema {

  @type("number") x: number = 0;
  @type("number") y: number = 0;
  @type("string") playerMoveState: string = PlayerMoveState.idle;
  @type([ "string" ]) powerUps = new ArraySchema<powerUpTypes>();

}

export class TestRoomState extends Schema {

  @type("number") elapsedTime: number = 0;
  @type(Player) player1: Player = null;//new Player();
  @type(Player) player2: Player = null;
  @type(Player) player3: Player = null;
  @type(Player) player4: Player = null;


}