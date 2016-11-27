require ('./TextReport.js');
var mongoose = require('mongoose'),
    TextReportSchema = require('mongoose').model('TextReport').schema;

var Schema = mongoose.Schema;

var UrlReportSchema = new Schema({
    urlMD5: String,
    url: String,
    createdAt: Date,
    textReports: [TextReportSchema]
});

module.exports = mongoose.model('UrlReport', UrlReportSchema);