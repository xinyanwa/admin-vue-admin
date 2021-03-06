const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session')
const router = require('./src/router/index')
const app = express()

app.use(session({
    secret:'secret',
    resave: false,
    saveUninitialized: true
}))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())
app.use(router)
app.listen(9000,()=>{
    console.log('服务启动成功')
})
