'use strict';

require('colors');
var path = require('path');
var morgan = require('morgan');
var express = require('express');
var routes = require('./routes/index.js');

var app = express();

// Application Settings
app.set('port', 4000);
app.set('backendUrl', 'http://localhost:3000');

// Middlewares
app.use(morgan('[:status] :method :url (:response-time ms)'));

// Host static information
app.use(express.static(path.join(__dirname, 'static')));

// Proxy request to backend
app.use('/', routes(app.get('backendUrl')));

// Start server
app.listen(app.get('port'), function () {
    console.log('node-proxy listening on port %s'.cyan, app.get('port'));
});