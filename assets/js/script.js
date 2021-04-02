/* getting all elements */
const { body } = document;
const bucketColorBtn = document.getElementById("bucket-color");
const brushColorBtn = document.getElementById("brush-color");
const brushIcon = document.getElementById("brush");
const eraser = document.getElementById("eraser");
const activeToolEl = document.getElementById("active-tool");

/* global variables must be added here */
let currentSize = 10;
let bucketColor = "#FFFFFF";
let currentColor = "#A51DAB";
/**
 * Using an eraser means that the user is 'drawing' with the canvas color.
 * isEraser variable is going to hold whether the user is drawing on the canvas
 * with the brush color or with the canvas color.
 */
let isEraser = false;

// creating the main canvas element in global scope
const canvasEl = document.createElement("canvas");
canvasEl.id = "canvas";
const canvasCtx = canvasEl.getContext("2d");

/* end of global variables */

/* functions will be added here */

// attaching the created canvas element to the body
function createCanvas() {
  /* 
    Getting the device width and height and setting it as the canvas size.
    50px is removed from height to account for the toolbar at the top.
  */
  canvasEl.width = window.innerWidth;
  canvasEl.height = window.innerHeight - 50;
  canvasCtx.fillStyle = bucketColor;
  canvasCtx.fillRect(0, 0, canvasEl.width, canvasEl.height);
  body.appendChild(canvasEl);
}

// function that will switch the user back to using the brush
function switchToBrush() {
  // user is not using the eraser
  isEraser = false;
  // active tool selected will show the appropriate tool selected
  activeToolEl.textContent = "Brush";
  brushIcon.style.color = "black";
  eraser.style.color = "white";
  currentColor = `#${brushColorBtn.value}`;
  currentSize = 10;
}

/* event listeners will go here */

// Setting Background Color
bucketColorBtn.addEventListener("change", () => {
  // setting the color of the bucket based on user selection
  bucketColor = `#${bucketColorBtn.value}`;
  // fill the canvas with the new color selected
  createCanvas();
});

// Setting Brush Color
brushColorBtn.addEventListener("change", () => {
  // user has not clicked on the eraser
  isEraser = false;
  // setting the current color to the user selection
  currentColor = `#${brushColorBtn.value}`;
});

// handling event when user clicks on eraser icon
eraser.addEventListener("click", () => {
  // user has now clicked on the eraser icon
  isEraser = true;
  brushIcon.style.color = "white";
  eraser.style.color = "black";
  // active tool selected will show the appropriate tool selected
  activeToolEl.textContent = "Eraser";
  // user will now 'draw' with the canvas color, essentially erasing the content
  currentColor = bucketColor;
  currentSize = 50;
});

// clicking on the brush icon should switch user back to using the brush
brushIcon.addEventListener("click", switchToBrush);

/* functions to call on load */
createCanvas();
