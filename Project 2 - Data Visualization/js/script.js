/**
90s Music Machine
by Alexander MacKinnon
*/

// --------------- Variables  ---------------

// Variable that holds our data table file
let table;

// Array that holds our data
let songsData = [];

// Array that holds our audio files
let songsAudio = [];

// Variable that holds the boolean determining if machine is started or not
let toggleMachine = false;

// Variable that holds the
let frameCounter = 0;

// Variable that holds the current song ID
let currentAudio;

// Variable that gets the amount of playable songs
// As we only have 120 rows linked to a file for now, we will be ending the loop at 120 instead of fetching every row.
let songsAmount = 120; /* table.getRowCount() */

// Variable that holds colors of the UI
let colors = [
  "#f94144",
  "#f35b04",
  "#f18701",
  "#f7b801",
  "#90be6d",
  "#43aa8b",
  "#4d908e",
  "#277da1",
  "#577590",
  "#7678ed",
  "#3d348b",
];

// --------------- Preload Function  ---------------
// Before start up, this function loads the data into the project.
function preload() {
  // Load CSV data file
  table = loadTable("data.csv", "csv", "header");

  // Load each song file
  for (let i = 0; i <= songsAmount; i++) {
    songsAudio[i] = loadSound("assets/songs/" + String(i) + ".mp3");
    console.log(songsAudio[i]);
  }

  // Text properties
}

// --------------- Set-up Function  ---------------
function setup() {
  // Set up canvas
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB, 255, 255, 255, 1);
  background("#1c1c1c");

  if (!toggleMachine) {
    // Amount of songs
    for (let i = 0; i <= songsAmount; i++) {
      // Cycle through each row of the table
      songsData[i] = new Song(
        table.getString(i, 1),
        table.getString(i, 2),
        table.getString(i, 3),
        table.getString(i, 4),
        float(table.getString(i, 3)) + float(table.getString(i, 4)) / 2,
        int(random(0, colors.length))
      );
      // Pass through the values in each row
      songsData[i].drawTitleScreen();
    }

    // Background overlay (reduce shape opacity)
    fill(0, 0, 0, 0.4);
    rect(0, 0, width, height);

    // Text
    fill("#fff");
    textSize(90);
    textFont("Climate Crisis");
    textAlign(CENTER, CENTER);
    text("90s Song", width / 2, height / 2 - 40);
    text("Machine", width / 2, height / 2 + 40);
    textSize(15);
    textStyle(BOLD);
    textFont("Helvetica");
    text("CLICK ANYWHERE TO START", width / 2, height - 40);
  }
}

// --------------- Draw Function  ---------------
function draw() {
  if (toggleMachine) {
    // Frame counter
    frameCounter++;
    // console.log(frameCounter);
    // Every 5 seconds (300 frames), a new song is picked by calling the selectSong function.
    if (frameCounter % 300 == 0 || frameCounter == 1) {
      selectSong();
    }
    songsData[currentAudio].drawSongVisualization();
  }
}

// --------------- Pick Song Function  ---------------

function selectSong() {
  // Reset frames to 1 to restart the count
  frameCounter = 1;

  // Set new background
  currentBg = int(random(0, colors.length));
  background(colors[currentBg]);

  // Select a random song
  currentAudio = int(random(0, songsAmount));

  // Play selected song
  songsAudio[currentAudio].play();

  // Show song info on screen
  songsData[currentAudio].drawSongInfo();
}

// --------------- Song Object ---------------
class Song {
  // Constructor properties
  constructor(artist, title, millenialRec, genZRec, ovrRec, randomColor) {
    this.artist = artist;
    this.title = title;
    this.millenialRec = millenialRec;
    this.genZRec = genZRec;
    this.ovrRec = ovrRec;
    this.x = random(width);
    this.y = random(height);
    this.randomColor = randomColor;
    this.thresh = {
      millenial: map(this.millenialRec, 0, 1, 0, 200),
      genZ: map(this.genZRec, 0, 1, 0, 200),
      ovr: map(this.ovrRec, 0, 1, 10, 100),
      frame: map(this.ovrRec, 0, 1, 1, 60),
    };
  }

  // Title Screen Circles: This draws a circle for each song on the title screen
  drawTitleScreen() {
    noStroke();
    fill(colors[this.randomColor]);
    console.log(this.ovrRec);
    ellipse(this.x, this.y, this.thresh.ovr);
  }

  // Song Visualization
  drawSongVisualization() {
    // Ellipses and squares
    fill(255, 255, 255, 0.2);
    ellipse(random(0, width / 2), random(height), this.thresh.millenial);
    rect(random(width / 2, width), random(height), this.thresh.genZ);
  }

  // Title
  drawSongInfo() {
    textSize(10);
    textFont("Helvetica");
    fill("#fff");
    textAlign(LEFT);
    text(this.artist + " - " + this.title, 40, 40);
    text("Millenials: " + this.millenialRec, 40, height - 40);
    textAlign(RIGHT);
    text("Gen Z: " + this.genZRec, width - 40, height - 40);
  }
}

function mousePressed() {
  toggleMachine = true;
}
