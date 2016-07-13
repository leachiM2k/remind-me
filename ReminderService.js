'use strict';
var ReminderDataService = require('./ReminderDataService');

class ReminderService {
	constructor(dataService, accuracyInSeconds) {
		this.dataService = dataService;
		
		setInterval(this._trigger.bind(this), accuracyInSeconds * 1000);
		this._trigger();
	}

	static factory() {
		var reminderDataService = ReminderDataService.factory();
		return new ReminderService(reminderDataService, 60);
	}

	_trigger() {
		var interestingJobs = this.dataService.getItemsFromPast();
		console.log('##### Found ' + interestingJobs.length + ' items to remind of.');
		interestingJobs.forEach(item => {
			console.log('##### TODO: Implement handling for items. Found item: ', item);
			this.del(item.id);
		});
	}

	list() {
		return this.dataService.getAll();
	}

	get(id) {
		return this.dataService.getById(id);
	}

	create(type, typeOptions, message, time) {
		var newId;
		switch(type.toLowerCase()) {
			case 'mail':
			case 'email':
				var entry = {
					type: 'email',
					typeOptions: typeOptions,
					message: message,
					time: new Date(time)
				};
				newId = this.dataService.save(entry);
				break;
			default:
				throw new Error('Unsupported Type (email, mail allowed)');
		}
		return {id: newId};
	}

	update() {
		return false;
	}

	del(id) {
		return this.dataService.del(id);
	}
}

module.exports = ReminderService;
