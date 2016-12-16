'use strict';
const Bottle = require('bottlejs');

const bottle = new Bottle();
bottle.factory('ReminderController', require('./ReminderController').factory);
bottle.factory('ReminderService', require('./ReminderService').factory);
module.exports = bottle;

/*
class FactoryRepository {
    constructor() {
        this.bottle = this.init();
    }

    init() {
        const bottle = new Bottle();
        bottle.factory('ReminderController', require('./ReminderController').factory);
        bottle.factory('ReminderService', require('./ReminderService').factory);
        return bottle;
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new FactoryRepository();
        }

        return this.instance;
    }
}

module.exports = FactoryRepository;
*/