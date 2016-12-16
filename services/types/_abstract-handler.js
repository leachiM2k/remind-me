'use strict';

class AbstractHandler {
    process(callback) {
        callback(new Error('No processing method implemented'));
    }
}

module.exports = AbstractHandler;