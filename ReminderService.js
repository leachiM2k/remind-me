'use strict';
var ReminderDataService = require('./ReminderDataService');

class ReminderService {
	constructor(dataService, accuracyInSeconds) {
		this.dataService = dataService;
		
		setInterval(this._trigger.bind(this), accuracyInSeconds * 1000);
		this._trigger();
	}

	static factory() {
		var reminderDataService = ReminderDataService.factory('mongo');
		return new ReminderService(reminderDataService, 60);
	}

	_trigger() {
		this.dataService.getItemsFromPast().then(interestingJobs => {
			console.log('##### Found ' + interestingJobs.length + ' items to remind of.');
			interestingJobs.forEach(item => {
				console.log('##### TODO: Implement handling for items. Found item: ', item);
				this.del(item.id);
			});
		}).catch(function(error) {
			console.error('Trigger: Error occurred', error);
		});
	}

	list() {
		return this.dataService.getAll();
	}

	get(id) {
		return this.dataService.getById(id);
	}

	create(type, typeOptions, message, time) {
		var timeObj = new Date(time);
		if(timeObj < Date.now()) {
			throw new Error('Reminder time is before now.');
		}
		var promise = Promise.resolve();
		switch(type.toLowerCase()) {
			case 'mail':
			case 'email':
				var entry = {
					type: 'email',
					typeOptions: typeOptions,
					message: message,
					time: timeObj
				};
				promise = this.dataService.save(entry);
				break;
			default:
				throw new Error('Unsupported Type (email, mail allowed)');
		}
		return promise.then((newId) => {
			console.log('##### Added new reminder ' + newId);
			return {id: newId};
		});
	}

	update() {
		return false;
	}

	del(id) {
		return this.dataService.del(id);
	}
}

module.exports = ReminderService;
