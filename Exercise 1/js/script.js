/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

/* ============ Variables ============ */

// Colors
let colors = {
  bg: "#1a1a1a",
  fg: "#e8e8e8",
  detail: "#303030",
};

// Paddle Properties
let paddle = {
  width: 10,
  height: 80,
  speed: 8,
  edgeDist: 20,
};

// Player Properties
let player1 = {
  position: 250,
  score: null,
  edges: {
    top: null,
    right: null,
    bottom: null,
    left: null,
  },
};

let player2 = {
  position: 250,
  score: null,
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
  // Defines vertically and horizontally how fast the ball is by default and its limits
  speed: {
    y: {
      active: 0,
      max: 10,
      min: 0,
    },
    x: {
      active: 16,
      max: 16,
      min: 8,
    },
  },
};

/* ============ Preload ============ */
function preload() {}

/* ============ Setup ============ */
function setup() {
  createCanvas(750, 500);
  rectMode(CENTER);
  noStroke();

  // Set frame rate
  frameRate(60);

  // Ball Initial Position
  ball.position.x = width / 2;
  ball.position.y = height / 2;
}

/* ============ Draw ============ */
function draw() {
  // Background
  background(colors.bg);

  // Middle line
  fill(colors.detail);
  rect(width / 2, height / 2, 5, height);

  // Paddle 1
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

  // Paddle 2
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

  console.log(
    player2.edges.top,
    player2.edges.right,
    player2.edges.bottom,
    player2.edges.left
  );

  // Update the position of the shape
  ball.position.x = ball.position.x + ball.speed.x.active * ball.direction.x;
  ball.position.y = ball.position.y + ball.speed.y.active * ball.direction.y;

  // Ball bounces horizontally if it hits a paddle
  if (
    ball.position.y >= player1.edges.top &&
    ball.position.y <= player1.edges.bottom &&
    ball.position.x <= player1.edges.right &&
    ball.position.x >= player1.edges.left
  ) {
    if (ball.speed.y.active <= ball.speed.y.min) {
      ball.speed.y.active = ball.speed.y.min + 2;
    }
    if (ball.speed.y.active >= ball.speed.y.max) {
      ball.speed.y.active = ball.speed.y.max - 2;
    }
    if (ball.speed.x.active <= ball.speed.x.min) {
      ball.speed.y.active = ball.speed.y.min + 2;
    }
    if (ball.speed.x.active >= ball.speed.x.max) {
      ball.speed.x.active = ball.speed.x.max - 2;
    }
    ball.direction.x *= -1;
    ball.speed.x.active = random(
      ball.speed.x.active - 2,
      ball.speed.x.active + 2
    );
    ball.speed.y.active = random(
      ball.speed.y.active - 2,
      ball.speed.y.active + 2
    );
    if (ball.position.y < player1.position) {
      ball.direction.y = -1;
    } else {
      ball.direction.y = 1;
    }
  }

  if (
    ball.position.y >= player2.edges.top &&
    ball.position.y <= player2.edges.bottom &&
    ball.position.x <= player2.edges.right &&
    ball.position.x >= player2.edges.left
  ) {
    if (ball.speed.y.active <= ball.speed.y.min) {
      ball.speed.y.active = ball.speed.y.min + 2;
    }
    if (ball.speed.y.active >= ball.speed.y.max) {
      ball.speed.y.active = ball.speed.y.max - 2;
    }
    if (ball.speed.x.active <= ball.speed.x.min) {
      ball.speed.x.active = ball.speed.x.min + 2;
    }
    if (ball.speed.y.active >= ball.speed.x.max) {
      ball.speed.x.active = ball.speed.x.max - 2;
    }
    ball.direction.x *= -1;
    ball.speed.x.active = random(
      ball.speed.x.active - 2,
      ball.speed.x.active + 2
    );
    ball.speed.y.active = random(
      ball.speed.y.active - 2,
      ball.speed.y.active + 2
    );
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
    ball.direction.x = 0;
    ball.direction.y = 0;
  }

  // Ball
  fill(colors.fg);
  ellipse(ball.position.x, ball.position.y, ball.size, ball.size);
}

/* ============ Move Paddle ============ */
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
function startGame() {}
