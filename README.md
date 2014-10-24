node-proxy-boilerplate
======================

Tired of writing a new proxy server every time you need to mock a new backend, or just need a web server for your project? Clone node-proxy-boilerplate, and you are ready to go!

## Usage

### Hosting of Yeoman apps
The following paths work if this server is placed in a folder parallell to the Yeoman app:

	/the-folder-with-my-yeomanapp
		/app
			/scripts
			/bower_components
	/node-proxy-boilerplate

#### Hosting of an unbuilt Yeoman app

	app.use(express.static(path.join(__dirname, '../the-folder-with-my-yeomanapp')));
	app.use(express.static(path.join(__dirname, '../the-folder-with-my-yeomanapp/app')));
	app.use(express.static(path.join(__dirname, '../.tmp')));

#### Hosting of a built Yeoman app

	app.use(express.static(path.join(__dirname, '../the-folder-with-my-yeomanapp/dist')));