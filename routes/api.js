'use strict';

var express = require('express');
var proxy = require('http-proxy-nocrash');

var router = express.Router();

module.exports = function (app) {
    var backendUrl = app.get('backendUrl');

    router.get('/users/:id', function (req, res) {
        res.type('text/plain');
        res.send('Get user with ID: ' + req.params.id);
    });

    router.get('/*', function (req, res) {
        // Relative path for the target
        req.url = '/';

        console.log('Sending request to: %s%s'.blue, backendUrl, req.url);

        proxy.web(req, res, { target: backendUrl });
    });

    return router;
};