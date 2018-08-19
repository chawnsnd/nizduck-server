var express = require('express');
var db = require('../models/db');
require('../models/board');
var Board = db.model('Board');
var router = express.Router();

//보드 리스트
router.get('/:artist', (req, res, next) => {
    var artistId = req.params.artist;
    Board.find({$and: [{artist: artistId}, {status: 'PUBLIC'}]})
    .lean()
    .exec((err, list) => {
        if(err) return console.log("에러발생");
        res.json(list)
    })
    .catch(err => {
        next(err)
    })

});