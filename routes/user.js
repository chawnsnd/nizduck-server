var express = require('express');
var router = express.Router();

router.get('/me', (req, res, next)=>{
    if(!req.user) return res.json({success: false})
    res.json({success: true, me: req.user})
})

module.exports = router;