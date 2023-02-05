/**
Aggressive & Dangerous
by Alexander MacKinnon
*/

// --------------- Variables  ---------------
let ball = [];
let ballInitSize = 25;

// --------------- Set-up Function  ---------------
function setup() {
  let ncols = 17;
  let nrows = 17;
  createCanvas(500, 500);
  for (let i = 0; i < ncols; i++) {
    for (let j = 0; j < nrows; j++) {
      let x = (j * width) / (ncols * 1.0);
      let y = (i * height) / (nrows * 1.0);
      ball[i * ncols + j] = new Particle(25, x, y);
    }
  }
}

// --------------- Draw Function  ---------------
function draw() {
  background(0);
  for (let i = 0; i < ball.length; i++) {
    ball[i].display();
  }
}

// --------------- Particle Object ---------------
class Particle {
  constructor(pSize, x, y) {
    this.x = x + pSize;
    this.y = y + pSize;
    this.diameter = pSize;
  }
  display() {
    fill(255);
    ellipseMode(CENTER);
    ellipse(this.x, this.y, this.diameter);
  }
}
