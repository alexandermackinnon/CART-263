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
let ballSize = 15;
let ballSpeedX = 8; // Speed of the shape
let ballSpeedY = 4; // Speed of the shape
let ballTrajectoryX = 1; // Left or Right
let ballTrajectoryY = 1; // Top to Bottom

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

  // Update the position of the shape
  ballPosX = ballPosX + ballSpeedX * ballTrajectoryX;
  ballPosY = ballPosY + ballSpeedY * ballTrajectoryY;

  // Test to see if the shape exceeds the boundaries of the screen
  // If it does, reverse its direction by multiplying by -1
  if (ballPosX > width - ballSize || ballPosX < ballSize) {
    ballTrajectoryX *= -1;
  }
  if (ballPosY > height - ballSize || ballPosY < ballSize) {
    ballTrajectoryY *= -1;
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
}

/* ============ Start Game ============ */
function startGame() {}
