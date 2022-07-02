const express=require('express');
const https=require('https');
const bodyParser=require('body-Parser');
const app = express();
app.use(bodyParser.urlencoded({ extended : true }));

app.get('/', function(req, res){
   res.sendFile(__dirname+"/index.html");
})

app.post('/check_whether', function(req, res){
   
    const city=req.body.cityname;

    const myurl="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=665674f871deab87bdb37e4b1004741d&units=metric";
https.get(myurl, function(responce){
    console.log(responce.statusCode);

    responce.on("data",function(data){
        var get=JSON.parse(data);
        var desp=get.weather[0].description;
        var temp=get.main.temp;
        var icon=get.weather[0].icon;
        var img= "http://openweathermap.org/img/wn/" + icon + "@2x.png"
        
        res.write("<h1>whether condition in " + city + " is " + desp + "</h1>");
        res.write("<h2>whether temperature in " + city + " is " + temp + "</h2>");
        res.write("<img src=" + img + " >")
        res.send();

    })

})
})


app.listen(3000,()=>{
    console.log('listening on port 3000');
})
