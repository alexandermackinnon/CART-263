# Vandalizers

A Playful Interaction
by Alexander MacKinnon & Anthony Bourgeois

## Live Demo

A live demo is available at the following links

- [Receiving Screen](https://vandalizers.mackinnonmedia.com/receiver/) (open on a large display that each player can see):
- [Player Screens](https://vandalizers.mackinnonmedia.com/player)(open on mobile devices):

## About the Game

Vandalizers is a 2-4 player interactive party game in which users compete in a brick wall vandalization contest. The objective is to conquer with the player's assigned color the most amount of territory on the brick wall by throwing paint. After a 30 second showdown, the bricks are counted by the system to see how many bricks each player painted in that timeframe, and declares the winner based on the amount of bricks controlled.

The game is built into an HTML canvas using P5.js, a JavaScript animation library. MQTT connection was used to make the player screens to receiving screen communication possible. The iPhone's gyroscope handles where the user throws paint on the main screen.

## How to Play

To play, there needs to be a main screen, preferably large and accessible so that everyone who is playing can see, along with mobile phones that have a built-in gyroscope which will act as controllers for the game.

#### Lobby Screen

On startup, the player is introduced on the receiving screen to a click prompt, which launches the game and brings the users the lobby screen. This acts as a waiting room while everyone who is playing connects to the server. **When everyone is ready to play, any key can be pressed while in the lobby to start game**.
![Intro Screen](assets/readme/readme01.png)

#### Mobile Display

Players will see on their phones after selecting their player the following mobile display. This is a shooting sensor that will indicate where on the screen the user is aiming. **To shoot a paint ball, the player must tap on their phone**. Where the ball on the sensor is located when the phone is tapped is where it will end up on the main screen.
![Mobile Display](assets/readme/readme02.png)

#### Game Screen

As players throw paint, the wall will get filled up with different colors!
![In-Game Screen](assets/readme/readme03.png)

#### End Results

At the end of the 30-second showdown, bricks are counted and compiled into scores shown on screen. **From there, the user may click anywhere on the screen to go back to the lobby and start a new game.**
![End Results](assets/readme/readme04.png)
