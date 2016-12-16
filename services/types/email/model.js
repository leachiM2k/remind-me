'use strict';

class EMailModel {
    constructor(payload) {
        this.type = 'email';
        payload.typeOptions = payload.typeOptions || {};
        this.data = {
            to: payload.typeOptions.to,
            subject: payload.typeOptions.subject || 'Reminder'
        };
        this.message = payload.message;
        this.time = new Date(payload.time);
    }
}

module.exports = EMailModel;