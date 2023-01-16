/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

/* ============ Variables ============ */

// Paddle Properties
let paddle = {
  width: 10,
  height: 100,
  speed: 7,
  edgeDist: 20, // Distance between the edge and paddle
};

// Player Properties
let player1 = {
  position: 250,
  score: 0,
  edges: {
    top: null,
    right: null,
    bottom: null,
    left: null,
  },
};
let player2 = {
  position: 250,
  score: 0,
  edges: {
    top: null,
    right: null,
    bottom: null,
    left: null,
  },
};

// Ball Properties
let ball = {
  // Defines the width and height of the ball
  size: 10,
  // Defines where the ball is located
  position: {
    x: null,
    y: null,
  },
  // Defines if ball is going left (x = -1) or right (x = 1) and up (y = -1) or down (y = 1)
  direction: {
    x: 1,
    y: 1,
  },
  // Defines vertically and horizontally how fast the ball is by default and its limits. The active ariable is where the current speed of the ball is stored.
  speed: {
    y: {
      active: 0,
      default: 0,
      max: 10,
      min: 0,
    },
    x: {
      active: 0,
      default: 6,
      max: 20,
      min: 8,
    },
  },
};

// Game
let start = false; // When set to true, a game to 10 is started
let winningScore = 10; // Score a player needs to reach to win the game

// Colors
let colors = {
  bg: "#1a1a1a",
  fg: "#e8e8e8",
  detail: "#212121",
};

/* ============ Setup ============ */
function setup() {
  // Create canvas and set size
  createCanvas(750, 500);

  // Shape properties
  rectMode(CENTER);
  noStroke();

  // Text properties
  textFont("Familjen Grotesk");
  textAlign(CENTER, CENTER);
  textStyle(BOLD);

  // Set frame rate
  frameRate(60);

  // Ball Initial Position
  ball.position.x = width / 2;
  ball.position.y = height / 2;
}

/* ============ Draw ============ */
// The draw functions is called every 60 frames and allows the game to be shown and repeatedly redrawn on the canvas.

function draw() {
  // Draw Background
  background(colors.bg);

  // Draw Middle line
  fill(colors.detail);
  rect(width / 2, height / 2, 10, height);

  // Draw start game indicator
  textSize(12);
  fill(colors.fg);
  if (start == false) {
    text("Press SPACE to start", width / 2, 20);
  } else {
    text("");
  }

  // Draw scores
  textSize(288);
  fill(colors.detail);
  text(player1.score, width / 4, height / 2);
  text(player2.score, (width / 4) * 3, height / 2);

  // Draw Player 1's paddle
  fill(colors.fg);
  rect(
    width - width + paddle.edgeDist,
    player1.position,
    paddle.width,
    paddle.height,
    0,
    paddle.height,
    paddle.height,
    0
  );

  // Draw Player 2's paddle
  fill(colors.fg);
  rect(
    width - paddle.edgeDist,
    player2.position,
    paddle.width,
    paddle.height,
    paddle.height,
    0,
    0,
    paddle.height
  );

  // Activate paddle controls
  paddleMove();

  // Find Paddle 1 Area
  player1.edges.top = player1.position - paddle.height / 2;
  player1.edges.right = paddle.edgeDist + paddle.width;
  player1.edges.bottom = player1.position + paddle.height / 2;
  player1.edges.left = 0;

  // Find Paddle 2 Area
  player2.edges.top = player2.position - paddle.height / 2;
  player2.edges.right = width;
  player2.edges.bottom = player2.position + paddle.height / 2;
  player2.edges.left = width - (paddle.edgeDist + paddle.width);

  // Update the position of the ball
  ball.position.x = ball.position.x + ball.speed.x.active * ball.direction.x;
  ball.position.y = ball.position.y + ball.speed.y.active * ball.direction.y;

  // Ball bounces if it hits a paddle 1
  if (
    ball.position.y >= player1.edges.top &&
    ball.position.y <= player1.edges.bottom &&
    ball.position.x <= player1.edges.right &&
    ball.position.x >= player1.edges.left
  ) {
    // Prevent speed to go over the maximum
    if (ball.speed.y.active <= ball.speed.y.min) {
      ball.speed.y.active = ball.speed.y.min + 2;
    }
    if (ball.speed.y.active >= ball.speed.y.max) {
      ball.speed.y.active = ball.speed.y.max - 2;
    }
    // Prevent speed to go under the minimum
    if (ball.speed.x.active <= ball.speed.x.min) {
      ball.speed.y.active = ball.speed.y.min + 2;
    }
    if (ball.speed.x.active >= ball.speed.x.max) {
      ball.speed.x.active = ball.speed.x.max - 2;
    }
    // Inverse horizontal direction to send ball the other way
    ball.direction.x *= -1;
    // Either add or subtract 2 from the active speed to create speed variation
    ball.speed.x.active = random(
      ball.speed.x.active - 2,
      ball.speed.x.active + 2
    );
    ball.speed.y.active = random(
      ball.speed.y.active - 2,
      ball.speed.y.active + 2
    );
    // If the ball is hit on the upper half of the paddle, the bounce will be angled upwards. Otherwise, it'll be angled downwards.
    if (ball.position.y < player1.position) {
      ball.direction.y = -1;
    } else {
      ball.direction.y = 1;
    }
  }

  // Ball bounces if it hits paddle 2
  if (
    ball.position.y >= player2.edges.top &&
    ball.position.y <= player2.edges.bottom &&
    ball.position.x <= player2.edges.right &&
    ball.position.x >= player2.edges.left
  ) {
    // Prevent speed to go over the maximum
    if (ball.speed.y.active <= ball.speed.y.min) {
      ball.speed.y.active = ball.speed.y.min + 2;
    }
    if (ball.speed.y.active >= ball.speed.y.max) {
      ball.speed.y.active = ball.speed.y.max - 2;
    }
    // Prevent speed to go under the minimum
    if (ball.speed.x.active <= ball.speed.x.min) {
      ball.speed.x.active = ball.speed.x.min + 2;
    }
    if (ball.speed.y.active >= ball.speed.x.max) {
      ball.speed.x.active = ball.speed.x.max - 2;
    }
    // Inverse horizontal direction to send ball the other way
    ball.direction.x *= -1;
    // Either add or subtract 2 from the active speed to create speed variation
    ball.speed.x.active = random(
      ball.speed.x.active - 2,
      ball.speed.x.active + 2
    );
    ball.speed.y.active = random(
      ball.speed.y.active - 2,
      ball.speed.y.active + 2
    );

    // If the ball is hit on the upper half of the paddle, the bounce will be angled upwards. Otherwise, it'll be angled downwards.
    if (ball.position.y < player2.position) {
      ball.direction.y = -1;
    } else {
      ball.direction.y = 1;
    }
  }

  // Ball bounces vertically if hits upper or lower wall
  if (ball.position.y > height - ball.size || ball.position.y < ball.size) {
    ball.direction.y *= -1;
  }

  // Ball stops if it hits left or right wall
  if (ball.position.x > width - ball.size || ball.position.x < ball.size) {
    goalScored();
  }

  // Ball
  fill(colors.fg);
  ellipse(ball.position.x, ball.position.y, ball.size, ball.size);

  // Start Game
  if (start == false) {
    if (keyIsDown(32)) {
      startGame();
    }
  }
}

