var express = require('express');
var router = express.Router();

router.get('/me', (req, res, next)=>{
    if(!req.user) return res.json({success: false})
    res.json({success: true, me: req.user})
})

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
        status: 'GENERAL'
    });
    newUser.save((err) => {
        if(err) return res.json({success: false, messagage: '회원가입에 문제가 발생했습니다.'});
        return res.json({success: true, message: '회원가입이 성공했습니다.'});
    })
})

module.exports = router;