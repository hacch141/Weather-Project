const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiId = "68d486e7a27b08b2701d099f742489a5";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+ apiId + "&units=" + unit;
    https.get(url, function(response){
        console.log(response);
        response.on("data", function(data){
        //     console.log(data);  
        const weatherData = JSON.parse(data);
        console.log(weatherData);
        var temp = weatherData.main.temp;
        var weatherDesc = weatherData.weather[0].description;
        var weatherIcon = weatherData.weather[0].icon;
        var imageUrl = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
        res.write("<p>The Weather is currently " + weatherDesc +"</p>"); 
        res.write("<h1>The temperature in " + query + " is : " + temp + " Degree Celcius.</h1>"); 
        res.write("<img src = " + imageUrl + ">");
        res.send();
        })
    });
})

app.listen(3000, function(){
    console.log("Your weather app is successfully running on port 3000.");
})