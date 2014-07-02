'usr strict';

var express = require('express');


var app = express();

// Servir l'appli
app.use('/', express.static(__dirname + '/app'));

// Servir les composants utilisés
app.use('/static', express.static(__dirname + '/bower_components'));

app.listen(3000);
