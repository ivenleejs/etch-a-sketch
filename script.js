// Variables for grid generation
const DEFAULTGRIDNO = 16;
const GRIDLIMIT = 100;
const DRAWINGWIDTH = 500;
let gridNo = DEFAULTGRIDNO;

const gridContainer = document.createElement('div');
gridContainer.classList.add('container');
gridContainer.style.width = `${DRAWINGWIDTH}px`;

// Assigning existing HTML elements to variables
const grid = document.querySelector('#grid');
const skittlesButton = document.querySelector('#skittlesbutton');
const rainbowButton = document.querySelector('#rainbowbutton');
const sizeInput = document.querySelector('#sizeinput');
const applySizeButton = document.querySelector('#applybutton');
const gridSizeDisplay = document.querySelector('#currentsize');
const clearButton = document.querySelector('#clearbutton');

// Default variables
let border = false;
let selectedColor = 'black';
let rainbowToggle = false;
let skittlesToggle = false;

// Adding mousedown to draw
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

generateGrid(gridNo);
clearButton.addEventListener('click', clearBoard);
skittlesButton.addEventListener('click', skittlesMode);
rainbowButton.addEventListener('click', rainbowMode);
applySizeButton.addEventListener('click', setGridSize);

// Functions

function generateGrid(gridNo) {
    // Remove existing grid if it exists, as well as gridContainer's memory
    while(gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
        console.log('Grid removed');
   }

    // Generate the grid using global constants
    let totalBoxes = 0;
    for (j = 0; j < gridNo; j++) {
        for (i = 0; i < gridNo; i++) {
            const div = document.createElement('div');
            div.classList.add('grid-box');
            totalBoxes++;
            //div.innerText = totalBoxes;

            div.style.width = `${DRAWINGWIDTH / gridNo}px`
            div.style.height = `${DRAWINGWIDTH / gridNo}px`
            
            div.addEventListener('mouseenter', () => {
                if (mouseDown) {
                    if (rainbowToggle == true) {
                        selectedColor = rainbowGenerator();
                        div.classList.remove('rainbow-bg');
                        div.style.backgroundColor = selectedColor;
                    }
                    
                    else if (skittlesToggle == true) {
                        div.classList.add('rainbow-bg');
                    }
                    else {
                        div.classList.remove('rainbow-bg');
                        div.style.backgroundColor = selectedColor;
                    }
                }
            })
            div.addEventListener('click', () => {
                if (rainbowToggle == true) {
                    selectedColor = rainbowGenerator();
                    div.classList.remove('rainbow-bg');
                    div.style.backgroundColor = selectedColor;
                }
                
                else if (skittlesToggle == true) {
                    div.classList.add('rainbow-bg');
                }
                else {
                    div.classList.remove('rainbow-bg');
                    div.style.backgroundColor = selectedColor;
                }
            })
            gridContainer.appendChild(div);
        }
    }

    console.log(`A total of ${totalBoxes} boxes were created`)
    grid.appendChild(gridContainer);
}

function clearBoard() {
    const boxes = document.querySelectorAll('.grid-box');
    boxes.forEach( (boxes) => boxes.style.backgroundColor = 'white')
}

function setGridSize() {
    gridNo = sizeInput.value;
    if (gridNo > GRIDLIMIT) {
        gridNo = DEFAULTGRIDNO;
        alert('Grid size cannot be higher than 100!');
        return;
    }
    if (gridNo == null){
        return;
    }
    generateGrid(gridNo);
    gridSizeDisplay.innerText = `current grid size: ${gridNo} x ${gridNo}`;
}

function rainbowMode() {
    if (!rainbowToggle) {
        rainbowButton.classList.add('selected');
        skittlesButton.classList.remove('rainbow-bg');
        rainbowToggle = true;
        skittlesToggle = false;
    }
    else {
        rainbowButton.classList.remove('selected');
        rainbowToggle = false;
        selectedColor = 'black';
    }
}

function skittlesMode() {
    if (!skittlesToggle) {
        skittlesButton.classList.add('rainbow-bg');
        rainbowButton.classList.remove('selected');
        skittlesToggle = true;
        rainbowToggle = false;
    }
    else {
        skittlesButton.classList.remove('rainbow-bg');
        skittlesToggle = false;
        selectedColor = 'black';
    }
}

function rainbowGenerator() {
    let newColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    return newColor;
}