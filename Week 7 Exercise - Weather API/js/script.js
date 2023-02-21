/*
- Using the weather API:
- Choose any city and generate a JSON query
- Write the current wind speed and direction in the middle of the screen
- Make the background colour of the canvas reflect the current cloud cover
- Draw that city as a circle on your canvas based on the latitude and
longitude
- Draw 5 circles that represent the weather for the last 5 hours using size
and color
- Write the remaining time until sunset, and time since sunrise, today in
that city. 
*/

let weather;
function preload() {
  // 1) Using weather API + generate JSON query
  weather = loadJSON(
    "https://api.open-meteo.com/v1/forecast?latitude=45.48&longitude=-75.70&hourly=temperature_2m,cloudcover&current_weather=true"
  );
}

function setup() {
  // Print whole object
  print(weather);

  colorMode(RGB, 255, 255, 255, 1);
  createCanvas(1000, 500);
  background(0, 140, 220); // blue bg

  // 3) Make the background colour of the canvas reflect the current cloud cover
  let currentCloudCover =
    weather.hourly.cloudcover[weather.hourly.cloudcover.length - 1];
  let mappedCloudCover = map(currentCloudCover, 0, 100, 0, 0.9);
  // Cloud layer
  print(mappedCloudCover);
  fill(150, 150, 150, mappedCloudCover);
  rect(0, 0, width);

  // 2) Write the current wind speed and direction in the middle of the screen
  fill("#fff");
  textAlign(CENTER);
  textStyle(BOLD);
  text(
    "Wind Speed: " + weather.current_weather.windspeed,
    width / 2,
    height / 2 + 10
  );
  text(
    "Wind Direction: " + weather.current_weather.winddirection,
    width / 2,
    height / 2 - 10
  );

  // 4) Draw that city as a circle on your canvas based on the latitude and longitude;
  let lat = weather.latitude;
  let long = weather.longitude;
  let mappedLat = int(map(lat, 90, -90, 0, height));
  let mappedLong = int(map(long, -180, 180, 0, width));
  console.log(mappedLong, mappedLat);
  fill("#fff");
  ellipseMode(CENTER);
  ellipse(mappedLong, mappedLat, 30);

  /*
  print("The Weather:");
  print("Located at: " + weather.latitude + ", " + weather.longitude);
  print("Current temp: " + weather.current_weather.temperature);
  print("Current wind speed: " + weather.current_weather.windspeed);
  print("The hourly temperature is (in C): ");
  for (let i = 0; i < 5; i++) {
    print(weather.hourly.temperature_2m[i] + " C");
  }
  */
}
