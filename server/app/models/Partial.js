var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PartialSchema = new Schema({
    urlMD5: String,
    url: String,
    text: String,
    date: Date,
    reportedBy: String
});

module.exports = mongoose.model('Partial', PartialSchema);
