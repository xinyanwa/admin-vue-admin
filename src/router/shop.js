const express = require('express')
const {shopInfo} = require('../service/shop')
const Result = require('../modules/result')

const router = express.Router()

router.get('/',function (req,res,next) {
    res.send('创建连接成功')
})

router.get('/info',function (req,res,next) {
    shopInfo().then((response)=>{
       if (response){
           new Result({response},"获取商品信息成功").success(res)
       } else {
           new Result('获取商品信息失败，请重试！').fail(res)
       }
    })
})

module.exports = router
