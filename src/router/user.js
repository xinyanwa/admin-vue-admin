const express = require('express')
const jwt = require('jsonwebtoken')
const Result = require('../modules/result')
const {login, userInfo, upDateUserInfo, userDelete, insertUser} = require('../service/user')
const {JWT_EXPIRED, PRIVATE} = require('../utils/constant')

const router = express.Router()

router.post('/', function (req, res, next) {
    const userName = req.body.userName
    const password = req.body.password
    const code = req.body.code
    console.log(req.session.captcha)
    if (code.toLowerCase() === req.session.captcha.toLowerCase()) {
        login(userName, password).then(response => {
            if (!response || response.length === 0) {
                new Result('登录失败，请检查用户名和密码').fail(res)
            } else {
                const token = jwt.sign(
                    {userName}, PRIVATE, {expiresIn: JWT_EXPIRED}
                )
                // console.log(123+response)
                new Result({token, response}, '登录成功').success(res)
            }
        })
    } else{
        new Result('验证码错误，请重新输入').fail(res)
    }
})

router.get('/info', function (req, res, next) {
    userInfo().then(response => {
        new Result({response}, '获取用户信息成功').success(res)
    })
})

router.post('/update', function (req, res, next) {
    const userInfo = req.body
    // console.log('userInfo' + userInfo.userInfo)
    if (userInfo.userInfo.user_id) {
        upDateUserInfo(userInfo).then(response => {
            new Result({response}, '更新用户信息成功').success(res)
        })
    } else {
        insertUser(userInfo).then(response => {
            new Result({response}, '插入用户信息成功').success(res)
        })
    }
    // console.log(userInfo)
})

router.post('/delete', function (req, res, next) {
    const userID = req.body.user_id
    userDelete(userID).then(response => {
        // console.log('123456')
        new Result({response}, '删除用户信息成功').success(res)
    })

})

module.exports = router
