const {querySql, deleteUser} = require('../db/index')
const db = require('../db/index')

function login(userName, password) {
    const sql = `select * from user where user = '${userName}' and password = '${password}'`
    return querySql(sql)
}

function userInfo() {
    const sql = `select * from user`
    return querySql(sql)
}

function upDateUserInfo(userInfo) {
    return new Promise((resolve, reject) => {
        // console.log(userInfo.userInfo)
        db.update(userInfo.userInfo, 'user', `where user = '${userInfo.userInfo.user}'`).then(response => {
            if (response) {
                resolve('更新成功')
            } else {
                reject(new Error('更新失败'))
            }
        })
    })
}

function userDelete(userID) {
    const sql = `delete from user where user_id = ` + userID
    return deleteUser(sql)
}

function insertUser(userInfo) {
    return new Promise((resolve, reject) => {
        // console.log(userInfo.userInfo)
        db.insert(userInfo.userInfo, 'user').then(response => {
            if (response) {
                resolve('插入用户信息成功')
            } else {
                reject('插入用户信息失败')
            }
        })
    })
}

module.exports = {
    login,
    userInfo,
    upDateUserInfo,
    userDelete,
    insertUser
}
