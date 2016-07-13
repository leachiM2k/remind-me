'use strict';

class ReminderDataService {
	constructor() {
		this.data = [];
	}

	static factory() {
		return new ReminderDataService();
	}

	getItemsFromPast() {
		var now = Date.now();
		return this.data.filter(item => item.time.getTime() <= now);
	}

	getAll() {
		return this.data;
	}

	getById() {
		id = Number(id);
		return this.data
			.filter(item => item.id === id)
			.reduce((prev, curr) => curr, false);		
	}

	del(id) {
		id = Number(id);
		var foundIndex = this.data.findIndex(item => item.id === id);
		if(foundIndex !== -1) {
			this.data.splice(foundIndex, 1);
			return true;
		}
		return false;
	}

	save(entry) {
		entry.id = entry.id || Math.floor(Math.random() * 1e12);
		this.data.push(entry);
		return entry.id;
	}
}

module.exports = ReminderDataService;
