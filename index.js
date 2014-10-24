'use strict';

require('colors');
var fs = require('fs');
var path = require('path');
var morgan = require('morgan');
var express = require('express');

var app = express();

// Application Settings
app.set('port', 4000);
app.set('backendUrl', 'http://localhost:3000');

// Middlewares
app.use(morgan('[:status] :method :url (:response-time ms)'));

// Host static information
app.use(express.static(path.join(__dirname, 'static')));

// Get all routes and add them to the router
fs.readdirSync(path.join(__dirname, './routes'))
    .forEach(function (file) {
        if (path.extname(file) === '.js') {
            var filename = path.basename(file, '.js');
            var asyncRequire = require('./routes/' + filename);
            app.use('/' + filename, asyncRequire(app));
        }
    });

// Start server
app.listen(app.get('port'), function () {
    console.log('node-proxy listening on port %s'.cyan, app.get('port'));
});