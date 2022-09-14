
/** Flips the sprite on it's X access dependent on which direction it's moving.
 * @function
 * @param {{x: number, y: number}} [v] velocity
 */
const FlipHandler = ( v: { x: number, y: number }, flip: boolean ) : boolean => {

    if ( v.x < 0 ) {

        return true;
    }
    else if ( v.x > 0 ) {

        return false;
    }
    else {
        return flip;
    } 
};

export default FlipHandler;