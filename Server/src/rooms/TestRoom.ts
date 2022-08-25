import { Room, Client } from "colyseus";
import { MyRoomState } from "./schema/MyRoomState";
import { TestRoomState } from "./schema/TestRoomState";
import Message from "../State/Message";

import Matter from 'matter-js';

export class TestRoom extends Room<TestRoomState> {

  engine: Matter.Engine;
  runner: Matter.Runner;
  bodies: Matter.Bodies;
  composite: Matter.Composite;
  player: Matter.Body;

  onCreate (options: any) {

    this.engine = Matter.Engine.create();
    this.runner = Matter.Runner.create();
    this.bodies = Matter.Bodies;
    this.composite = Matter.Composite.create();

    this.setState(new TestRoomState());
    //this.state.playerMoveState

    // ADD WORLD OBJECTS HERE
    Matter.Composite.add(this.engine.world, [])

    this.onMessage( Message.PlayerMovement, (client, message) => {

      this.state.playerMoveState = message;
      //this.broadcast( Message.PlayerMovement, message);
      //
      // handle "type" message
      //
    });

    setInterval( () => {
      // MAIN LOOP
      Matter.Engine.update(this.engine, 1000/30)

    }, 1000/30)
  }

  onJoin (client: Client, options: any) {

    console.log(client.sessionId, "joined!");
    this.player = Matter.Bodies.circle(100, 100, 80);
    Matter.Composite.add(this.engine.world, this.player)

  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

  frank = () => {
    console.log("frank")
  }

}
