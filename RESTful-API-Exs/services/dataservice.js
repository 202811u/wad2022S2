var mongoose = require('mongoose');
var schema = mongoose.Schema;
var moduleSchema = {};
var timetableSchema = {};
var tutorSchema = {};
var moduleModel, timetableModel, tutorModel;

var database = {
    connect: function () {
        mongoose.connect('mongodb://localhost:27017/RESTExercises2', function (err) {
            if (err == null) {
                console.log("Connected to Mongo DB");
                //initialize values
                moduleSchema = schema({
                    code: String,
                    name: String,
                });

                timetableSchema = schema({
                    day: String,
                    start: String,
                    end: String,
                    m: {
                        type: schema.Types.ObjectId,
                        ref:'modules'
                    },
                    tutor: {
                        type: schema.Types.ObjectId,
                        ref:'tutors'
                    }
                });

                tutorSchema = schema({
                    name: String,
                    office: String
                });

                var connection = mongoose.connection;
                moduleModel = connection.model('modules', moduleSchema);
                timetableModel = connection.model('timetables', timetableSchema);
                tutorModel = connection.model('tutors', tutorSchema);

            } else {
                console.log("Error connecting to Mongo DB");
            }
        })
    },
    addTimetable: function (d, s, e, mid, tid, callback) {
        var newTimetable = new timetableModel({
            day: d,
            start: s,
            end: e,
            m: mid,
            tutor:  tid
        });
        newTimetable.save(callback);
    },
    getTimetables: function (callback) {
        timetableModel.find({}).populate('m', ['code','name']).populate('tutor', ['name','office']).exec(callback);
    },
    getTimetablesOfTutor: function (tid, callback) {
        timetableModel.find({tutor: tid}).populate('m', 'code').exec(callback);
    },
    getTimetable: function (id, callback) {
        timetableModel.findById(id).populate('m').populate('tutor').exec(callback);
    },
};

module.exports = database;