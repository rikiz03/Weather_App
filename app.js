const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");

const app = express();
app.use(bodyparser.urlencoded({
  extended: true
}));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req, res) {
  const query = req.body.cityName;
  const theAppid = "f58717558bfd0c271a04dccbf121c57c";
  const theUnit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather/?q=" + query + "&appid=" + theAppid + "&units=" + theUnit;

  https.get(url, function(response) {

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temperature = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<p>Today's weather in paris is " + weatherDescription + "<p>");
      res.write("<h1>The temperature in " + query + " is " + temperature + " degrees celcius.</h1>");
      res.write("<img src=" + imageURL + ">")
      res.send();
    });
  });

});





app.listen(3000, function() {
  console.log("server is running at port 3000");
});
