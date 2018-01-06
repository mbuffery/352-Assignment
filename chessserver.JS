const http = require('http');
const fs = require('fs')
const hostname = '127.0.0.1';
const port = 3000;
var express = require('express');
var app = express();
var socket = require("socket.io");

var server = app.listen(3000, function() {
  console.log("listening to requests on port 3000")
});
fs.readFile('Chesshtml.html', (err, html) => {
  if(err)
  {
    throw err;
  }
  const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.write(html);
    res.end();
  });

  server.listen(port, hostname, () => {
    console.log('Server started on port '+ port);
  });
});
//Static files
app.use(express.static('352-Assignment'));

//Socket Setup
var io = socket(server);

//When connection been made with client, load function
io.on('connection', function()
{
  console.log('made socket connection')
});
