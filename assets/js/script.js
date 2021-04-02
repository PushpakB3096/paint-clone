/* getting all elements */
const { body } = document;
const bucketColorBtn = document.getElementById("bucket-color");

/* global variables must be added here */
let currentSize = 10;
let bucketColor = "#FFFFFF";
let currentColor = "#A51DAB";

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

/* event listeners will go here */

// Setting Background Color
bucketColorBtn.addEventListener("change", () => {
  // setting the color of the bucket based on user selection
  bucketColor = `#${bucketColorBtn.value}`;
  // fill the canvas with the new color selected
  createCanvas();
});

/* functions to call on load */
createCanvas();
