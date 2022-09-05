import { ColyseusTestServer, boot } from "@colyseus/testing";

// import your "arena.config.ts" file here.
import appConfig from "../src/arena.config";
import CauldronRoomState from "../src/rooms/schema/CauldronRoomState";
import { expect } from 'chai';
import onBoardPlayer from "../src/rooms/CauldronRoom/functions/onBoardPlayer";
import settlePlayer from "../src/rooms/CauldronRoom/functions/settlePlayer";
import syncPlayer from "../src/rooms/CauldronRoom/functions/syncPlayer";
import { ArraySchema } from "@colyseus/schema";
import PlayerState from "../src/rooms/schema/PlayerState";
import Matter from "matter-js";
import { ClientState } from "colyseus";
import CauldronRoom from "../src/rooms/CauldronRoom/CauldronRoom";
import PlayerMoveState from "../src/State/PlayerMovementState";
import Message from "../src/State/Message";

describe("Cauldron Room Testing", function () {

  let colyseus: ColyseusTestServer;

  before( async function  () { colyseus = await boot(appConfig) });
  after( async function () { await colyseus.shutdown() });

  beforeEach( async function () { await colyseus.cleanup() });


  it("Connecting into a room", async function () {

    const room = await colyseus.createRoom<CauldronRoomState>("cauldron", {});

    const client1 = await colyseus.connectTo(room);

  }); 



});



