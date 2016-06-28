var express = require('express');

var inst = express();

inst.get('/', function (req, res) {
  res.send("Hello World");
});

inst.listen(8080, function () {
   console.log("Falcore server started");
});

