
export const start = ( root: HTMLElement, setSinglePlayer: () => void, setOnline: () => void ) => {

    const singlePlayer_btn = document.createElement('div');
    //root.setAttribute('class', 'bg-black opacity-40')

    singlePlayer_btn.setAttribute(
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

    const singlePlayerText = document.createElement('p');
    singlePlayerText.setAttribute(
        'class',
        `
                text-4xl
                font-black
                text-white
                text-center
        `
    );
    singlePlayerText.innerText = "Solo"
    singlePlayer_btn.append(singlePlayerText);




    const Online_btn = document.createElement('div');

    Online_btn.setAttribute(
        'class',
        `
            w-64
            h-16
            bg-black
            rounded-full
            mx-auto
            mt-8
            z-50
            border-4
            border-white
            border-solid
            pt-2
            pb-2
            hover:border-lime-300

        `
    )

    const onlineText = document.createElement('p');
    onlineText.setAttribute(
        'class',
        `
                text-4xl
                font-black
                text-white
                text-center
        `
    );
    onlineText.innerText = "Online"
    Online_btn.append(onlineText);


    const toggleButtons = () => {
        root.childNodes.forEach( node => {
            if ( node === singlePlayer_btn || node === Online_btn ) {
                root.removeChild(singlePlayer_btn); 
                root.removeChild(Online_btn); 
            }
            else {
                root.append(singlePlayer_btn, Online_btn);
            }
        })

    };

    Online_btn.addEventListener('click', () => { setOnline(); toggleButtons(); });
    singlePlayer_btn.addEventListener('click', () => { setSinglePlayer(); toggleButtons(); });

    root.append(singlePlayer_btn, Online_btn);
}
