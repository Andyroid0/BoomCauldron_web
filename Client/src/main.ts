import ColyseusClient from "./Api/ColyseusClient";
import { start } from "./Screens/StartScreen";


export const root : HTMLElement | null = document.getElementById('root');
root?.setAttribute('class', 'w-screen h-screen absolute left-0 top-0')
const canvasCol : HTMLCollectionOf<HTMLCanvasElement> | null = document.getElementsByTagName('canvas');
const canvas : HTMLCanvasElement | null = canvasCol[0];


export const colyseusClient = new ColyseusClient();


window.addEventListener('resize', event => {
	console.log(window.innerWidth)
})

window.addEventListener('beforeunload', event => {
	console.log("going to reload");
	colyseusClient.room?.leave();
});

export const popFrank = () => {

	const test = document.createElement('p')
	test.innerText = "frank"
	test.setAttribute('class', 'text-xl font-serif')
	root?.append(test)
};

const setUp = () => {

	const body = document.getElementsByTagName('body');
	body[0].setAttribute('class', 'bg-slate-900');
};


const PauseScreen = () => {

	const overLay = document.createElement('div');
	overLay.setAttribute(
		'class', 
		`
			z-20 
			bg-rose-400 
			absolute 
			top-0 
			left-0 
			flex-auto 
			w-screen 
			h-screen 
			opacity-20
		`
	);
	const gridContainer = document.createElement('div');
	gridContainer.setAttribute('class', 
		`
			min-h-full
			min-w-full
			max-h-screen
			absolute
			left-0
			top-0
			z-30
			transition-opacity
			p-20
		`
	)

	const grid = document.createElement('div');
	grid.setAttribute(
		'class',
		`
			grid
			grid-rows-3
			grid-flow-col
			gap-4
			h-screen
			h-max-5/6
			w-auto
			mx-auto
			my-auto
		`
	);
	const one = document.createElement('div');
	const two = document.createElement('div');
	const three = document.createElement('div');

	gridContainer.append(grid);

	one.setAttribute('class', ' h-4/6 row-span-3 bg-orange-100 rounded opacity-80');
	two.setAttribute('class', ' h-5/8 col-span-2 bg-orange-100 rounded opacity-80');
	three.setAttribute('class', ' h-1/2 row-span-2 col-span-2 bg-orange-100 rounded opacity-80');


	grid.append(one, two, three);


	const panel = document.createElement('div');
	panel.setAttribute(
		'class',
		`
			z-30
			absolute
			w-1/2
			h-1/2
			bg-orange-100
			rounded
			opacity-60
			shadow-xl
			self-center
			
		`
	)

	root?.append(overLay, gridContainer)
	canvas.setAttribute('class', 'blur-sm')
}



setUp()





