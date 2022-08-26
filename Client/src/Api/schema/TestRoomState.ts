import { Schema, Context, type } from "@colyseus/schema";
import PlayerMoveState from "../../State/PlayerMovementState";

class Position extends Schema {

  @type("number") x: number = 0;
  @type("number") y: number = 0;

}

export class TestRoomState extends Schema {

  @type("string") mySynchronizedProperty: string = "Hello world";
  @type("string") playerMoveState: string = "idle";
  @type("number") x: number = 0;
  @type("number") y: number = 0;
  //@type(Position) position: Position = new Position(0,0);

}