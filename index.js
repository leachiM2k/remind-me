'use strict';

var config = require('config');
var restify = require('restify');
var bunyan = require('bunyan');
var logger = bunyan.createLogger({ name: 'remind-me' });
var repository = require('./FactoryRepository');

var server = restify.createServer({
    log: logger
});
server.use(restify.bodyParser());
server.use(restify.requestLogger());
server.use(restify.gzipResponse());
server.use(restify.queryParser());

[
    repository.container.ReminderController
].forEach(controller => {
    controller.routes().forEach(route => server[route.method.toLowerCase()].call(server, route.path, route.handler));
});

server.listen(config.server.port, function () {
    logger.info('%s listening at %s', server.name, server.url);
});
server.on('after', restify.auditLogger({ log: logger }));