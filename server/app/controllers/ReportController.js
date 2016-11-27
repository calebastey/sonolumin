'use strict';

const UrlReport = require('../models/UrlReport');
const TextReport = require('../models/TextReport');
const md5 = require('md5');

exports.createReport = function (req, res, next) {
    console.log(req.body);

    if (!req.body.sourceUrl) {
        return res.status(422).send({ error: "sourceUrl required"});
    }
    if (!req.body.text) {
        return res.status(422).send({ error: "text required"});
    }
    if (!req.body.conflictingUrl) {
        return res.status(422).send({ error: "conflictingUrl required"});
    }
    if (!req.body.reportedBy) {
        return res.status(422).send({ error: "reportedBy required"});
    }

    var docsPromise = getReportByMD5(md5(req.body.sourceUrl));
    docsPromise.then(function (docs) {
        if (!docs) {
            console.log("Creating new URL report");
            var urlReport = new UrlReport(
                {
                    url: req.body.sourceUrl,
                    urlMD5: md5(req.body.sourceUrl),
                    createdAt: new Date(),
                    textReports: [
                        {
                            conflictingUrl: req.body.conflictingUrl,
                            conflictingUrlMD5: md5(req.body.conflictingUrl),
                            reportedBy: req.body.reportedBy,
                            text: req.body.text,
                            createdAt: new Date()
                        }
                    ]
                }
            );

            urlReport.save(function (err, user) {
                if (err) {
                    return next(err);
                }

                res.status(200).json({message: "Report saved"});
                next();
            })

        } else {
            console.log("URL Report Found - Pushing new text report");
            docs.textReports.push({
                conflictingUrl: req.body.conflictingUrl,
                reportedBy: req.body.reportedBy,
                text: req.body.text,
                createdAt: new Date()
            });
            docs.save(function (err, user) {
                if (err) {
                    return next(err);
                }

                res.status(200).json({message: "Report saved"});
                next();
            })
        }
    })
};

exports.getAllReports = function(req, res, next) {
    console.log("returning all reports");
    UrlReport.find({}, function(err, docs) {
        res.status(200).send(docs);
    });
};

// Returns a promise
var getReportByMD5 = function(urlMD5) {
    console.log("Searching for url with ID: " + urlMD5);
    return UrlReport.findOne({'urlMD5': urlMD5}).exec();
};

exports.getReport = function(req, res, next) {
    var docsPromise = getReportByMD5(req.params.id);

    docsPromise.then(function(docs) {
        if (docs) {
            res.status(200).send(docs);
        } else {
            res.status(404).json({"message": "Unable to find report with id " + req.params.id})
        }
    });
};