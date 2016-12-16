'use strict';

const ReminderDataMemoryConnector = require('./dataConnectors/memory');
const ReminderDataMongoConnector = require('./dataConnectors/mongo');

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
