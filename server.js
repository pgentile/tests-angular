'usr strict';

var express = require('express');


var app = express()
  .use('/', express.static(__dirname + '/app'))
  .use('/static', express.static(__dirname + '/bower_components'))
  .listen(3000);
