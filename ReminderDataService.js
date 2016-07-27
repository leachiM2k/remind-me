'use strict';

const ReminderDataMemoryConnector = require('./ReminderDataMemoryConnector');
const ReminderDataMongoConnector = require('./ReminderDataMongoConnector');

class ReminderDataService {
	static factory(connector) {
		if(connector) {
			switch(connector.toLowerCase()) {
				case 'memory':
					return ReminderDataMemoryConnector.factory();
					break;
				case 'mongo':
					return ReminderDataMongoConnector.factory();
					break;
			}
		}
		throw new Error('unknown connector');
	}
}

module.exports = ReminderDataService;
