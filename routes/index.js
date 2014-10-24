'use strict';

var app = require('express').Router();

// Routes
var routes = {
    api: require('./api'),
    hardcoded: require('./hardcoded')
};

module.exports = function (backendUrl) {
    app.use('/api', routes.api(backendUrl));
    app.use('/hardcoded', routes.hardcoded);

    return app;
}