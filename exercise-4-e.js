


const submit$$ = document.querySelector('.submit')
const form$$ = document.querySelector('.form')
const target_x$$ = document.querySelector('.param_x')
const target_y$$ = document.querySelector('.param_y')
const table$$ = document.querySelector('[data-function="board"]')
let clicks = 0

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
        error$$.textContent = 'El valor que has introducido « ' + value_X + ' » no es un valor valido. Porfavor intentalo de nuevo con una cifra del 2 al 8.'
    }else if(value_y < 2 ||  isNaN(value_y) || value_y > 8){
        error$$.setAttribute('style',"display: block")
        console.log('error')
        if(isNaN(value_y) === true){
            value_y = target_y$$.value
        }
        error$$.textContent = 'El valor que has introducido « ' + value_y + ' » no es un valor valido. Porfavor intentalo de nuevo con una cifra del 2 al 8.'
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
    const treasure_x = Math.floor(Math.random() * (value_x - 2)) +1
    const treasure_y = Math.floor(Math.random() * (value_y - 2)) +1
    const treasure = treasure_x + '_' + treasure_y
    
//filas
    for (let i = 0 ; i < value_y+2 ; i++) {

        const y = i
        const tr$$ = document.createElement('tr')
        const tableContainer = document.querySelector('[data-function="board"]');
        tableContainer.appendChild(tr$$);
        const clasTr = 'row_' + i 
        tr$$.setAttribute('class', clasTr )


//fcolumnas
for (let i = 0 ; i < value_x+2 ; i++) {
    const x = i;

    // Crear celdas
    const td$$ = document.createElement('td');
    tr$$.appendChild(td$$);
    const position = x + '_' + y;
    const dataTd = position;
    const clasTd = '_' + position + ' cell';
    td$$.setAttribute('data-position', dataTd );
    td$$.setAttribute('class', clasTd );

    // Lógica para determinar el contenido de la celda
    if (y === 0) {
        if (x === 0) {
            td$$.innerHTML = `<img class='img_${position} img' src='4x/beach_TL.png'>`;
        } else if (x !== value_x+1) {
            td$$.innerHTML = `<img class='img_${position} img' src='4x/beach_T.png'>`;
        }else if (x == value_x+1) {
            td$$.innerHTML = `<img class='img_${position} img' src='4x/beach_TR.png'>`;
        }
    }else if (y !== value_y+1) {
        if (x === 0) {
            td$$.innerHTML = `<img class='img_${position} img' src='4x/beach_L.png'>`;
        } else if (x !== value_x+1) {
            td$$.innerHTML = `<img class='img_${position} img' src='${imgXUrl}'>`;
            td$$.addEventListener('click', function () { isIt(position, treasure)});
        }else if (x == value_x+1) {
            td$$.innerHTML = `<img class='img_${position} img' src='4x/beach_R.png'>`;
        }
    }
    else if (y === value_y+1) {
        if (x === 0) {
            td$$.innerHTML = `<img class='img_${position} img' src='4x/beach_BL.png'>`;
        } else if (x !== value_x+1) {
            td$$.innerHTML = `<img class='img_${position} img' src='4x/beach_B.png'>`;
        }else if (x == value_x+1) {
            td$$.innerHTML = `<img class='img_${position} img' src='4x/beach_BR.png'>`;
        }
    }else {
        td$$.innerHTML = `<img class='img_${position} img' src='${imgXUrl}'>`;
        td$$.addEventListener('click', function () { isIt(position, treasure)});
    }


    }
    }
}

const isIt = (position, tesoro) => {
    const clickedPos = '.img_' + position

    console.log(clickedPos)
    const imgClicked = document.querySelector(clickedPos);

    //console.log('click en celda ' + position + ' el tesoro está en ' + tesoro)

    click()

//comprueba si es
    if (position === tesoro) {
        console.log('Yes')
        imgClicked.setAttribute('src', ' ');
        imgClicked.classList.add('animation_ye');
        createFireworks();
        setTimeout(congrats, 2000);
    }else{
        console.log('No')
        imgClicked.setAttribute('src', ' ');
        imgClicked.classList.add('animation_no');


    }


}
const click = () => {
    clicks ++
    const contadorP = document.querySelector('[data-function="attempts"]')
    contadorP.textContent= clicks
}

const congrats = () => {
    const popup = document.createElement('div');
    popup.classList.add('congrats');

    const title = document.createElement('h2');
    title.textContent = '¡Congratulaciones!';

    const paragraph = document.createElement('p');
    paragraph.textContent = 'Has completado la tarea con exito.';

    const button = document.createElement('button');
    button.textContent = 'Volver a jugar';
    button.addEventListener('click', () => {
        location.reload();
    });

    popup.appendChild(title);
    popup.appendChild(paragraph);
    popup.appendChild(button);

    document.body.appendChild(popup);
};


submit$$.addEventListener('click', errorTest)
form$$.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Formulario enviado!');
});

function createFireworks() {
    // Agregar el contenedor de los fuegos artificiales al cuerpo del documento
    const fireworksContainer = document.createElement('div');
    fireworksContainer.id = 'fireworks-container';
    document.body.appendChild(fireworksContainer);
  
    // Estilos CSS para los fuegos artificiales
    const style = document.createElement('style');
    style.innerHTML = `
      #fireworks-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      }
      
      .firework {
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #ffcc00; /* Color de los fuegos artificiales */
        animation: explode 1s ease-out forwards;
      }
  
      @keyframes explode {
        0% {
          opacity: 1;
          transform: scale(1);
        }
        100% {
          opacity: 0;
          transform: scale(3);
        }
      }
    `;
    document.head.appendChild(style);
  
    // Función para crear fuegos artificiales
    function createFirework() {
      const firework = document.createElement('div');
      firework.classList.add('firework');
      firework.style.left = Math.random() * window.innerWidth + 'px';
      firework.style.top = Math.random() * window.innerHeight + 'px';
      fireworksContainer.appendChild(firework);
  
      // Eliminar el elemento después de que termine la animación
      setTimeout(() => {
        firework.remove();
      }, 1000);
    }
  
    // Generar fuegos artificiales cada cierto intervalo
    setInterval(createFirework, 500);
  }




