/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

/* ============ Variables ============ */

// Paddle Properties
let paddleWidth = 10;
let paddleHeight = 80;
let firstPaddlePos = 250;
let secondPaddlePos = 250;

// Ball Properties
let ballPosX, ballPosY;
let ballSize = 10;
let ballTrajectoryX = 1; // Left or Right
let ballTrajectoryY = 1; // Top to Bottom
let ballSpeedY = {
  active: 0,
  max: 10,
  min: 0,
};
let ballSpeedX = {
  active: 8,
  max: 15,
  min: 5,
};

/* ============ Preload ============ */
function preload() {}

/* ============ Setup ============ */
function setup() {
  createCanvas(750, 500);
  rectMode(CENTER);
  noStroke();

  // Ball Initial Position
  ballPosX = width / 2;
  ballPosY = height / 2;
}

/* ============ Draw ============ */
function draw() {
  // Background
  background("#eee");

  // Middle line
  fill("#dedede");
  rect(width / 2, height / 2, 5, height);

  // Paddle 1
  fill("#333");
  rect(
    width - width + 20,
    firstPaddlePos,
    paddleWidth,
    paddleHeight,
    paddleHeight
  );

  // Paddle 2
  fill("#333");
  rect(width - 20, secondPaddlePos, paddleWidth, paddleHeight, paddleHeight);

  paddleMove();

  // Find Paddle 1 Edges
  let firstPaddleTop = firstPaddlePos - paddleHeight / 2;
  let firstPaddleRight = width - width + 20 + paddleWidth;
  let firstPaddleBottom = firstPaddlePos + paddleHeight / 2;
  let firstPaddleLeft = width - width + 20 + paddleWidth - paddleWidth;

  // Find Paddle 2 Edges
  let secondPaddleTop = secondPaddlePos - paddleHeight / 2;
  let secondPaddleRight = width - 20 + paddleWidth;
  let secondPaddleBottom = secondPaddlePos + paddleHeight / 2;
  let secondPaddleLeft = width - 20 + paddleWidth - paddleWidth;

  // Update the position of the shape
  ballPosX = ballPosX + ballSpeedX.active * ballTrajectoryX;
  ballPosY = ballPosY + ballSpeedY.active * ballTrajectoryY;

  // Ball bounces horizontally if it hits a paddle
  if (
    ballPosY >= firstPaddleTop &&
    ballPosY <= firstPaddleBottom &&
    ballPosX <= firstPaddleRight &&
    ballPosX >= firstPaddleLeft
  ) {
    if (ballSpeedY.active <= ballSpeedY.min) {
      ballSpeedY.active = ballSpeedY.min + 2;
    }
    if (ballSpeedY.active >= ballSpeedY.max) {
      ballSpeedY.active = ballSpeedY.max - 2;
    }
    if (ballSpeedX.active <= ballSpeedX.min) {
      ballSpeedY.active = ballSpeedY.min + 2;
    }
    if (ballSpeedX.active >= ballSpeedX.max) {
      ballSpeedX.active = ballSpeedX.max - 2;
    }
    ballTrajectoryX *= -1;
    ballSpeedX.active = random(ballSpeedX.active - 2, ballSpeedX.active + 2);
    ballSpeedY.active = random(ballSpeedY.active - 2, ballSpeedY.active + 2);
    if (ballPosY < firstPaddlePos) {
      ballTrajectoryY = -1;
    } else {
      ballTrajectoryY = 1;
    }
  }

  if (
    ballPosY >= secondPaddleTop &&
    ballPosY <= secondPaddleBottom &&
    ballPosX <= secondPaddleRight &&
    ballPosX >= secondPaddleLeft
  ) {
    if (ballSpeedY.active <= ballSpeedY.min) {
      ballSpeedY.active = ballSpeedY.min + 2;
    }
    if (ballSpeedY.active >= ballSpeedY.max) {
      ballSpeedY.active = ballSpeedY.max - 2;
    }
    if (ballSpeedX.active <= ballSpeedX.min) {
      ballSpeedX.active = ballSpeedX.min + 2;
    }
    if (ballSpeedY.active >= ballSpeedX.max) {
      ballSpeedX.active = ballSpeedX.max - 2;
    }
    ballTrajectoryX *= -1;
    ballSpeedX.active = random(ballSpeedX.active - 2, ballSpeedX.active + 2);
    ballSpeedY.active = random(ballSpeedY.active - 2, ballSpeedY.active + 2);
    if (ballPosY < secondPaddlePos) {
      ballTrajectoryY = -1;
    } else {
      ballTrajectoryY = 1;
    }
  }

  // Ball bounces vertically if hits upper or lower wall
  if (ballPosY > height - ballSize || ballPosY < ballSize) {
    ballTrajectoryY *= -1;
  }

  // Ball stops if it hits left or right wall
  if (ballPosX > width - ballSize || ballPosX < ballSize) {
    ballTrajectoryX = 0;
    ballTrajectoryY = 0;
  }

  // Ball
  fill("#333");
  ellipse(ballPosX, ballPosY, ballSize, ballSize);
}

/* ============ Move Paddle ============ */
function paddleMove() {
  // Paddle 1 Controls
  if (keyIsDown(87)) {
    if (firstPaddlePos <= paddleHeight / 2) {
      firstPaddlePos -= 0;
    } else {
      firstPaddlePos -= 5;
    }
  }
  if (keyIsDown(83)) {
    if (firstPaddlePos >= height - paddleHeight / 2) {
      firstPaddlePos += 0;
    } else {
      firstPaddlePos += 5;
    }
  }

  // Paddle 2 Controls
  if (keyIsDown(UP_ARROW)) {
    if (secondPaddlePos <= paddleHeight / 2) {
      secondPaddlePos -= 0;
    } else {
      secondPaddlePos -= 5;
    }
  }

  if (keyIsDown(DOWN_ARROW)) {
    if (secondPaddlePos >= height - paddleHeight / 2) {
      secondPaddlePos += 0;
    } else {
      secondPaddlePos += 5;
    }
  }
}

/* ============ Start Game ============ */
function startGame() {}
