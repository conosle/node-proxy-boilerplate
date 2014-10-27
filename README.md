node-proxy-boilerplate
======================

Tired of writing a new proxy server every time you need to mock a new backend, or just need a web server for your project? Clone node-proxy-boilerplate, and you are ready to go!

## Usage

All routes are based on the naming of the js files in the routes folder.

### Examples

#### Replacing a root URL

If you need to replace something directly under / (like /default.txt for example) you need to add that to *routes/default.js*, and then just enter your relative path.

```javascript
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
```

#### Replacing a nested URL

It's common to have the REST API in a URL like */api/users/3*. If you have a URL like that, but need to replace the last part (id), while the other requests are sent to your original backend, you need to do that in */routes/api.js*.

```javascript
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
```

#### Hosting of Yeoman apps
The following paths work if this server is placed in a folder parallell to the Yeoman app:

	/the-folder-with-my-yeomanapp
		/app
			/scripts
			/bower_components
	/node-proxy-boilerplate

##### Hosting of an unbuilt Yeoman app

```javascript
app.use(express.static(path.join(__dirname, '../the-folder-with-my-yeomanapp')));
app.use(express.static(path.join(__dirname, '../the-folder-with-my-yeomanapp/app')));
app.use(express.static(path.join(__dirname, '../.tmp')));
```

##### Hosting of a built Yeoman app

```javascript
app.use(express.static(path.join(__dirname, '../the-folder-with-my-yeomanapp/dist')));
```