export const singlePlayer_start_btn = ( 
    root: HTMLElement, 
    setStart: () => void, 
 ) => {


        const start_btn = document.createElement('div');
        //root.setAttribute('class', 'bg-black opacity-40')
    
        start_btn.setAttribute(
            'class',
            `
                w-64
                h-16
                bg-black
                rounded-full
                mx-auto
                mt-96
                z-50
                border-4
                border-white
                border-solid
                pt-2
                pb-2
                hover:border-lime-300
    
            `
        )

        const startText = document.createElement('p');
        startText.setAttribute(
            'class',
            `
                    text-4xl
                    font-black
                    text-white
                    text-center
            `
        );
        startText.innerText = "Start"
        start_btn.append(startText);
        start_btn.addEventListener('click', () => { setStart(); toggleButtons(); });


        const toggleButtons = () => {
            root.childNodes.forEach( node => {
                if ( node === start_btn ) {
                    root.removeChild(start_btn); 
                }
                else {
                    root.append(start_btn);
                }
            })
    
        };
        
        root.append(start_btn);

}