'use strict';

let config = {
    server: {
        port: 8080
    },
    backend: {
        type: 'memory', // memory or mongodb
        url: 'mongodb://@kahana.mongohq.com:10018/XXXX?replicaSet=set-53864b40bbb1298b670024c8'
    },
    types: {
        directory: process.cwd() + '/services/types'
    },
    polling: {
        accuracy: 60 // seconds
    }
};

module.exports = config;