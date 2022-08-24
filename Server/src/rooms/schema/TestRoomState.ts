import { Schema, Context, type } from "@colyseus/schema";
import PlayerMoveState from "../../State/PlayerMovementState";

export class TestRoomState extends Schema {

  @type("string") mySynchronizedProperty: string = "Hello world";
  @type("string") playerMoveState: string = "idle";


}