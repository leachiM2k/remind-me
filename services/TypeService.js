'use strict';

var config = require('config');
var fs = require('fs');
var path = require('path');
var async = require('async');

class ReminderTypeService {
    constructor() {
        this.knownTypes = {};
        this._initModels();
    }

    static factory(container) {
        return new ReminderTypeService();
    }

    _initModels() {
        this.knownTypes = {};
        let dir = config.types.directory;
        async.waterfall([
            async.apply(fs.readdir, dir),
            (files, callback) => {
                let fileObj = {};
                files.forEach(file => fileObj[file] = file);
                async.mapValues(fileObj, (file, key, cb) => fs.lstat(path.join(dir, file), cb), callback)
            },
            (files, callback) => {
                Object.keys(files).forEach(file => {
                    if (files[file].isDirectory()) {
                        try {
                            this.knownTypes[file] = {
                                model: require(path.resolve(path.join(dir, file, 'model'))),
                                handler: require(path.resolve(path.join(dir, file, 'handler')))
                            }
                        } catch (err) {
                            console.error('Could not load type', err);
                        }
                    }
                });
                callback();
            }
        ], (err, results) => {
            if (err) {
                throw err;
            }
        });
    }

    list() {
        return Object.keys(this.knownTypes);
    }

    getModel(type) {
        return this.knownTypes[type] && this.knownTypes[type].model;
    }

    getHandler(type) {
        console.log('*************************** this.knownTypes', this.knownTypes);
        return this.knownTypes[type] && this.knownTypes[type].handler;
    }

}

module.exports = ReminderTypeService;