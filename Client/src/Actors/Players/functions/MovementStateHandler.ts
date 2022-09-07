import PlayerMoveState from '../../../State/PlayerMovementState';

/**
 * sets enity velocity
 * @param p PlayerMoveState : the players move state
 * @param v **[X and Y coordinate object]** {x: number, y: number} : the players velocity
 * @param s number : the players speed
 * @returns **[Player Velocity]** -- *{x: number, y: number}*
 */
const MovementStateHandler = ( p: PlayerMoveState, v: { x: number, y: number }, s: number ) 
    : { x:number , y: number } => {

    switch ( p ) {

        case PlayerMoveState.idle:

            if( v.x != 0 && v.y != 0 ) {
                let x = v.x;
                let y = v.y;
                return { x: x/3, y: y/3 }
            }
            else return  { x: 0, y: 0 } ;

        case PlayerMoveState.Down:

            return { x: 0, y: s };

        case PlayerMoveState.DownLeft:

            return { x: -s, y: s };

        case PlayerMoveState.DownRight:

            return { x: s, y: s };

        case PlayerMoveState.Up:

            return { x: 0, y: -s };

        case PlayerMoveState.UpLeft:

            return { x: -s, y: -s };

        case PlayerMoveState.UpRight:

            return { x: s, y: -s };

        case PlayerMoveState.Left:

            return { x: -s, y: 0 };

        case PlayerMoveState.Right:

            return { x: s, y: 0 };
    }
};

export default MovementStateHandler;