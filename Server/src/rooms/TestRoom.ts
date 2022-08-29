import { Room, Client, ClientState } from "colyseus";
import { MyRoomState } from "./schema/MyRoomState";
import { TestRoomState } from "./schema/TestRoomState";
import { TeamRoomState } from "./schema/teamRoomState";
import Message from "../State/Message";

import Matter, { Vector } from 'matter-js';
import PlayerMoveState from "../State/PlayerMovementState";
import PlayerState from "./schema/PlayerState";

export class TestRoom extends Room<TeamRoomState> {

  engine: Matter.Engine;
  runner: Matter.Runner;
  bodies: Matter.Bodies;
  composite: Matter.Composite;

  player1: Matter.Body;
  player2: Matter.Body;
  player3: Matter.Body;
  player4: Matter.Body;

  playerSpeed: number;

  onCreate (options: any) {

    this.engine = Matter.Engine.create();
    this.engine.gravity.y = 0;
    this.runner = Matter.Runner.create();
    this.bodies = Matter.Bodies;
    this.composite = Matter.Composite.create();


    this.setState(new TeamRoomState());

    // ADD WORLD OBJECTS HERE
    Matter.Composite.add(this.engine.world, [])

    // this.onMessage( Message.PlayerSlotAssignment, client => {

    //   let result;
    //   let s = this.state;

    //   const check = (s:any) : boolean => {
    //     if(s == client.id) {
    //       return true;
    //     } else return false;
    //   }

    //   if( check( s.player1.id )) {
    //     result = "player1";
    //   }
    //   else if ( check( s.player2.id )) {
    //     result = "player2";
    //   }
    //   else if ( check( s.player3.id )) {
    //     result = "player3"
    //   }
    //   else if ( check( s.player4.id )) {
    //     result = "player4"
    //   }
    //   else result = null;

    //   client.send( Message.PlayerSlotAssignment, result);
    // })
    
    this.onMessage( Message.PlayerMovement, ( client, message ) => {
      // HANDLE PLAYER MOVE STATE MESSAGES
      var id = client.id;
      var s = this.state;

      if( s.player1.id == id ) {
        
        s.player1.playerMoveState = message;
      }
      else if( s.player2.id == id ) {

        s.player2.playerMoveState = message; 
      }
      else if( s.player3.id == id ) {

        s.player3.playerMoveState = message;
      }
      else if( s.player4.id == id ) {

        s.player4.playerMoveState = message;
      }
    });

    this.onMessage( Message.PlayerLeaving, client => {
      if(this.state.player1.id == client.id) {

        this.state.player1 = null;
        Matter.Composite.remove(this.engine.world, this.player1);
        this.player1 = null;
      }
      else if(this.state.player2.id == client.id) {
        
        this.state.player2 = null;
        Matter.Composite.remove(this.engine.world, this.player2);
        this.player2 = null;
      }
      else if(this.state.player3.id == client.id) {
        
        this.state.player3 = null;
        Matter.Composite.remove( this.engine.world, this.player3 );
        this.player3 = null;
      }
      else if(this.state.player4.id == client.id) {
        
        this.state.player4 = null;
        Matter.Composite.remove( this.engine.world, this.player4 );
        this.player4 = null;
      }
    })

    setInterval( () => {

      // PHYSICS
      try {
        if (this.state.player1) this.handleMovement( this.player1, this.state.player1.playerMoveState, this.state.player1.moveSpeed );
        if (this.state.player2) this.handleMovement( this.player2, this.state.player2.playerMoveState, this.state.player2.moveSpeed );
        if (this.state.player3) this.handleMovement( this.player3, this.state.player3.playerMoveState, this.state.player3.moveSpeed );
        if (this.state.player4) this.handleMovement( this.player4, this.state.player4.playerMoveState, this.state.player4.moveSpeed );
      }
      catch (e) {
        console.log(e)
      }

      Matter.Engine.update(this.engine, 1000/60)

      // MAIN LOOP
      this.syncPhysicsToState();


    }, 1000/60);

  }


