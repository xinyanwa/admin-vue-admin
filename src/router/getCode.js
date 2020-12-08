const express = require('express')
const svgCaptcha = require('svg-captcha')
const Result = require('../modules/result')

const router = express.Router()

router.get('/',function (req,res) {
    const captchaConfig = {
        noise: 5,
        color: true,
        background: '#fff'
    }
    const captcha = svgCaptcha.create(captchaConfig);
    req.session.captcha = captcha.text;
    const code = captcha.data
    new Result({code},'发送验证码成功').success(res)
})

module.exports = router
