var express = require("express");
var app = express();
var http = require('http').Server(app);
var fs = require('fs');

// let http = require('http')
let counter = 0;
// http.createServer(handlerCallBack).listen(8099, function(){
//     console.log('listening on *:8099');
// });

// function handlerCallBack (request,response) {
//     retrieveJSON () //'{"x":22,"Y":3,"z":15}'    
// }   
    
// function retrieveJSON () {
//     var fs = require('fs');

//     return fs.readFile('responseFile.json', function (err, data) { //readFile - асинхронно
//         console.log('start reading');
//         if (err){
//             console.log(err.stack);
//             return;
//         }
//         console.log('File read');   
//         response.setHeader("Access-Control-Allow-Origin", '*');    
//         response.writeHead(200, {'Content-Type': 'application/json'}); // обработать коды 400 500 и т.п.
//         console.log('Response to end '+ ++counter);
//         response.end(data);
//     })        
// }
app.use(express.static(__dirname + "/public"));

app.get('/allData', function(req, res){    
    res.setHeader("Access-Control-Allow-Origin", '*');
    
    return fs.readFile('responseFile.json', function (err, data) {
        console.log('start reading');
        if (err){
            console.log(err.stack);
            return;
        }
        else {
            console.log('File read');
            //res.writeHead(200, {'Content-Type': 'application/json'});
            let dataObj = JSON.parse(data);
            res.send(JSON.stringify(dataObj));
        }   
         // обработать коды 400 500 и т.п.
        console.log('Response to end '+ ++counter);
        
    })        
});

app.get('/tradingSessions', function(req, res){    
    res.setHeader("Access-Control-Allow-Origin", '*');
    
    return fs.readFile('responseFile.json', function (err, data) { //readFile - асинхронно
        console.log('start reading');
        if (err){
            console.log(err.stack);
            return;
        }
        else {
            console.log('File read');
            //res.writeHead(200, {'Content-Type': 'application/json'});
            let dataObj = JSON.parse(data);
            res.send(JSON.stringify(dataObj.content.tradingSessions));
        }   
         // обработать коды 400 500 и т.п.
        console.log('Response to end '+ ++counter);
        
    })        
});

app.get('/securitySettings', function(req, res){    
    res.setHeader("Access-Control-Allow-Origin", '*');
    
    return fs.readFile('responseFile.json', function (err, data) {
        console.log('start reading');
        if (err){
            console.log(err.stack);
            return;
        }
        else {
            console.log('File read');
            //res.writeHead(200, {'Content-Type': 'application/json'});
            let dataObj = JSON.parse(data);
            res.send(JSON.stringify(dataObj.content.securitySettings));
        }   
         // обработать коды 400 500 и т.п.
        console.log('Response to end '+ ++counter);
        
    })        
});

app.get('/btnWithNewFields', function(req, res){    
    res.setHeader("Access-Control-Allow-Origin", '*');
    
    return fs.readFile('responseFile.json', function (err, data) {
        console.log('start reading');
        if (err){
            console.log(err.stack);
            return;
        }
        else {
            console.log('File read');
            //res.writeHead(200, {'Content-Type': 'application/json'});
            let dataObj = JSON.parse(data);
            //console.log(data)
            res.send(JSON.stringify(dataObj.content.securitySettings));
        }   
         // обработать коды 400 500 и т.п.
        console.log('Response to end '+ ++counter);
        
    })        
});

http.listen(8099, function(){
  console.log('listening on *:8099');
});

console.log('Server code end');