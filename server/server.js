var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    reportController = require('./app/controllers/ReportController.js'),
    partialController = require('./app/controllers/PartialController.js');

mongoose.Promise = require('bluebird');

var app = express();
var port = process.env.PORT || 3000;

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

mongoose.connect('mongodb://localhost/sonolumin');

app.use('/api', router);
router.post('/report', reportController.createReport);
router.get('/reports', reportController.getAllReports);
router.get('/reports/:id', reportController.getReport);
router.post('/partial', partialController.createPartial);
router.get('/partial/:id', partialController.getPartial);

app.listen(port, function() {
    console.log('listening on 3000')
});