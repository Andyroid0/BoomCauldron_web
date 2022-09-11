import { expect } from "chai";
import { describe, it, before } from "mocha";
// import Matter from 'matter-js';
// // Tile should have a custom image object that sets it to the background etc.


/**
 * @class
 * @property **[boolean]** obstruction - *usually a static collider*
 * @property **[string]** imgKey - *Key to access image from Phasers texture manager*
 * @property **[{ x: number, y: number }]** index - *usually a static collider*
 * @property **[number]** width - *pixel width of tile*
 * @property **[number]** height - *pixel height of tile*

 */
class Tile  {

    obstruction !: boolean;
    imgKey !: string;
    index !: { x: number, y: number };
    width !: number;
    height !: number;

    constructor( data: {

        obstruction : boolean,
        imgKey : string,
        index : { x: number, y: number },
        width : number,
        height : number,
    }) {

        this.obstruction = data.obstruction;
        this.imgKey = data.imgKey;
        this.index = data.index;
        this.width = data.width;
        this.height = data.height;       
    }
}

// class Rect extends Matter.Bounds {

//     body !: Matter.Body;
//     vertices !: Matter.Vertices;
//     tile !: Tile | null;

//     constructor( vertices: Array<{ x:number, y:number }> ) {

//         super();

//         this.body = Matter.Body.create({});

//         this.vertices = Matter.Vertices.create(vertices, new Matter.Body);

//         Rect.create(this.vertices);
//     }

//     // TODO: Areas should be 12 tiles wide and 12 tiles tall so that entrances / exits and colliders can line the area.
// }


// const testVerts = [
//     { x: 100, y: 100 }, 
//     { x: 200, y: 100 }, 
//     { x: 200, y: 200}, 
//     { x: 100, y: 200 }
// ];



describe('Grid Generator Tests', function () {

    it('Should add Arrays', function () {

        let global: Array<Array<any>> = new Array<Array<any>>();

        for ( let i = 0; i < 10; i++ ) {

            let array: Array<any> = new Array<any>();
            
            for ( let t = 0; t < 10; t++ ) {
                array.push(t);
            }

            global.push(array);
        }

        expect(global.length).to.equal(10);
    })


    it('Generate Tiles into Array', function () {

        let global: Array<Array<Tile>> = new Array<Array<Tile>>();

        for ( let i = 0; i < 10; i++ ) {

            let array: Array<any> = new Array<any>();
            
            for ( let t = 0; t < 10; t++ ) {
                array.push(t);
            }

            global.push(array);
        }

        expect(global.length).to.equal(10);        
    });

    it('does shit', function () {

        const grid : Array<Array<Tile|null>> = new Array<Array<Tile|null>>();

        type column = Array<Tile|null>

        // const Column : column = Array.from(Array(300))
        //     .forEach( rect => { 
        //         new Tile(false, '', {x: rect.}) 
        //     });


    })
});

