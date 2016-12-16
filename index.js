'use strict';

var config = require('config');
var restify = require('restify');
var repository = require('./FactoryRepository');

var server = restify.createServer();
server.use(restify.bodyParser());

[
    repository.container.ReminderController
].forEach(controller => {
    controller.routes().forEach(route => server[route.method.toLowerCase()].call(server, route.path, route.handler));
});

server.listen(config.server.port, function () {
    console.log('%s listening at %s', server.name, server.url);
});


