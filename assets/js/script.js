/* getting all elements */
const { body } = document;

/* global variables must be added here */

// creating the main canvas element
const canvasEl = document.createElement("canvas");
canvasEl.id = "canvas";
const canvasCtx = canvasEl.getContext("2d");

/* end of global variables */

/* functions will be added here */

// attaching the created canvas element to the body
function createCanvas() {
  body.appendChild(canvasEl);
}

/* functions to call on load */
createCanvas();
