import { Room, Client } from "colyseus";
import { MyRoomState } from "./schema/MyRoomState";
import { TestRoomState } from "./schema/TestRoomState";
import Message from "../State/Message";

export class TestRoom extends Room<TestRoomState> {

  onCreate (options: any) {

    this.setState(new TestRoomState());

    this.onMessage( Message.PlayerMovement, (client, message) => {

      console.log(message);
      //
      // handle "type" message
      //
    });

  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");
    
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }


}
