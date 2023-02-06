//jshint esversion:6

const express = require("express");
const https = require('https');
const bodyParser = require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/",function(req,res){
   

    const query= req.body.cityName;
    const apiKey= "f8c00ebecebb87dbfe7d67fe366cbfe9";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+apiKey+"&units="+unit;
    
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const WeatherData = JSON.parse(data); //for a full sized data
            const temp = WeatherData.main.temp
            const Wdescription = WeatherData.weather[0].description
            const icon =  WeatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/"+ icon + "@2x.png"
            res.write( "<p>The weather is currently " + Wdescription +"<p>");
            res.write("<h1>The temparature in "+ query +" is "+temp+" degrees celcius.</h1>");
            res.write("<img src = "+ imageURL + ">");
            res.send()
            // console.log(temp);
            // console.log(Wdescription);
            //JSON.stringify(data); --> for one line data
        })
    })
    // res.send("server is up and running.")
    

})
app.listen(process.env.PORT || 3000,function(){
    console.log("server is running on port 3000."); 
})


 // console.log("post request received."); 
    // console.log("req.body.cityName"); 
