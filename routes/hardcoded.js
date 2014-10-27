﻿'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.json({ a: 'value' });
});

module.exports = function (app) {
    return router;
};