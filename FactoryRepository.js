'use strict';
var config = require('config');
const Bottle = require('bottlejs');

const bottle = new Bottle();
bottle.factory('ReminderController', require('./ReminderController').factory);
bottle.factory('ReminderService', require('./ReminderService').factory);
bottle.factory('ReminderTypeService', require('./services/TypeService').factory);
bottle.factory('ReminderTriggerService', require('./services/TriggerService').factory);
bottle.provider('ReminderDataService', function() {
    this.$get = function(container) {
        return require('./services/DataService').factory(config.backend.type);
    };
});

module.exports = bottle;
