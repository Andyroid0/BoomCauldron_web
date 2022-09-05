import { 

  ArraySchema,
  MapSchema,
  Schema, 
  type
  
} from "@colyseus/schema";
import Matter from "matter-js";

import PlayerState from "./PlayerState";


export default class CauldronRoomState extends Schema {

  @type("number") elapsedTime: number = 0;
  @type( { map: PlayerState }) players = new MapSchema<PlayerState>();

}