/* ============ Move Paddle ============ */
// This function is repeatdly called by the draw function to allow paddles to move up and down at all time.

function paddleMove() {
  // Paddle 1 Controls
  if (keyIsDown(87)) {
    if (player1.position <= paddle.height / 2) {
      player1.position -= 0;
    } else {
      player1.position -= paddle.speed;
    }
  }
  if (keyIsDown(83)) {
    if (player1.position >= height - paddle.height / 2) {
      player1.position += 0;
    } else {
      player1.position += paddle.speed;
    }
  }

  // Paddle 2 Controls
  if (keyIsDown(UP_ARROW)) {
    if (player2.position <= paddle.height / 2) {
      player2.position -= 0;
    } else {
      player2.position -= paddle.speed;
    }
  }

  if (keyIsDown(DOWN_ARROW)) {
    if (player2.position >= height - paddle.height / 2) {
      player2.position += 0;
    } else {
      player2.position += paddle.speed;
    }
  }
}

/* ============ Start Game ============ */
// This function is called when the condition to start a game is met.
function startGame() {
  player1.score = 0;
  player2.score = 0;
  start = true;
  placeBall();
}

/* ============ Stop Game ============ */
// This function is called when one of the players reach the winning score and resets the ball to the middle with no speed.
function stopGame() {
  start = false;
  // Ball Initial Position
  ball.position.x = width / 2;
  ball.position.y = height / 2;
  // Adjust speed
  ball.speed.x.active = 0;
  ball.speed.y.active = 0;
}

/* ============ Goal Scored ============ */
// This function is called when a goal is scored by any of the two players. It checks which player scored by looking at where the ball ended up when it was scored, and increments the respective player's score.
function goalScored() {
  if (ball.position.x > width - ball.size) {
    player1.score++;
    if (player1.score == winningScore) {
      stopGame();
    } else {
      placeBall();
    }
  }
  if (ball.position.x < ball.size) {
    player2.score++;
    if (player2.score == winningScore) {
      stopGame();
    } else {
      placeBall();
    }
  }
}

/* ============ Place Ball ============ */
// This function is called everytime a goal is scored and the ball needs to be replaced and put back into play. The function checks if a game is started before doing anything.
function placeBall() {
  if (start == true) {
    // Ball Initial Position
    ball.position.x = width / 2;
    ball.position.y = height / 2;
    // Adjust speed
    ball.speed.x.active = ball.speed.x.default;
    ball.speed.y.active = ball.speed.y.default;
    ball.direction.x = -ball.direction.x;
  }
}
