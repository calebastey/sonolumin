'use strict';

const Partial = require('../models/Partial');
const md5 = require('md5');

exports.createPartial = function (req, res, next) {
    var sourceUrl = req.body.sourceUrl;
    var text = req.body.text;
    var reportedBy = req.body.reportedBy;

    if (!sourceUrl) {
        return res.status(422).send({error: "sourceUrl required"});
    }
    if (!text) {
        return res.status(422).send({error: "text required"});
    }
    if (!reportedBy) {
        return res.status(422).send({error: "reportedBy required"});
    }

    var foundPartial = findPartialByContent(sourceUrl, text, reportedBy);

    foundPartial.then(function(partial) {
        if (partial) {
            console.log("Found existing partial with ID ", partial._id);
            res.status(200).json({id: partial._id });
        } else {
            var newPartial = new Partial(
                {
                    url: sourceUrl,
                    urlMD5: md5(sourceUrl),
                    text: text,
                    date: new Date(),
                    reportedBy: reportedBy
                }
            );

            newPartial.save(function (err, p) {
                console.log("Creating new partial with ID " + newPartial._id);
                if (err) {
                    return next(err);
                }
                res.status(200).json({id: p._id });
                next();
            });
        }
    });

};

var findPartialByContent = function(url, text, reportedBy) {
    var md5url = md5(url);
    return Partial.findOne({ urlMD5: md5url, text: text, reportedBy: reportedBy }).exec();
};

exports.getPartial = function (req, res, next) {
    console.log("Finding partial with ID " + req.params.id);
    Partial.findOne({_id: req.params.id}, function (err, docs) {
        if (docs) {
            res.status(200).send(docs);
        } else {
            res.status(404).json({"message": "Unable to find partial with id " + req.params.id})
        }
    });

};