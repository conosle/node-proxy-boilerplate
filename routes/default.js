'use strict';

var express = require('express');
var router = express.Router();

router.get('/default.txt', function (req, res) {
    res.type('text/plain');
    res.end('Default router');
});

module.exports = function (app) {
    return router;
};