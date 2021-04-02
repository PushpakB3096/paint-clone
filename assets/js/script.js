/* getting all elements */
const { body } = document;

/* global variables must be added here */

let bucketColor = "#FFFFFF";

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

/* functions to call on load */
createCanvas();
