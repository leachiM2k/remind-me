'use strict';

var AbstractHandler = require('../_abstract-handler');

class EMailHandler extends AbstractHandler {
    constructor(item) {
        super();
        this.item = item;
        this.type = 'email';
    }

    process(callback) {
        console.log('TODO: Define handling for ', this.item);
        callback();
    }
}

module.exports = EMailHandler;