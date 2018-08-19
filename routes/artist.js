var express = require('express');
var db = require('../models/db');
require('../models/artist');
var Artist = db.model('Artist');
var router = express.Router();

//아티스트 등록
router.post('/', (req, res, next) => {
    if(!req.body.ko_name) return res.json({success: false, message: '`ko_name`는 필수 파라미터 입니다.'});
	if(!req.body.en_name) return res.json({success: false, message: '`en_name`는 필수 파라미터 입니다.'});
    if(!req.body.kind) return res.json({success: false, messagage: '`kind`는 필수 파라미터 입니다.'});

    var newArtist = new Artist({
        ko_name: req.body.ko_name,
        en_name: req.body.en_name,
        profile_image: req.body.profile_image,
        main_image: req.body.main_image,
        kind: req.body.kind,
        status: 'GENERAL',
        status_message: req.body.status_message
    });
    newArtist.save(err => {
        if(err) return res.json({success: false, messagage: '아티스트 등록에 문제가 발생했습니다.'});
        return res.json({success: true, message: '아티스트 등록이 성공했습니다.'});
    })
})

//아티스트 리스트
router.get('/list', (req, res, next) => {
    var query = {};
    query.kind = req.query.kind;
    query.ko_name = req.query.search
    Artist.find({$and: [query, {status: 'GENERAL'}]})
    .lean()
    .exec((err, artists)=>{
        if(err) return res.json({success: false, messagage: '아티스트 조회에 문제가 발생했습니다.'});
        res.json({success: true, list: artists})
    })
})

//아티스트 정보가져오기
router.get('/:artist', (req, res, next) => {
    var en_name = req.params.artist;
    Artist.findOne({en_name: en_name})
    .exec((err, artist) => {
        if(err) return res.json({success: false, messagage: '아티스트 조회에 문제가 발생했습니다.'});
        res.json({success: true, artist: artist})
    })
})

module.exports = router;