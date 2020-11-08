const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const router = require('./src/router/index')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())
app.use(router)
app.listen(9000,()=>{
    console.log('服务启动成功')
})
