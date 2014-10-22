'use strict';

var express = require('express');
var proxy = require('http-proxy-nocrash');

var router = express.Router();

module.exports = function (backendUrl) {

    router.get('/', function (req, res) {
        // Relative path for the target
        req.url = '/';

        console.log('Sending request to: %s%s'.blue, backendUrl, req.url);

        proxy.web(req, res, { target: backendUrl });
    });

    return router;
};