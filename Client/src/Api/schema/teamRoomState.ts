import { 
  Schema, 
  type

} from "@colyseus/schema";

import PlayerState from "./PlayerState";



export default class TeamRoomState extends Schema {

  @type("number") elapsedTime: number = 0;
  @type(PlayerState) player1: PlayerState | null = null;
  @type(PlayerState) player2: PlayerState | null = null;
  @type(PlayerState) player3: PlayerState | null = null;
  @type(PlayerState) player4: PlayerState | null = null;


}