var mongoose = require('mongoose');
var schema = mongoose.Schema;
var eventSchema = {};
var eventModel;
var organizerModel;
mongoose.set('debug', true);

var database = {
    connect: function () {
        mongoose.connect('mongodb://localhost:27017/eventsDB', function (err) {
            if (err == null) {
                console.log("Connected to Mongo DB");
                //initialize values
                eventSchema = schema({
                    name: String,
                    description: String,
                    start: {
                        date: String,
                        time: String
                    },
                    end: {
                        date: String,
                        time: String
                    }
                }
                    //Add in to options to disable the version key in MongoBD
                    //,{versionKey: false}
                );

                //Schema for Organizers
                organizerSchema = schema({
                    name: String,
                    username: String,
                    company: String,
                    password: String
                });

                var connection = mongoose.connection;
                eventModel = connection.model('event', eventSchema);

                //Model for Organizer
                organizerModel = connection.model('organizer', organizerSchema);
            } else {
                console.log("Error connecting to Mongo DB: " + err);
            }
        });
    },

    addEvent: function (n, d, sd, st, ed, et, callback) {

        var newEvent = new eventModel({
            name: n,
            description: d,
            start: {
                date: sd,
                time: st
            },
            end: {
                date: ed,
                time: et
            }
        });
        newEvent.save(callback);
    },

    //Code to add new organizer to MongoDB
    addOrganizer: function (organizer, callback) {

        var newOrganizer = new organizerModel(organizer);
        newOrganizer.save(callback);
    },

    getAllEvents: function (callback) {
        eventModel.find({}, callback);
    },

    //Code to get all organizers from MongoDB
    getAllOrganizers: function (callback) {
        organizerModel.find({}, callback);
    },

    getEvent: function (id, callback) {
        eventModel.findById(id, callback);
    },

    updateEvent: function (id, n, d, sd, st, ed, et, callback) {
        var updatedEvent = {
            name: n,
            description: d,
            start: {
                date: sd,
                time: st
            },
            end: {
                date: ed,
                time: et
            }
        };
        eventModel.findByIdAndUpdate(id, updatedEvent, callback);
    },

    deleteEvent: function (id, callback) {
        eventModel.findByIdAndDelete(id, callback);
    }


};

module.exports = database;