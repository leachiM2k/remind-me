'use strict';

var config = require('config');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

class ReminderDataMongoConnector {
    /**
     *
     * @param url - Connection URL
     */
    constructor(url) {
        this.url = url;
    }

    static factory() {
        return new ReminderDataMongoConnector(config.backend.url);
    }

    _getDB() {
        if (this.db) {
            return Promise.resolve(this.db);
        }
        return MongoClient.connect(this.url).then(db => {
            logger.info("MongoDB: Connected correctly to server");
            this.db = db;
            return db;
        }).catch(err => {
            console.error('Could not connect to DB', err);
            throw new Error('Could not connect to DB');
        });
    }

    getItemsFromPast() {
        var now = Date.now();
        return this._getDB().then(db => {
            return db.collection('remind')
                .find({ time: { $gte: now } })
                .toArray();
        });
    }

    getAll() {
        return this._getDB().then(db => {
            return db.collection('remind')
                .find()
                .toArray();
        });
    }

    getById(id) {
        id = Number(id);
        return this._getDB().then(db => {
            return db.collection('remind').findOne({ id: id });
        });
    }

    del(id) {
        id = Number(id);
        return this._getDB().then(db => {
            return db.collection('remind').deleteOne({ id: id });
        }).then((deleteResult) => {
            return deleteResult.deletedCount !== 0;
        });
    }

    save(entry) {
        entry.id = entry.id || Math.floor(Math.random() * 1e12);
        return this._getDB().then(db => {
            return db.collection('remind').insertOne(entry);
        }).then(() => { return entry.id });
    }
}

module.exports = ReminderDataMongoConnector;
