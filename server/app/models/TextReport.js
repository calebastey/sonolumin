var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TextReportSchema = new Schema({
    text: String,
    createdAt: Date,
    reportedBy: String,
    conflictingUrl: String,
    conflictingUrlMD5: String
});

module.exports = mongoose.model('TextReport', TextReportSchema);