'use strict';

var restify = require('restify');

var ServerController = require('./ReminderController');
var controller = ServerController.factory();

var server = restify.createServer();
server.use(restify.bodyParser());

server.get('/', controller.get.bind(controller));
server.get('/:id', controller.get.bind(controller));
server.post('/', controller.post.bind(controller));
server.del('/', controller.del.bind(controller));

server.listen(8080, function() {
	  console.log('%s listening at %s', server.name, server.url);
});


