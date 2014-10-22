'use strict';

var express = require('express');
var proxy = require('http-proxy-nocrash');

var router = express.Router();

router.get('/', function (req, res) {
    res.json({ a: 'value' });
});

module.exports = router;