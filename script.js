const colorButton = document.querySelector('#button-random-color');
const colors = document.getElementsByClassName('color');
const blackElement = document.querySelector('#black');
const redElement = document.getElementById('red');
const greenElement = document.getElementById('green');
const blueElement = document.getElementById('blue');
const otherColors = document.getElementsByClassName('other-colors');
const vqvButton = document.getElementById('generate-board');

function baseColors() {
  redElement.style.backgroundColor = 'red';
  greenElement.style.backgroundColor = 'green';
  blueElement.style.backgroundColor = 'blue';
}

baseColors();

function getRandomColor() {
  const characters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += characters[Math.floor(Math.random() * 16)];
  }

  return color;
}

function setRandomColor() {
  const colorSelection2 = getRandomColor();
  const colorSelection3 = getRandomColor();
  const colorSelection4 = getRandomColor();
  if (colorSelection2 != colorSelection3 && colorSelection2 != colorSelection4 && colorSelection3 != colorSelection4) {
    const objColors = {
      c2: redElement.style.backgroundColor = colorSelection2,
      c3: greenElement.style.backgroundColor = colorSelection3,
      c4: blueElement.style.backgroundColor = colorSelection4,
    };
    localStorage.setItem('colorPalette', JSON.stringify(objColors));
  }
}

getRandomColor();

colorButton.addEventListener('click', setRandomColor);

function keepLastColor() {
  if (localStorage.colorPalette) {
    const convertString = JSON.parse(localStorage.getItem('colorPalette'));
    redElement.style.backgroundColor = convertString.c2;
    greenElement.style.backgroundColor = convertString.c3;
    blueElement.style.backgroundColor = convertString.c4;
  }
}

keepLastColor();

function selectColor() {
  redElement.addEventListener('click', () => {
    if (JSON.stringify(blackElement.classList).includes('selected') && JSON.stringify(greenElement.classList).includes('selected') || JSON.stringify(blueElement.classList).includes('selected')) {
      colors.classList.remove('selected');
      redElement.classList.add('selected');
    } else {
      blackElement.classList.remove('selected');
      greenElement.classList.remove('selected');
      blueElement.classList.remove('selected');
      redElement.classList.add('selected');
    }
  });

  greenElement.addEventListener('click', () => {
    if (JSON.stringify(blackElement.classList).includes('selected') && JSON.stringify(redElement.classList).includes('selected') && JSON.stringify(blueElement.classList).includes('selected')) {
      colors.classList.remove('selected');
      greenElement.classList.add('selected');
    } else {
      blackElement.classList.remove('selected');
      redElement.classList.remove('selected');
      blueElement.classList.remove('selected');
      greenElement.classList.add('selected');
    }
  });

  blueElement.addEventListener('click', () => {
    if (JSON.stringify(blackElement.classList).includes('selected') && JSON.stringify(redElement.classList).includes('selected') && JSON.stringify(greenElement.classList).includes('selected')) {
      colors.classList.remove('selected');
      blueElement.classList.add('selected');
    } else {
      blackElement.classList.remove('selected');
      redElement.classList.remove('selected');
      greenElement.classList.remove('selected');
      blueElement.classList.add('selected');
    }
  });

  blackElement.addEventListener('click', () => {
    if (JSON.stringify(redElement.classList).includes('selected') || JSON.stringify(greenElement.classList).includes('selected') || JSON.stringify(blueElement.classList).includes('selected')) {
      redElement.classList.remove('selected');
      greenElement.classList.remove('selected');
      blueElement.classList.remove('selected');
      blackElement.classList.add('selected');
    }
  });
}

selectColor();

function paintPixel() {
  const selectedColor = document.getElementsByClassName('selected');
  const pixelSquares = document.getElementsByClassName('pixel');
  for (let i = 0; i < pixelSquares.length; i += 1) {
    pixelSquares[i].addEventListener('click', (e) => {
      if (JSON.stringify(blackElement.classList).includes('selected')) {
        e.target.style.backgroundColor = 'black';
      } else {
        e.target.style.backgroundColor = selectedColor[0].style.backgroundColor;
      }

      const allPixelColors = [];
      for (let index = 0; index < pixelSquares.length; index += 1) {
        allPixelColors.push(pixelSquares[index].style.backgroundColor);

        localStorage.setItem('pixelBoard', JSON.stringify(allPixelColors));
      }
    });
  }
}

function createBoard() {
  const currentBoard = JSON.parse(localStorage.getItem('boardSize'));
  const board = document.getElementById('pixel-board');
  let boardPixels = 0;
  if (!currentBoard || currentBoard === null) {
    boardPixels = 25;
  } else {
    boardPixels = currentBoard * currentBoard;
  }
  for (index = 0; index < boardPixels; index += 1) {
    const myPixels = document.createElement('div');
    board.appendChild(myPixels);
    myPixels.classList.add('pixel');
  }
  paintPixel();
}

createBoard();

function keepPaintedPixels() {
  const pixelSquares = document.getElementsByClassName('pixel');
  if (localStorage.pixelBoard) {
    const convertedColors = JSON.parse(localStorage.getItem('pixelBoard'));
    for (let index = 0; index < pixelSquares.length; index += 1) {
      pixelSquares[index].style.backgroundColor = convertedColors[index];
    }
  }
}

keepPaintedPixels();

function clearBoard() {
  const clearButton = document.getElementById('clear-board');
  clearButton.addEventListener('click', () => {
    const pixelSquares = document.getElementsByClassName('pixel');
    for (index = 0; index < pixelSquares.length; index += 1) {
      pixelSquares[index].style.backgroundColor = 'white';
    }
  });
}
clearBoard();

function keepBoardSize() {
  const newInputValue = JSON.parse(localStorage.getItem('boardSize'));
  const boardSizeInput = document.getElementById('board-size');
  boardSizeInput.value = newInputValue;
  const finalBoardSize = boardSizeInput.value * boardSizeInput.value;

  if (finalBoardSize) {
    createBoard(finalBoardSize);
  }
}

function changeBoardSize() {
    const boardSize = document.getElementById('pixel-board');
    const boardSizeInput = document.getElementById('board-size');
    boardSize.innerHTML = '';

    localStorage.setItem('boardSize', JSON.stringify(boardSizeInput.value));
    createBoard();
}

vqvButton.addEventListener('click', changeBoardSize);
