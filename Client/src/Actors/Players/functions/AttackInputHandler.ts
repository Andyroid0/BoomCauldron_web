import PlayerAttackState from '../../../State/PlayerAttackState';

/**
 * sets enity Attack State
 * @param upKey boolean : up key is pressed
 * @param downKey boolean : down key is pressed
 * @param leftKey boolean : left key is pressed
 * @param rightKey boolean : right key is pressed

 * @returns PlayerAttackState
 */
const AttackInputHandler = (

        upKey: boolean,
        downKey: boolean,
        leftKey: boolean,
        rightKey: boolean,
                         ) : PlayerAttackState => {
    
        if( leftKey && !upKey && !downKey && !rightKey ) {
    
            return PlayerAttackState.Left;
        }
        else if( rightKey && !upKey && !downKey && !leftKey ) {
    
            return PlayerAttackState.Right;
        }
        else if( upKey && !leftKey && !rightKey && !downKey ) {
    
            return PlayerAttackState.Up;
        }
        else if( downKey && !leftKey && !rightKey && !upKey ) {
    
            return PlayerAttackState.Down;
        }
        else if( downKey && leftKey && !rightKey && !upKey ) {
    
            return PlayerAttackState.DownLeft;
        }
        else if ( downKey && rightKey && !leftKey && !upKey ) {
    
            return PlayerAttackState.DownRight;
        }
        else if ( upKey && rightKey && !leftKey && !downKey ) {
    
            return PlayerAttackState.UpRight;
        }
        else if ( upKey && leftKey && !rightKey && !downKey ) {
    
            return PlayerAttackState.UpLeft;
        }
        else if( !upKey && !downKey && !rightKey && !leftKey ) {
     
            return PlayerAttackState.idle;
        }
        else {
            return PlayerAttackState.idle;
        }
};

export default AttackInputHandler;