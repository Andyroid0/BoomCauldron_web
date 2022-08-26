import { Room, Client } from "colyseus";
import { MyRoomState } from "./schema/MyRoomState";
import { TestRoomState } from "./schema/TestRoomState";
import Message from "../State/Message";

import Matter, { Vector } from 'matter-js';
import PlayerMoveState from "../State/PlayerMovementState";

export class TestRoom extends Room<TestRoomState> {

  engine: Matter.Engine;
  runner: Matter.Runner;
  bodies: Matter.Bodies;
  composite: Matter.Composite;
  player: Matter.Body;

  playerSpeed: number;

  onCreate (options: any) {

    this.engine = Matter.Engine.create();
    this.engine.gravity.y = 0;
    this.runner = Matter.Runner.create();
    this.bodies = Matter.Bodies;
    this.composite = Matter.Composite.create();

    this.playerSpeed = 3;

    this.setState(new TestRoomState());
    //this.state.playerMoveState

    // ADD WORLD OBJECTS HERE
    Matter.Composite.add(this.engine.world, [])

    this.onMessage( Message.PlayerMovement, (client, message) => {

      this.state.playerMoveState = message;

    });

    setInterval( () => {

      if(this.player) {
        var x = this.player.position.x;
        var y = this.player.position.y;

        switch( this.state.playerMoveState ) {

          case PlayerMoveState.idle:
            Matter.Body.setVelocity(this.player, Matter.Vector.create( 0, 0))


            break;
  
          case PlayerMoveState.movingDown:
            Matter.Body.setVelocity(this.player, Matter.Vector.create( 0, this.playerSpeed));
            //this.player.position = Matter.Vector.create(x , y + (-this.playerSpeed * .03) )
            //this.player.force = Matter.Vector.create( 0, this.playerSpeed );
            break;
  
          case PlayerMoveState.movingDownLeft:
            Matter.Body.setVelocity(this.player, Matter.Vector.create( -this.playerSpeed, this.playerSpeed));
            //this.player.force = Matter.Vector.create( -this.playerSpeed, this.playerSpeed );
            break;
  
          case PlayerMoveState.movingDownRight:
            Matter.Body.setVelocity(this.player, Matter.Vector.create( this.playerSpeed, this.playerSpeed));
            //this.player.force = Matter.Vector.create( this.playerSpeed, this.playerSpeed );
            break;
  
          case PlayerMoveState.movingLeft:
            Matter.Body.setVelocity(this.player, Matter.Vector.create( -this.playerSpeed, 0));
            //this.player.force = Matter.Vector.create( -this.playerSpeed, 0 );
            break;
  
          case PlayerMoveState.movingRight:
            Matter.Body.setVelocity(this.player, Matter.Vector.create( this.playerSpeed, 0));
            //this.player.force = Matter.Vector.create( this.playerSpeed, 0 );
            break;
  
          case PlayerMoveState.movingUp:
            Matter.Body.setVelocity(this.player, Matter.Vector.create( 0, -this.playerSpeed));
            //this.player.force = Matter.Vector.create( 0, -this.playerSpeed );
            break;
  
          case PlayerMoveState.movingUpLeft:
            Matter.Body.setVelocity(this.player, Matter.Vector.create( -this.playerSpeed, -this.playerSpeed));
            //this.player.force = Matter.Vector.create( -this.playerSpeed, -this.playerSpeed );
            break;
  
          case PlayerMoveState.movingUpRight:
            Matter.Body.setVelocity(this.player, Matter.Vector.create( this.playerSpeed, -this.playerSpeed));
            //this.player.force = Matter.Vector.create( -this.playerSpeed, this.playerSpeed );
            break;
  
        }
      }

      Matter.Engine.update(this.engine, 1000/60)

      // MAIN LOOP

      if( this.player && this.state.x != this.player?.position.x || this.player && this.state.y != this.player?.position.y ) {
        this.state.x = this.player?.position.x;
        this.state.y = this.player?.position.y;
      }

    }, 1000/60)

  }

  onJoin (client: Client, options: any) {

    console.log(client.sessionId, "joined!");
    this.player = Matter.Bodies.circle(100, 100, 20);
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
