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

export default class PlayerState extends Schema {

    @type("string") id: string | null = null;
    @type("number") x: number = 0;
    @type("number") y: number = 0;
    @type("number") moveSpeed = 3;
    @type("string") playerMoveState: string = PlayerMoveState.idle;
    @type([ "string" ]) powerUps = new ArraySchema<powerUpTypes>();
  
  }