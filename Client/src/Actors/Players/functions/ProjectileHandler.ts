import AttackInputHandler from "./AttackInputHandler";
import AttackStateHandler from "./AttackStateHandler";
import PlayerAttackState from "../../../State/PlayerAttackState";

/** Handles Projectile Creation
 * 
 * @param pa [PlayerAttackState] : 
 * @param 
 * @prop frank
 */
const ProjectileHandler = () : PlayerAttackState => {


    return AttackInputHandler( 
        Phaser.Input.Keyboard.JustDown(this.up), 
        Phaser.Input.Keyboard.JustDown(this.down), 
        Phaser.Input.Keyboard.JustDown(this.left), 
        Phaser.Input.Keyboard.JustDown(this.right),             
    );


const projectiledata = AttackStateHandler(
    this.playerAttackState, 
    {
        x: this.player.x, 
        y: this.player.y
    },
    10
);


    const is_down = (btn: Phaser.Input.Keyboard.Key) : boolean => {
        return Phaser.Input.Keyboard.JustDown(btn);
    };

    if( is_down( this.up ) ) {

        new BlueOrb(
            this.matter.world,
            this,
            this.player.body.position.x + 10,
            this.player.body.position.y + 10,
            new Phaser.Math.Vector2(0, -10),
            900
        );
    }
    else if( is_down( this.down ) ) {

        new BlueOrb(
            this.matter.world,
            this,
            this.player.body.position.x + 10,
            this.player.body.position.y + 10,
            new Phaser.Math.Vector2(0, 10),
            900
        );
    }
    else if( is_down( this.left ) ) {

        new BlueOrb(
            this.matter.world,
            this,
            this.player.body.position.x + 10,
            this.player.body.position.y + 10,
            new Phaser.Math.Vector2(-10, 0),
            900
        );
    }
    else if( is_down( this.right ) ) {

        new BlueOrb(
            this.matter.world,
            this,
            this.player.body.position.x + 10,
            this.player.body.position.y + 10,
            new Phaser.Math.Vector2(10, 0),
            900
        );
    }
}