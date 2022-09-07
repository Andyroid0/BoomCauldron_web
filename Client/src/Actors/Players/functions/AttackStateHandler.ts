import PlayerAttackState from '../../../State/PlayerAttackState';

/**
 * sets projectile start and velocity
 * @param pa PlayerAttackState : the players attack state
 * @param pp {x: number, y: number} : the players position
 * @param a number : the attack speed
 * @returns **[Projectile Data]** : { startPosition: { x: number, y: number }, velocity: { x: number, y: number } } | null
 */
const AttackStateHandler = ( pa: PlayerAttackState, pp: { x: number, y: number }, a: number ) 
    :{ 
        startPosition: { 
            x:number , 
            y: number 
        }, 
        velocity: { 
            x: number, 
            y: number
        } 

    } | null => {

    switch ( pa ) {

        case PlayerAttackState.idle:
            return null;

        case PlayerAttackState.Down:

            return { startPosition: { x: pp.x , y: pp.y + 25 }, velocity: { x: 0, y: a } };

        case PlayerAttackState.DownLeft:

            return { startPosition: { x: pp.x - 10 , y: pp.y + 25 }, velocity: { x: -a, y: a } };

        case PlayerAttackState.DownRight:

            return { startPosition: { x: pp.x + 10 , y: pp.y + 25 }, velocity: { x: a, y: a } };

        case PlayerAttackState.Up:

            return { startPosition: { x: pp.x , y: pp.y - 25 }, velocity: { x: 0, y: -a } };

        case PlayerAttackState.UpLeft:

            return { startPosition: { x: pp.x - 10 , y: pp.y - 25 }, velocity: { x: -a, y: -a } };

        case PlayerAttackState.UpRight:

            return { startPosition: { x: pp.x + 10 , y: pp.y - 25 }, velocity: { x: a, y: -a } };

        case PlayerAttackState.Left:

            return { startPosition: { x: pp.x - 25 , y: pp.y }, velocity: { x: -a, y: 0 } };

        case PlayerAttackState.Right:

            return { startPosition: { x: pp.x + 25 , y: pp.y }, velocity: { x: a, y: 0 } };
    }
};

export default AttackStateHandler;