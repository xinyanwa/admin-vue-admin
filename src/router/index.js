const express = require('express')
const boom = require('boom')
const user = require('./user')
const shop = require('./shop')
const getCode = require('./getCode')
const router = express.Router()

router.get('/', function (req, res) {
    res.send('欢迎来到weiwei-admin')
})

router.use('/user', user)

router.use('/shop', shop)

router.use('/getCode', getCode)

router.use(((req, res, next) => {
    next(boom.notFound('接口不存在'))
}))

module.exports = router
