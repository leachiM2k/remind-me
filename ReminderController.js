'use strict';

var ReminderService = require('./ReminderService');

class ServerController {
	constructor(reminderService) {
		this.reminderService = reminderService;
	}

	static factory(container) {
		return new ServerController(container.ReminderService);
	}


    routes() {
        return [
            { method: 'get', path: '/', handler: this.get.bind(this) },
            { method: 'get', path: '/:id', handler: this.get.bind(this) },
            { method: 'post', path: '/', handler: this.post.bind(this) },
            { method: 'del', path: '/:id', handler: this.del.bind(this) }
        ];
    }

	get(req, res, next) {
		var promise;
		if(req.params.id) {
			promise = this.reminderService.get(req.params.id)
				.then(result => result || 404 );
		} else {
			promise = this.reminderService.list();
		}
		promise.then(result => {
			res.send(result);
		}).then(next, next);
	}

	post(req, res, next) {
		this.reminderService.create(
			req.params.type,
			req.params.typeOptions,
			req.params.message,
			req.params.time
		).then(result => {
			res.send(201, result);
		}).then(next, next);
	}

	del(req, res, next) {
		this.reminderService.del(req.params.id)
		.then(result => {
			res.send(result ? 204 : 404);
		}).then(next, next);
	}
}

module.exports = ServerController; 
