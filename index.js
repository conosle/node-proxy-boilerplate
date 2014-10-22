'use strict';

require('colors');
var path = require('path');
var morgan = require('morgan');
var express = require('express');

var app = express();

// Routes
var routes = {
    api: require('./routes/api'),
    hardcoded: require('./routes/hardcoded')
};

// Application Settings
app.set('port', 4000);
app.set('backendUrl', 'http://localhost:3000');

// Middlewares
app.use(morgan('[:status] :method :url (:response-time ms)'));
app.use(express.static(path.join(__dirname, 'static')));

// Proxy request to backend
app.use('/api', routes.api(app.get('backendUrl')));
app.use('/hardcoded', routes.hardcoded);

// Start server
app.listen(app.get('port'), function () {
    console.log('node-proxy listening on port %s'.cyan, app.get('port'));
});