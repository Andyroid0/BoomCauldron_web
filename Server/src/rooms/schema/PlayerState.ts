import { 

    ArraySchema,
    Context, 
    Schema, 
    type
  
  } from "@colyseus/schema";
  
  import PlayerMoveState from "../../State/PlayerMovementState";
  import {Body, Bodies} from "matter-js";


enum powerUpTypes {
  hpPlusTen = "hp+10"
}


export default class PlayerState extends Schema {

    
    @type("string") id: number | string = '';
    @type("number") bodyId: number = 0;
    @type("number") x: number = 0;
    @type("number") y: number = 0;
    @type("number") Y_Velocity: number = 0;
    @type("number") X_Velocity: number = 0;
    @type("number") moveSpeed = 3;
    @type("string") playerMoveState: string = PlayerMoveState.idle;
    @type([ "string" ]) powerUps = new ArraySchema<powerUpTypes>();
  
  }