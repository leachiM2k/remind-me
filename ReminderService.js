'use strict';
class ReminderService {
    constructor(dataService, typeService, triggerService) {
        this.dataService = dataService;
        this.typeService = typeService;
        this.triggerService = triggerService;
        this.triggerService.startPolling();
    }

    static factory(container) {
        var dataService = container.ReminderDataService;
        var typeService = container.ReminderTypeService;
        var triggerService = container.ReminderTriggerService;
        return new ReminderService(dataService, typeService, triggerService);
    }

    list() {
        return this.dataService.getAll();
    }

    get(id) {
        return this.dataService.getById(id);
    }

    create(type, payload, time) {
        var timeObj = new Date(time);
        if (timeObj < Date.now()) {
            throw new Error('Reminder time is before now.');
        }
        if (isNaN(timeObj)) {
            throw new Error('Reminder time is not specified or invalid.');
        }

        var typeModel = this.typeService.getModel(type);
        if (!typeModel) {
            throw new Error('Unsupported Type (' + this.typeService.list().join(', ') + ')');
        }

        var model = new typeModel(payload);
        return this.dataService.save(model).then((newId) => {
            console.log('##### Added new reminder ' + newId);
            return { id: newId };
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
