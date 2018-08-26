var express = require('express');
var db = require('../models/db');
require('../models/board');
var Board = db.model('Board');
var router = express.Router();

//글 등록
router.post('/', (req, res, next) => {
	if(!req.body.password) return res.json({success: false, message: '`password`는 필수 파라미터 입니다.'});
    if(!req.body.title) return res.json({success: false, message: '`title`는 필수 파라미터 입니다.'});
    if(!req.body.content) return res.json({success: false, message: '`content`는 필수 파라미터 입니다.'});

    var newBoard = new Board({
        title: req.body.title,
        author: req.body.author,
        anonymous: req.body.anonymous,
        content: req.body.content,
        artist: req.body.artist,
        password: req.body.password,
        status: 'GENERAL'
    });
    newBoard.save(err => {
        if(err) return res.json({success: false, messagage: '게시글 등록에 문제가 발생했습니다.'});
        return res.json({success: true, message: '게시글 등록이 성공했습니다.'});
    })
})

//글검색
router.get('/:artist/:bno', (req, res, next) => {
    var artist = req.params.artist;
    var _id = req.params.bno;
    Board.findOne({$and: [{artist: artist}, {_id: _id}, {status: 'GENERAL'}]}, (err, item) => {
        if(err) return res.json({success: false, message: '아티스트 조회에 문제가 발생했습니다.'});
        res.json({success: true, item: item})
    })
})

//보드 리스트
router.get('/:artist', (req, res, next) => {
    var artist = req.params.artist;
    Board.find({$and: [{artist: artist}, {status: 'GENERAL'}]})
    .lean()
    .exec((err, list) => {
        console.log(list)
        if(err) return res.json({success: false, message: '보드 리스트 검색이 실패했습니다.'});
        res.json({success: true, list: list})
    })
})

module.exports = router;