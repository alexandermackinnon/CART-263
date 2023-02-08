/**
Aggressive & Dangerous
by Alexander MacKinnon
*/

// --------------- Variables  ---------------

// Array that will store our particles
let squares = [];

// Array that holds the aggressive square
let aggressiveSquare;

// Array that stores threshold for the lerped color for fade animation
let colorFade;

// Set initial square size
let squareInitSize = 20;

// Set number of columns & rows
let ncols = 15;
let nrows = 15;

// --------------- Set-up Function  ---------------
function setup() {
  // Create Canvas
  createCanvas(500, 500);

  // Create Grid
  for (let i = 0; i < ncols; i++) {
    for (let j = 0; j < nrows; j++) {
      let x = (j * width) / (ncols * 1.0);
      let y = (i * height) / (nrows * 1.0);
      squares[i * ncols + j] = new Particle(squareInitSize, x, y);
    }
  }
}

// --------------- Draw Function  ---------------
function draw() {
  // Draw background
  background(0);

  // Pick a square at random in our array to turn aggressive
  aggressiveSquare = floor(random(0, nrows * nrows));

  // Draw grid from squares in our array
  for (let i = 0; i < squares.length; i++) {
    squares[i].display();
    squares[aggressiveSquare].turnAggressive();
  }
}

// --------------- Particle Object ---------------
class Particle {
  // Constructor properties
  constructor(squareSize, x, y) {
    this.x = x + (squareSize - squareSize / 5);
    this.y = y + (squareSize - squareSize / 5);
    this.size = squareSize;
    this.aggressive = false;
    this.intensity = 0;
  }
  // Display conditions
  display() {
    // Colors are stored here
    let colors = {
      gray: color(30, 30, 30),
      red: color(250, 70, 55),
    };
    // If the square is given the aggressive attribute...
    if (this.aggressive) {
      // And as long as it is under a given intensity...
      if (this.intensity < 2) {
        // Rise the intensity
        this.intensity += 0.1;
        // Create a fade animation with the intensity using lerp
        colorFade = lerpColor(colors.gray, colors.red, this.intensity);
        fill(colorFade);
      } else {
        // Reset intensity to 0 and restart the square animation loop
        this.intensity = 0;
      }
      // If not aggressive, square appears as gray
    } else {
      fill(colors.gray);
    }
    // Square properties go here
    noStroke();
    rectMode(CENTER);
    // Draw square, with size varying depending on its current intensity
    square(this.x, this.y, this.size + this.intensity * 5, 5);
  }
  // Selects every frame a square to turn "aggressive"
  turnAggressive() {
    if (frameCount % 1 == 0) {
      this.aggressive = true;
    }
  }
}
