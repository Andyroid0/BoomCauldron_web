import PlayerMoveState from '../../../State/PlayerMovementState';


/**
 * Accepts isDown booleans for 4 directional key or key combinations
 * @param upKey boolean : up key is down
 * @param downKey boolean : down key is down
 * @param leftKey boolean : left key is down
 * @param rightKey boolean : right key is down
 * @returns  PlayerMoveState
 */
const InputHandler = (
    upKey: boolean,
    downKey: boolean,
    leftKey: boolean,
    rightKey: boolean,
                     ) : PlayerMoveState => {

    if( leftKey && !upKey && !downKey && !rightKey ) {

        return PlayerMoveState.Left;
    }
    else if( rightKey && !upKey && !downKey && !leftKey ) {

        return PlayerMoveState.Right;
    }
    else if( upKey && !leftKey && !rightKey && !downKey ) {

        return PlayerMoveState.Up;
    }
    else if( downKey && !leftKey && !rightKey && !upKey ) {

        return PlayerMoveState.Down;
    }
    else if( downKey && leftKey && !rightKey && !upKey ) {

        return PlayerMoveState.DownLeft;
    }
    else if ( downKey && rightKey && !leftKey && !upKey ) {

        return PlayerMoveState.DownRight;
    }
    else if ( upKey && rightKey && !leftKey && !downKey ) {

        return PlayerMoveState.UpRight;
    }
    else if ( upKey && leftKey && !rightKey && !downKey ) {

        return PlayerMoveState.UpLeft;
    }
    else if( !upKey && !downKey && !rightKey && !leftKey ) {
 
        return PlayerMoveState.idle;
    }
    else {
        return PlayerMoveState.idle;
    }
};

export default InputHandler;
