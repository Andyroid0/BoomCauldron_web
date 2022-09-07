import { expect } from "chai";
import { describe, it, before } from "mocha";
import {Vector} from "matter-js";

import InputHandler from '../src/Actors/Players/functions/InputHandler'
import MovementStateHandler from "../src/Actors/Players/functions/MovementStateHandler";
import PlayerMoveState from '../src/State/PlayerMovementState';

import PlayerAttackState from "../src/State/PlayerAttackState";
import AttackStateHandler from '../src/Actors/Players/functions/AttackStateHandler';
import AttackInputHandler from '../src/Actors/Players/functions/AttackInputHandler';
import ProjectileHandler from '../src/Actors/Players/functions/ProjectileHandler';


describe('Player tests', function () {

    describe('Move State Tests', function () {

        it('Up Key Should return Up State', function () {
            let moveState: PlayerMoveState = PlayerMoveState.Down;
            moveState = InputHandler(true, false, false, false);
    
            expect(moveState).to.equal(PlayerMoveState.Up);
        });

        it('Down Key Should return Down State', function () {

            let moveState: PlayerMoveState = PlayerMoveState.Up;
            moveState = InputHandler(false, true, false, false);
    
            expect(moveState).to.equal(PlayerMoveState.Down);
        });

        it('Left Key Should return Left State', function () {

            let moveState: PlayerMoveState = PlayerMoveState.Right;
            moveState = InputHandler(false, false, true, false);
    
            expect(moveState).to.equal(PlayerMoveState.Left);
        });

        it('Right Key Should return Right State', function () {

            let moveState: PlayerMoveState = PlayerMoveState.Left;
            moveState = InputHandler(false, false, false, true);
    
            expect(moveState).to.equal(PlayerMoveState.Right);
        });
        
        it('Right Key and Up Key Should return Up-Right State', function () {

            let moveState: PlayerMoveState = PlayerMoveState.Left;
            moveState = InputHandler(true, false, false, true);
    
            expect(moveState).to.equal(PlayerMoveState.UpRight);
        });   
        
        it('Left Key and Up Key Should return Up-Left State', function () {

            let moveState: PlayerMoveState = PlayerMoveState.Left;
            moveState = InputHandler(true, false, true, false);
    
            expect(moveState).to.equal(PlayerMoveState.UpLeft);
        });     
        
        it('Left Key and Down Key Should return Down-Left State', function () {

            let moveState: PlayerMoveState = PlayerMoveState.Left;
            moveState = InputHandler(false, true, true, false);
    
            expect(moveState).to.equal(PlayerMoveState.DownLeft);
        });  

        it('Right Key and Down Key Should return Down-Right State', function () {

            let moveState: PlayerMoveState = PlayerMoveState.Left;
            moveState = InputHandler(false, true, false, true);
    
            expect(moveState).to.equal(PlayerMoveState.DownRight);
        });  
    });


    describe('Velocity Tests', function () {


        it('Down Should return x as 0 and y as playerSpeed', function () {

            let moveState: PlayerMoveState = PlayerMoveState.Down;
            let playerVelocity = { x: 0, y: 0 };
            let playerSpeed = 3;
    
            let result = MovementStateHandler( moveState, playerVelocity, playerSpeed );
    
            expect(result.y).to.equal(playerSpeed);
            expect(result.x).to.equal(0);
        });

        it('Up Should return x as 0 and y as -playerSpeed', function () {

            let moveState: PlayerMoveState = PlayerMoveState.Up;
            let playerVelocity = { x: 0, y: 0 };
            let playerSpeed = 3;
    
            let result = MovementStateHandler( moveState, playerVelocity, playerSpeed );
    
            expect(result.y).to.equal(-playerSpeed);
            expect(result.x).to.equal(0);
        });

        it('Left Should return x as playerSpeed and y as 0', function () {

            let moveState: PlayerMoveState = PlayerMoveState.Right;
            let playerVelocity = { x: 0, y: 0 };
            let playerSpeed = 3;
    
            let result = MovementStateHandler( moveState, playerVelocity, playerSpeed );
    
            expect(result.y).to.equal(0);
            expect(result.x).to.equal(playerSpeed);
        });        

        it('Right Should return x as -playerSpeed and y as 0', function () {

            let moveState: PlayerMoveState = PlayerMoveState.Left;
            let playerVelocity = { x: 0, y: 0 };
            let playerSpeed = 3;
    
            let result = MovementStateHandler( moveState, playerVelocity, playerSpeed );
    
            expect(result.y).to.equal(0);
            expect(result.x).to.equal(-playerSpeed);
        });     

        it('Down-Right Should return x as playerSpeed and y as playerSpeed', function () {

            let moveState: PlayerMoveState = PlayerMoveState.DownRight;
            let playerVelocity = { x: 0, y: 0 };
            let playerSpeed = 3;
    
            let result = MovementStateHandler( moveState, playerVelocity, playerSpeed );
    
            expect(result.y).to.equal(playerSpeed);
            expect(result.x).to.equal(playerSpeed);
        });
        
        it('Down-Left Should return x as -playerSpeed and y as playerSpeed', function () {

            let moveState: PlayerMoveState = PlayerMoveState.DownLeft;
            let playerVelocity = { x: 0, y: 0 };
            let playerSpeed = 3;
    
            let result = MovementStateHandler( moveState, playerVelocity, playerSpeed );
    
            expect(result.y).to.equal(playerSpeed);
            expect(result.x).to.equal(-playerSpeed);
        });    
        
        it('Up-Right Should return x as playerSpeed and y as -playerSpeed', function () {

            let moveState: PlayerMoveState = PlayerMoveState.UpRight;
            let playerVelocity = { x: 0, y: 0 };
            let playerSpeed = 3;
    
            let result = MovementStateHandler( moveState, playerVelocity, playerSpeed );
    
            expect(result.y).to.equal(-playerSpeed);
            expect(result.x).to.equal(playerSpeed);
        });  
        
        it('Up-Left Should return x as -playerSpeed and y as -playerSpeed', function () {

            let moveState: PlayerMoveState = PlayerMoveState.UpLeft;
            let playerVelocity = { x: 0, y: 0 };
            let playerSpeed = 3;
    
            let result = MovementStateHandler( moveState, playerVelocity, playerSpeed );
    
            expect(result.y).to.equal(-playerSpeed);
            expect(result.x).to.equal(-playerSpeed);
        });   
        
        it('Idle Should return x as 0 and y as 0', function () {

            let moveState: PlayerMoveState = PlayerMoveState.idle;
            let playerVelocity = { x: 0, y: 0 };
            let playerSpeed = 3;
    
            let result = MovementStateHandler( moveState, playerVelocity, playerSpeed );
    
            expect(result.y).to.equal(0);
            expect(result.x).to.equal(0);
        });         

    });

    describe('Attack Input Tests', function () {

        it('Up key should return Up', function () {

            let result = AttackInputHandler( true, false, false, false );

            expect(result).to.equal(PlayerAttackState.Up);
        });

        it('Down key should return Down', function () {

            let result = AttackInputHandler( false, true, false, false );

            expect(result).to.equal(PlayerAttackState.Down);
        });

        it('Left key should return Left', function () {

            let result = AttackInputHandler( false, false, true, false );

            expect(result).to.equal(PlayerAttackState.Left);
        });        
        
        it('Right key should return Right', function () {

            let result = AttackInputHandler( false, false, false, true );

            expect(result).to.equal(PlayerAttackState.Right);
        }); 
        
        it('No keys down should return idle', function () {

            let result = AttackInputHandler( false, false, false, false );

            expect(result).to.equal(PlayerAttackState.idle);
        });    

        it('Down and Left keys down should return Down-left', function () {

            let result = AttackInputHandler( false, true, true, false );

            expect(result).to.equal(PlayerAttackState.DownLeft);
        });  
        
        it('Down and Right keys down should return Down-right', function () {

            let result = AttackInputHandler( false, true, false, true );

            expect(result).to.equal(PlayerAttackState.DownRight);
        });   
        
        it('Up and Left keys down should return Up-left', function () {

            let result = AttackInputHandler( true, false, true, false );

            expect(result).to.equal(PlayerAttackState.UpLeft);
        });  
        
        it('Up and Right keys down should return Up-right', function () {

            let result = AttackInputHandler( true, false, false, true );

            expect(result).to.equal(PlayerAttackState.UpRight);
        });          
    });

    describe('Attack State Handling Tests', function () {

        it('Idle should return null', function () {

            let attackState: PlayerAttackState = PlayerAttackState.idle;
            let playerPosition = { x: 100, y: 100 }
            let attackSpeed = 10;

            let result = AttackStateHandler( attackState, playerPosition, attackSpeed );

            expect(result).to.equal(null);
            // expect( result?.startPosition.x ).to.equal( playerPosition.x );
            // expect( result?.startPosition.y ).to.equal( playerPosition.y );
            // expect( result?.velocity.x ).to.equal( 0 );
            // expect( result?.velocity.y ).to.equal( 0 );

        });

        it('Down ', function () {

            let attackState: PlayerAttackState = PlayerAttackState.Down;
            let playerPosition = { x: 100, y: 100 }
            let attackSpeed = 10;
            let offset = 25;
            let diag_offset = 10;

            let result = AttackStateHandler( attackState, playerPosition, attackSpeed );

            expect( result?.startPosition.x ).to.equal( playerPosition.x );
            expect( result?.startPosition.y ).to.equal( playerPosition.y + offset );
            expect( result?.velocity.x ).to.equal( 0 );
            expect( result?.velocity.y ).to.equal( attackSpeed );

        });        

        it('DownLeft ', function () {

            let attackState: PlayerAttackState = PlayerAttackState.DownLeft;
            let playerPosition = { x: 100, y: 100 }
            let attackSpeed = 10;
            let offset = 25;
            let diag_offset = 10;

            let result = AttackStateHandler( attackState, playerPosition, attackSpeed );

            expect( result?.startPosition.x ).to.equal( playerPosition.x - diag_offset );
            expect( result?.startPosition.y ).to.equal( playerPosition.y + offset );
            expect( result?.velocity.x ).to.equal( -attackSpeed );
            expect( result?.velocity.y ).to.equal( attackSpeed );

        });  
        
        it('DownRight ', function () {

            let attackState: PlayerAttackState = PlayerAttackState.DownRight;
            let playerPosition = { x: 100, y: 100 }
            let attackSpeed = 10;
            let offset = 25;
            let diag_offset = 10;

            let result = AttackStateHandler( attackState, playerPosition, attackSpeed );

            expect( result?.startPosition.x ).to.equal( playerPosition.x + diag_offset );
            expect( result?.startPosition.y ).to.equal( playerPosition.y + offset );
            expect( result?.velocity.x ).to.equal( attackSpeed );
            expect( result?.velocity.y ).to.equal( attackSpeed );

        });  

        it('Up ', function () {

            let attackState: PlayerAttackState = PlayerAttackState.Up;
            let playerPosition = { x: 100, y: 100 }
            let attackSpeed = 10;
            let offset = 25;
            let diag_offset = 10;

            let result = AttackStateHandler( attackState, playerPosition, attackSpeed );

            expect( result?.startPosition.x ).to.equal( playerPosition.x );
            expect( result?.startPosition.y ).to.equal( playerPosition.y - offset );
            expect( result?.velocity.x ).to.equal( 0 );
            expect( result?.velocity.y ).to.equal( -attackSpeed );

        });  

        it('UpLeft ', function () {

            let attackState: PlayerAttackState = PlayerAttackState.UpLeft;
            let playerPosition = { x: 100, y: 100 }
            let attackSpeed = 10;
            let offset = 25;
            let diag_offset = 10;

            let result = AttackStateHandler( attackState, playerPosition, attackSpeed );

            expect( result?.startPosition.x ).to.equal( playerPosition.x - diag_offset );
            expect( result?.startPosition.y ).to.equal( playerPosition.y - offset );
            expect( result?.velocity.x ).to.equal( -attackSpeed );
            expect( result?.velocity.y ).to.equal( -attackSpeed );

        });  
        
        it('UpRight ', function () {

            let attackState: PlayerAttackState = PlayerAttackState.UpRight;
            let playerPosition = { x: 100, y: 100 }
            let attackSpeed = 10;
            let offset = 25;
            let diag_offset = 10;

            let result = AttackStateHandler( attackState, playerPosition, attackSpeed );

            expect( result?.startPosition.x ).to.equal( playerPosition.x  + diag_offset);
            expect( result?.startPosition.y ).to.equal( playerPosition.y - offset );
            expect( result?.velocity.x ).to.equal( attackSpeed );
            expect( result?.velocity.y ).to.equal( -attackSpeed );

        });  
        
        it('Left ', function () {

            let attackState: PlayerAttackState = PlayerAttackState.Left;
            let playerPosition = { x: 100, y: 100 }
            let attackSpeed = 10;
            let offset = 25;
            let diag_offset = 10;

            let result = AttackStateHandler( attackState, playerPosition, attackSpeed );

            expect( result?.startPosition.x ).to.equal( playerPosition.x - offset);
            expect( result?.startPosition.y ).to.equal( playerPosition.y );
            expect( result?.velocity.x ).to.equal( -attackSpeed );
            expect( result?.velocity.y ).to.equal( 0 );

        });  

        it('Right ', function () {

            let attackState: PlayerAttackState = PlayerAttackState.Right;
            let playerPosition = { x: 100, y: 100 }
            let attackSpeed = 10;
            let offset = 25;
            let diag_offset = 10;

            let result = AttackStateHandler( attackState, playerPosition, attackSpeed );

            expect( result?.startPosition.x ).to.equal( playerPosition.x + offset);
            expect( result?.startPosition.y ).to.equal( playerPosition.y );
            expect( result?.velocity.x ).to.equal( attackSpeed );
            expect( result?.velocity.y ).to.equal( 0 );

        });  

    });

    describe('Projectile Handler Tests', function () {

        it('Should fire the callback function', function () {

            let state = PlayerAttackState.Down;
            let result = ProjectileHandler(state, () => {
                return "success";
            });

            expect(result).to.equal("success");
        });
    });

});