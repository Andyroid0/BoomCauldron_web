import { Schema, Context, type } from "@colyseus/schema";
import PlayerMoveState from "../../State/PlayerMovementState";
import {Vector} from "matter-js";

class Position extends Schema {

  @type("number") x: number = 0;
  @type("number") y: number = 0;

}

export class TestRoomState extends Schema {

  @type("string") mySynchronizedProperty: string = "Hello world";
  @type("string") playerMoveState: string = PlayerMoveState.idle;
  @type("string") previous_playerMoveState: string = PlayerMoveState.idle;
  @type("number") x: number = 0;
  @type("number") y: number = 0;
  //@type(Position) position: Position = new Position(0,0);

}