  onJoin (client: Client, options: any) {

    //this.send(client, Message.ClientID, client.id + " " + client.sessionId)
    console.log(client.sessionId, "joined!");

    if ( this.state.player1 == null ) {

      let x = 100;
      let y = 100;
      this.player1 = Matter.Bodies.circle(x, y, 20);

      Matter.Composite.add(this.engine.world, this.player1)
      this.state.player1 = new PlayerState();

      let p = this.state.player1;
      p.id = client.id;
      p.x = x;
      p.y = y;

      //client.send( Message.PlayerSlotAssignment, "player1 ");
    }
    else if ( this.state.player2 == null && this.state.player1 != null) {

      let x = this.player1.position.x
      let y = this.player1.position.y + 25
      this.player2 = Matter.Bodies.circle(x, y, 20 );

      Matter.Composite.add(this.engine.world, this.player2);
      this.state.player2 = new PlayerState();
      let p = this.state.player1;
      p.id = client.id;
      p.x = x;
      p.y = y;    
      //client.send( Message.PlayerSlotAssignment, "player2" );
    }
    else if ( this.state.player3 == null && this.state.player1 != null && this.state.player2 != null ) {
      
      let x = this.player1.position.x - 25;
      let y = this.player1.position.y - 25;
      this.player3 = Matter.Bodies.circle( x, y, 20 );

      Matter.Composite.add(this.engine.world, this.player3);
      this.state.player3 = new PlayerState();

      let p = this.state.player1;
      p.id = client.id;
      p.x = x;
      p.y = y;     
      //client.send( Message.PlayerSlotAssignment, "player3" );

    }
    else if ( this.state.player4 == null && this.state.player1 != null && this.state.player2 != null && this.state.player3 != null ) {

      let x = this.player1.position.x + 25;
      let y = this.player1.position.y + 25;
      this.player4 = Matter.Bodies.circle( x, y, 20 );

      Matter.Composite.add(this.engine.world, this.player4);
      this.state.player4 = new PlayerState();

      let p = this.state.player1;
      p.id = client.id;
      p.x = x;
      p.y = y; 
      //client.send( Message.PlayerSlotAssignment, "player4" );

    }
  }

  onLeave (client: Client, consented: boolean) {
      this.state.player1 = null;
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }



  syncPhysicsToState = () => {

    const synchronize = (physicsBody : Matter.Body, player: PlayerState) => {

      if ( 

        physicsBody && player && player.x != physicsBody?.position.x
        || 
        physicsBody && player && player.y != physicsBody?.position.y 

        ) {

        player.x = physicsBody?.position.x;
        player.y = physicsBody?.position.y;
      }
    };

    synchronize(this.player1, this.state.player1);
    synchronize(this.player2, this.state.player2);
    synchronize(this.player3, this.state.player3);
    synchronize(this.player4, this.state.player4);
  };


  handleMovement = (physicsBody : Matter.Body, moveState : string, moveSpeed: number) => {

    if ( physicsBody ) {
      var x = physicsBody.position.x;
      var y = physicsBody.position.y;

      switch ( moveState ) {

        case PlayerMoveState.idle:

          Matter.Body.setVelocity( physicsBody, Matter.Vector.create( 0, 0))
          break;

        case PlayerMoveState.Down:

          Matter.Body.setVelocity( physicsBody, Matter.Vector.create( 0, moveSpeed));

          break;

        case PlayerMoveState.DownLeft:

          Matter.Body.setVelocity( physicsBody, Matter.Vector.create( -moveSpeed, moveSpeed));
          break;

        case PlayerMoveState.DownRight:

          Matter.Body.setVelocity( physicsBody, Matter.Vector.create( moveSpeed, moveSpeed));
          break;

        case PlayerMoveState.Left:

          Matter.Body.setVelocity( physicsBody, Matter.Vector.create( -moveSpeed, 0));
          break;

        case PlayerMoveState.Right:

          Matter.Body.setVelocity( physicsBody, Matter.Vector.create( moveSpeed, 0));
          break;

        case PlayerMoveState.Up:

          Matter.Body.setVelocity( physicsBody, Matter.Vector.create( 0, -moveSpeed));
          break;

        case PlayerMoveState.UpLeft:

          Matter.Body.setVelocity( physicsBody, Matter.Vector.create( -moveSpeed, -moveSpeed));
          break;

        case PlayerMoveState.UpRight:

          Matter.Body.setVelocity( physicsBody, Matter.Vector.create( moveSpeed, -moveSpeed));
          break;

      }
    }
  }

}
