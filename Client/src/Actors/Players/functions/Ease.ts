//import { Math } from 'phaser';
import { lerp } from "../../../utils/MathHelpers";
/**
 * 
 * ================
 * 
 * @function X
 * @param {number} [x] player x position
 * @param {number} [sx] server player instance x position
 * @returns number
 * 
 * ================
 * 
 * @function Y
 * @param {number} [y] player y position
 * @param {number} [sy] server player instance y position
 * @returns number
 */
const Ease = {

    X: ( x: number, sx: number ) : number => {

        let Xdelta = Math.abs( x - sx );//Math.Difference( x, sx );

        if ( Xdelta > 5 ) {
    
            return lerp( x, sx, 0.05 );
        }
        else if ( Xdelta > 1 && Xdelta <= 5 ) {
    
            return lerp( x, sx, 0.1 );
        }
        else {
    
            return lerp( x, sx, 0.3 );
        }
    },

    Y: ( y: number, sy: number ): number => {

        let Ydelta = Math.abs( y - sy ); //Math.Difference( y, sy );

        if (   Ydelta > 5 ) {
    
            return lerp( y, sy, 0.05 );
        }
        else if ( Ydelta > 1 && Ydelta <=5 ) {
    
            return lerp( y, sy, 0.1 );
        }
        else {
    
            return lerp( y, sy, 0.3 );
        }
    }

}

export default Ease;