const stepCounter = document.getElementById("stepCounter");
stepCounter.disabled = true;

let counter = 0;

const canvas = document.getElementById("canv");
const ctx = canvas.getContext("2d");

const frames = 60;

//util functions
function drawCell(x, y, w, h, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, w, h);
}

//init
const size = 108;
let stateArray;

let antX, antY, antDirectionX, antDirectionY;

function initialize() {
	drawCell(0, 0, canvas.width, canvas.height, "#37474F");

	stateArray = new Array(size).fill(0);

	for (let i = 0; i < stateArray.length; i++) {
	  stateArray[i] = new Array(size).fill(0);
	}

	//ant's initial position and rotation (direction)
	antX = 54;
	antY = 54;

	antDirectionX = 0;
	antDirectionY = -1;
}

initialize();

//main
function step() {
	if (antX > 107) {
		stopSpeedUp();
		return;
	}

	counter++;
	stepCounter.value = counter;

	//change the direction
	
	if (stateArray[antX][antY] == 0) { // if the ant is standing on a black cell (turn counterclockwise)
		
		if (antDirectionX == 0 && antDirectionY == -1) { antDirectionX = -1; antDirectionY = 0; }
		else if (antDirectionX == 0 && antDirectionY == 1) { antDirectionX = 1; antDirectionY = 0; }
		else if (antDirectionX == -1 && antDirectionY == 0) { antDirectionX = 0; antDirectionY = 1; }
		else if (antDirectionX == 1 && antDirectionY == 0) { antDirectionX = 0; antDirectionY = -1; }
	}
	else if (stateArray[antX][antY] == 1) { // if the ant is standing on a white cell (turn clockwise)
		
		if (antDirectionX == 0 && antDirectionY == -1) { antDirectionX = 1; antDirectionY = 0; }
		else if (antDirectionX == 0 && antDirectionY == 1) { antDirectionX = -1; antDirectionY = 0; }
		else if (antDirectionX == -1 && antDirectionY == 0) { antDirectionX = 0; antDirectionY = -1; }
		else if (antDirectionX == 1 && antDirectionY == 0) { antDirectionX = 0; antDirectionY = 1; }
	}
	
	stateArray[antX][antY] ^= 1; //flip the color on which the ant is standing

	drawGrid();

	//move the ant
	antX += antDirectionX;
	antY += antDirectionY;
}

function drawGrid() {

	if (stateArray[antX][antY] == 0) {
		drawCell(antX*5, antY*5, 5, 5, "#37474F");
	}
	else {
		drawCell(antX*5, antY*5, 5, 5, "#ffffff");
	}
}

let canSpeedUp = false;

function speedUp() {
	canSpeedUp = true;
}

function stopSpeedUp() {
	canSpeedUp = false;
}

function manageSpeedUp() {
	if (canSpeedUp) {
		step();
	}
}

setInterval(manageSpeedUp, 1000/frames);