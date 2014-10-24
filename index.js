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

// ****** Hosting of Yeoman apps ******
// The following paths work if this server is placed in a folder parallell to the Yeoman app:
// - the-folder-with-my-yeomanapp
//              - app
//                      - scripts
//              - bower_components
// - node-proxy-boilerplate

// ****** Hosting of an unbuilt Yeoman app. ******
// app.use(express.static(path.join(__dirname, '../the-folder-with-my-yeomanapp')));
// app.use(express.static(path.join(__dirname, '../the-folder-with-my-yeomanapp/app')));
// app.use(express.static(path.join(__dirname, '../.tmp')));

// ****** Hosting of a built Yeoman app ******
// app.use(express.static(path.join(__dirname, '../the-folder-with-my-yeomanapp/dist')));

// Proxy request to backend
app.use('/api', routes.api(app.get('backendUrl')));
app.use('/hardcoded', routes.hardcoded);

// Start server
app.listen(app.get('port'), function () {
    console.log('node-proxy listening on port %s'.cyan, app.get('port'));
});