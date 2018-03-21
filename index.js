var http = require('http');
var fs = require('fs');
var extract = require('./extract');
var mime = require('mime');
var wss = require('./websockets-server');
var handleError = function(err, res, filePath) {
  res.writeHead(404);
  fs.readFile(filePath, function(err, data) {
    if (err) {
      res.end("<h1>404 File not found</h1>");
    }
    res.end(data);
  });
};
var server = http.createServer(function(req, res) {
  console.log('responging request');
  var filePath = extract(req.url);
  console.log(req.url + "hii");
  fs.readFile(filePath, function(err, data) {

    if (err) {
      filePath = extract("/error.html");
      handleError(err, res, filePath);
      return;
    } else {
      res.setHeader('Content-Type', mime.getType(filePath));
      res.end(data);
    }
  });
});
server.listen(3000);
