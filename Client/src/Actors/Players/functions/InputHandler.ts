import { Types } from 'phaser'
import PlayerMoveState from '~/State/PlayerMovementState';

const InputHandler = (c: Types.Input.Keyboard.CursorKeys, p: PlayerMoveState) => {

    if( c.left.isDown && c.up.isUp && c.down.isUp && c.right.isUp ) {

        p = PlayerMoveState.Left;
    }
    else if( c.right.isDown && c.up.isUp && c.down.isUp && c.left.isUp ) {

        p = PlayerMoveState.Right;
    }
    else if( c.up.isDown && c.left.isUp && c.right.isUp && c.down.isUp ) {

        p = PlayerMoveState.Up;
    }
    else if( c.down.isDown && c.left.isUp && c.right.isUp && c.up.isUp ) {

        p = PlayerMoveState.Down;
    }
    else if( c.down.isDown && c.left.isDown && c.right.isUp && c.up.isUp ) {

        p = PlayerMoveState.DownLeft;
    }
    else if (c.down.isDown && c.right.isDown && c.left.isUp && c.up.isUp ) {

        p = PlayerMoveState.DownRight;
    }
    else if ( c.up.isDown && c.right.isDown && c.left.isUp && c.down.isUp ) {

        p = PlayerMoveState.UpRight;
    }
    else if ( c.up.isDown && c.left.isDown && c.right.isUp && c.down.isUp ) {

        p = PlayerMoveState.UpLeft;
    }
    else if( c.up.isUp && c.down.isUp && c.right.isUp && c.left.isUp ) {

        p = PlayerMoveState.idle;
    }
};

export default InputHandler;
