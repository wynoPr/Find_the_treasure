


const submit$$ = document.querySelector('.submit')
const form$$ = document.querySelector('.form')
const target_x$$ = document.querySelector('.param_x')
const target_y$$ = document.querySelector('.param_y')
const table$$ = document.querySelector('[data-function="board"]')

const errorTest = () => {
    let value_X = parseInt(target_x$$.value)
    let value_y = parseInt(target_y$$.value)
    const error$$ = document.querySelector('.error')
    
    console.log(value_X)
    console.log(value_y)

    if (value_X < 1 || isNaN(value_X) || value_X > 8) {
        error$$.setAttribute('style',"display: block")
        console.log('error')
        if(isNaN(value_X) === true){
            value_X = target_x$$.value
        }
        error$$.textContent = 'El valor que has introducido « ' + value_X + ' » no es un valor valido. Porfavor intentalo de nuevo con una cifra del 1 al 8.'
    }else if(value_y < 1 ||  isNaN(value_y) || value_y > 8){
        error$$.setAttribute('style',"display: block")
        console.log('error')
        if(isNaN(value_y) === true){
            value_y = target_y$$.value
        }
        error$$.textContent = 'El valor que has introducido « ' + value_y + ' » no es un valor valido. Porfavor intentalo de nuevo con una cifra del 1 al 8.'
    }
    else{
        error$$.setAttribute('style',"display: none")
        form$$.setAttribute('style',"display: none")
        createTable()
    }
}

const createTable = () => {
    let value_x = parseInt(target_x$$.value)
    let value_y = parseInt(target_y$$.value)
    const imgXUrl = '4x/beach.png'
    
//tesoro
    const treasure_x = Math.floor(Math.random() * (value_x - 1))
    const treasure_y = Math.floor(Math.random() * (value_y - 1))
    const treasure = treasure_x + '_' + treasure_y
    
//filas
    for (let i = 0 ; i < value_y ; i++) {

        const x = i
        const tr$$ = document.createElement('tr')
        document.body.appendChild(tr$$)
        const clasTr = 'row_' + i 
        tr$$.setAttribute('class', clasTr )


//fcolumnas
        for (let i = 0 ; i < value_x ; i++) {

            const td$$ = document.createElement('td')
            document.body.appendChild(td$$)
            const position = x + '_' + i
            const dataTd = position 
            const clasTd = '_' + position +' cell' 
            td$$.setAttribute('data-position', dataTd )
            td$$.setAttribute('class', clasTd )
            td$$.innerHTML = `<img class='img_${position} img' src='${imgXUrl}'>`
            
            td$$.addEventListener('click', function () {
                isIt(position, treasure)
            })
            
        }
    }
}

const isIt = (position, tesoro) => {
    const chest = '../public/exercise-4/chest.png'
    const skull = '../public/exercise-4/skull.png'
    const clickedPos = '.img_' + position

    console.log(clickedPos)
    const imgClicked = document.querySelector(clickedPos);

    console.log('click en celda ' + position + ' el tesoro está en ' + tesoro)

//comprueba si es
    if (position === tesoro) {
        console.log('Yes')
        imgClicked.setAttribute('src', chest);
    }else{
        console.log('No')
        imgClicked.setAttribute('src', skull);
    }


}

submit$$.addEventListener('click', errorTest)
form$$.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Formulario enviado!');
});




