'use strict';

var ReminderService = require('./ReminderService');

class ServerController {
	constructor(reminderService) {
		this.reminderService = reminderService;
	}

	static factory() {
		var reminderService = ReminderService.factory();
		return new ServerController(reminderService);
	}

	get(req, res, next) {
		var result = new Error();
		if(req.params.id) {
			result = this.reminderService.get(req.params.id) || 404;
		} else {
			result = this.reminderService.list();
		}
		res.send(result);
		next();
	}

	post(req, res, next) {
		var result = this.reminderService.create(
			req.params.type,
			req.params.typeOptions,
			req.params.message,
			req.params.time
		);
		res.send(201, result);
		next();	
	}

	del(req, res, next) {
		res.send(204);
		next();	
	}
}

module.exports = ServerController; 
