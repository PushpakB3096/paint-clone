/* getting all elements */
const { body } = document;
const bucketColorBtn = document.getElementById("bucket-color");
const brushColorBtn = document.getElementById("brush-color");
const brushIcon = document.getElementById("brush");
const eraser = document.getElementById("eraser");
const activeToolEl = document.getElementById("active-tool");
const brushSlider = document.getElementById("brush-slider");
const brushSize = document.getElementById("brush-size");
const clearCanvasBtn = document.getElementById("clear-canvas");
const saveStorageBtn = document.getElementById("save-storage");
const loadStorageBtn = document.getElementById("load-storage");
const clearStorageBtn = document.getElementById("clear-storage");
const downloadBtn = document.getElementById("download");

/* space for all the constants */
const BRUSH_TIME = 1500;

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
let isMouseDown = false;
/**
 * Upon switching the canvas color, the lines drawn are lost. We need to store the drawn lines
 * so that we can recreate it after the canvas color is changed.
 */
let drawnArray = [];

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
  // the background of the canvas is actually just a big rectangle
  canvasCtx.fillRect(0, 0, canvasEl.width, canvasEl.height);
  body.appendChild(canvasEl);
  // on canvas create, switch user to the brush tool
  switchToBrush();
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
  // on switch back to brush, need to reset the tool size and display it
  brushSlider.value = currentSize;
  displayBrushSize();
}

// function that will reset default view of the app
function brushTimeSetTimeout(ms) {
  setTimeout(switchToBrush, ms);
}

// after user changes the brush size, this function is called to display the new size
function displayBrushSize() {
  /**
   * if the brush size is less than 10, then we need to prepend it with
   * a '0' and display it. For eg., if the brush size is 6, then we need to show
   * it as '06'.
   * Display it as is when the brush size is 10 or more.
   */
  let brushSizeVal = currentSize;
  brushSize.textContent = brushSizeVal;
  if (currentSize < 10) {
    brushSize.textContent = `0${brushSizeVal}`;
  }
}

// function to fetch the current mouse position
function getMousePosition(event) {
  const boundaries = canvasEl.getBoundingClientRect();
  return {
    x: event.clientX - boundaries.left,
    y: event.clientY - boundaries.top,
  };
}

// for storing all the drawn lines in drawnArray
function storeDrawn(x, y, size, color, erase) {
  const line = {
    x,
    y,
    size,
    color,
    erase,
  };
  drawnArray.push(line);
}

// this function will redraw the lines based on content of drawnArray
function restoreCanvas() {
  for (let i = 1; i < drawnArray.length; i++) {
    canvasCtx.beginPath();
    // move the pointer to just near the point of drawing
    canvasCtx.moveTo(drawnArray[i - 1].x, drawnArray[i - 1].y);
    // the width of the drawn line will be stored in 'size' property
    canvasCtx.lineWidth = drawnArray[i].size;
    canvasCtx.lineCap = "round";

    // if the eraser was selected, then draw with canvas color. Otherwise, use the 'color' property to draw
    if (drawnArray[i].eraser) {
      canvasCtx.strokeStyle = bucketColor;
    } else {
      canvasCtx.strokeStyle = drawnArray[i].color;
    }

    // actually draw the lines
    canvasCtx.lineTo(drawnArray[i].x, drawnArray[i].y);
    canvasCtx.stroke();
  }
}

// function to clear the canvas
clearCanvasBtn.addEventListener("click", () => {
  // start with a fresh canvas
  createCanvas();
  drawnArray = [];
  // displays a message to notify user of the action
  activeToolEl.textContent = "Canvas Cleared";
  // after a certain time, switch to the brush tool
  brushTimeSetTimeout(BRUSH_TIME);
});

/* event listeners will go here */

// Setting Background Color
bucketColorBtn.addEventListener("change", () => {
  // setting the color of the bucket based on user selection
  bucketColor = `#${bucketColorBtn.value}`;
  // fill the canvas with the new color selected
  createCanvas();
  // restoring the canvas because setting the canvas color wipes out the drawn lines
  restoreCanvas();
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

// setting brush size based on user input
brushSlider.addEventListener("change", () => {
  // getting the brush size from user and setting it as the size of the tool
  const brushSizeVal = brushSlider.value;
  currentSize = brushSizeVal;
  // once the new size is set, display it on the UI
  displayBrushSize();
});

// clicking on the brush icon should switch user back to using the brush
brushIcon.addEventListener("click", switchToBrush);

// handles event when mouse button is clicked
canvasEl.addEventListener("mousedown", (event) => {
  isMouseDown = true;
  // gets the current mouse position in x-y coordinates
  const currentPosition = getMousePosition(event);
  // moves canvas ctx to the current mouse position and begins drawing
  canvasCtx.moveTo(currentPosition.x, currentPosition.y);
  canvasCtx.beginPath();
  // sets the style and width of the drawing line
  canvasCtx.lineWidth = currentSize;
  canvasCtx.lineCap = "round";
  canvasCtx.strokeStyle = currentColor;
});

// handles movement of mouse when clicked
canvasEl.addEventListener("mousemove", (event) => {
  // only draw when mouse button is clicked
  if (isMouseDown) {
    // gets the current mouse position in x-y coordinates
    const currentPosition = getMousePosition(event);
    canvasCtx.lineTo(currentPosition.x, currentPosition.y);
    canvasCtx.stroke();
    // stores the currently drawn line
    storeDrawn(
      currentPosition.x,
      currentPosition.y,
      currentSize,
      currentColor,
      isEraser
    );
  } else {
    storeDrawn(undefined);
  }
});

// handles mouse un-click
canvasEl.addEventListener("mouseup", () => {
  isMouseDown = false;
});

// save canvas to the local storage
saveStorageBtn.addEventListener("click", () => {
  // save the contents of drawnArray to the local storage
  localStorage.setItem("savedCanvas", JSON.stringify(drawnArray));
  // display to the user that the contents have been saved
  activeToolEl.textContent = "Canvas Saved";
  // switch to the default view
  brushTimeSetTimeout(BRUSH_TIME);
});

// Load from Local Storage
loadStorageBtn.addEventListener("click", () => {
  // gets the content of the localstorage
  const localStrgContent = localStorage.getItem("savedCanvas");
  // drawArray will be filled with data only if the content is there
  if (localStrgContent) {
    drawnArray = JSON.parse(localStrgContent);
    // redraw the canvas using the drawnArray
    restoreCanvas();
    // display to the user that the contents have been loaded from local storage
    activeToolEl.textContent = "Canvas Loaded";
  } else {
    // display to the user that the canvas was empty
    activeToolEl.textContent = "Canvas Not Found";
  }
  // switch to the default view
  brushTimeSetTimeout(BRUSH_TIME);
});

// removes the saved canvas from the local storage
clearStorageBtn.addEventListener("click", () => {
  localStorage.removeItem("savedCanvas");
  activeToolEl.textContent = "Local Storage Cleared";
  // switch to the default view
  brushTimeSetTimeout(BRUSH_TIME);
});

// download and save current canvas image
downloadBtn.addEventListener("click", () => {
  // takes the canvas content and creates a URL. The file type is PNG and the image quality is 1 (highest possible)
  downloadBtn.href = canvasEl.toDataURL("image/png", 1);
  // sets the file name
  downloadBtn.download = "paint-clone-by-pushpak-bhattacharya.png";

  // display the message that the canvas has been saved
  activeToolEl.textContent = "Image File Saved";
  // switch to the default view
  brushTimeSetTimeout(BRUSH_TIME);
});

/* functions to call on load */
createCanvas();
