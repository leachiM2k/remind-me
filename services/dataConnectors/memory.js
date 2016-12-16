'use strict';

class ReminderDataMemoryConnector {
	constructor() {
		this.data = [];
	}

	static factory() {
		return new ReminderDataMemoryConnector();
	}

	getItemsFromPast() {
		var now = Date.now();
		return Promise.resolve(this.data.filter(item => item.time.getTime() <= now));
	}

	getAll() {
		return Promise.resolve(this.data);
	}

	getById(id) {
		id = Number(id);
		return Promise.resolve(this.data
			.filter(item => item.id === id)
			.reduce((prev, curr) => curr, false));
	}

	del(id) {
		id = Number(id);
		var foundIndex = this.data.findIndex(item => item.id === id);
		if(foundIndex !== -1) {
			this.data.splice(foundIndex, 1);
			return Promise.resolve(true);
		}
		return Promise.resolve(false);
	}

	save(entry) {
		entry.id = entry.id || Math.floor(Math.random() * 1e12);
		this.data.push(entry);
		return Promise.resolve(entry.id);
	}
}

module.exports = ReminderDataMemoryConnector;
