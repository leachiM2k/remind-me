'use strict';

var config = require('config');

class ReminderTriggerService {
    constructor(dataService, typeService) {
        this.dataService = dataService;
        this.typeService = typeService;
    }

    static factory(container) {
        var dataService = container.ReminderDataService;
        var typeService = container.ReminderTypeService;
        return new ReminderTriggerService(dataService, typeService);
    }

    findAndProcess() {
        this.dataService.getItemsFromPast().then(interestingJobs => {
            console.log('##### Found ' + interestingJobs.length + ' items to remind of.');
            interestingJobs.forEach(item => {
                try {
                    var typeHandler = this.typeService.getHandler(item.type);
                    if (!typeHandler) {
                        throw new Error('Unsupported Type ' + item.type + '. Known types: ' + this.typeService.list().join(', '));
                    }
                    var handler = new typeHandler(item);
                    handler.process((err, result) => {
                        if (err) {
                            throw  err;
                        }
                    });
                } catch (err) {
                    this.dataService.del(item.id);
                    throw err;
                }
            });
        }).catch(function (error) {
            console.error('Trigger: Error occurred', error);
        });
    }

    startPolling() {
        setInterval(this.findAndProcess.bind(this), config.polling.accuracy * 1000);
        this.findAndProcess();
    }
}

module.exports = ReminderTriggerService;