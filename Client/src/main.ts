

const root : HTMLElement | null = document.getElementById('root');
const canvasCol : HTMLCollectionOf<HTMLCanvasElement> | null = document.getElementsByTagName('canvas');
const canvas : HTMLCanvasElement | null = canvasCol[0];

window.addEventListener('resize', event => {
	console.log(window.innerWidth)
})



export const popFrank = () => {

	const test = document.createElement('p')
	test.innerText = "frank"
	test.setAttribute('class', 'text-xl font-serif')
	root?.append(test)
}





