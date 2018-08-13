var express = require('express');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var db = require('../models/db');
require('../models/user');
var User = db.model('User');
var router = express.Router();

//회원가입
router.post('/', (req, res, next) => {
    if(!req.body.email) return res.json({success: false, message: '`email`는 필수 파라미터 입니다.'});
	if(!req.body.duckname) return res.json({success: false, message: '`duckname`는 필수 파라미터 입니다.'});
	if(!req.body.password) return res.json({success: false, message: '`password`는 필수 파라미터 입니다.'});
	if(!req.body.name) return res.json({success: false, message: '`name`는 필수 파라미터 입니다.'});
    if(!req.body.birthday) return res.json({success: false, messagage: '`birthday`는 필수 파라미터 입니다.'});
    if(!req.body.sex) return res.json({success: false, messagage: '`sex`는 필수 파라미터 입니다.'});
    var salt = Math.random().toString(36).substr(2).toUpperCase();
    var password = crypto.pbkdf2Sync(req.body.password, salt, 8192, 24, 'sha256').toString('base64');
    var newUser = new User({
        email: req.body.email,
        duckname: req.body.duckname,
        password: password,
        salt: salt,
        name: req.body.name,
        birthday: req.body.birthday,
        sex: req.body.sex,
        bias: req.body.bias,
        interest: req.body.interest,
        promotion: req.body.promotion,
        status: 'GENERAL'
    });
    newUser.save(err => {
        if(err) return res.json({success: false, messagage: '회원가입에 문제가 발생했습니다.'});
        return res.json({success: true, message: '회원가입이 성공했습니다.'});
    })
})

//가입 시 중복체크
router.post('/verify', (req, res, next) => {
    var email = req.body.email;
    var duckname = req.body.duckname;

    if(!email && !duckname) return res.json({success: false, messagage: '파라미터를 입력하세요.'});
    if(req.body.email){
        if(!/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(email)){
            return res.json({
				success: false,
				message: '이메일 형식을 확인하세요.'
			});
        } else {
            User.findOne({email: email}, (err, user) => {
                if(err) return next(err);
                if(user) {
                    return res.json({
                        success: false,
                        message: '이미 사용중인 이메일입니다.'
                    });
                } else {
                    return res.json({
                        success: true,
                        message: '사용할 수 있습니다.'
                    });
                }
            })
        }
    }
    if(req.body.duckname){
        User.findOne({duckname: duckname}, (err, user) => {
            if(err) return next(err);
            if(user) {
                return res.json({
                    success: false,
                    message: '이미 사용중인 이메일입니다.'
                });
            } else {
                return res.json({
                    success: true,
                    message: '사용할 수 있습니다.'
                });
            }
        })
    }
})

//로그인
router.post('/login', (req, res, next) => {
    if(!req.body.email||!req.body.password) return res.json({success: false, message: '이메일 또는 비밀번호를 입력하세요.'});
	User.findOne({email: req.body.email}, (err, user) => {
        if(err) return next(err);
		const hash = crypto.pbkdf2Sync(req.body.password, user.salt, 8192, 24, 'sha256').toString('base64');
		if(!user || hash != user.password) return res.json({success: false, message: '이메일 또는 비밀번호를 찾을 수 없습니다.'});
		if(user.status === 'GENERAL') {
            jwt.sign({user_id: user._id}, 
                req.app.get('jwt-secret'), 
                (err, token) => {
				if(req.body.keep) {
					res.cookie('token', token, {httpOnly: true, expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 12)});
				} else {
					res.cookie('token', token, {httpOnly: true});
				}
				return res.json({success: true, user, token});
			});
		} else {
			return res.json({success: false, message: '일반사용자가 아닙니다.'});
		}
	});
});

//로그아웃
router.post('/logout', (req, res, next) => {
    res.cookie('token', '', {httpOnly: true});
	res.json({success: true});
})
module.exports = router;