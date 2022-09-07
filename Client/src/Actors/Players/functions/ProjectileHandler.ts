import PlayerAttackState from "../../../State/PlayerAttackState";

/** Fires if Player Attack State isn't Idle
 * 
 * @param pa **[PlayerAttackState]** : *attack state enum* 
 * 
 * @returns callback function
 */
const ProjectileHandler = ( pa : PlayerAttackState, callback: () => void ) => {

    if( pa != PlayerAttackState.idle ) {
        return callback();
    }
};

export default ProjectileHandler;