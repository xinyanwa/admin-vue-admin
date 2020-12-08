const mysql = require('mysql')
const config = require('./config')
const {debug} = require('../utils/constant')
const {isObject} = require('../utils/index')

function connect() {
    return mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database,
        multipleStatements: true
    })
}

// 查询数据库
function querySql(sql) {
    const conn = connect()
    debug && console.log('查询语句' + sql)
    return new Promise((resolve, reject) => {
        try {
            conn.query(sql, (err, results) => {
                if (err) {
                    debug && console.log('查询失败，原因' + JSON.stringify(err))
                    reject(err)
                } else {
                    debug && console.log('查询成功，原因' + JSON.stringify(results))
                    resolve(results)
                }
            })
        } catch (err) {
            reject(err)
        } finally {
            conn.end()
        }
    })
}

// 删除数据库
function deleteUser(sql) {
    const conn = connect()
    debug && console.log('删除语句' + sql)
    return new Promise((resolve, reject) => {
        try {
            conn.query(sql, (err, results) => {
                if (err) {
                    debug && console.log('删除失败，原因' + JSON.stringify(err))
                    reject(err)
                } else {
                    debug && console.log('删除成功，原因' + JSON.stringify(results))
                    resolve(results)
                }
            })
        } catch (err) {
            reject(err)
        } finally {
            conn.end()
        }
    })
}

// 更新数据库
function update(model, tableName, where) {
    return new Promise((resolve, reject) => {
        if (isObject(model)) {
            reject(new Error('更新失败，更新数据非对象'))
        } else {
            const entry = []
            Object.keys(model).forEach(key => {
                if (model.hasOwnProperty(key)) {
                    entry.push(`\`${key}\`='${model[key]}'`)
                }
            })
            if (entry.length > 0) {
                const conn = connect()
                let sql = `UPDATE \`${tableName}\`SET`
                sql = `${sql} ${entry.join(',')}${where}`
                debug && console.log('更新数据库语句' + sql)
                conn.query(sql, (err, result) => {
                    try {
                        if (err) {
                            debug && console.log('更新失败，原因' + JSON.stringify(err))
                            reject(err)
                        } else {
                            debug && console.log('更新成功，原因' + JSON.stringify(result))
                            resolve(result)
                        }
                    } catch (e) {
                        reject(e)
                    } finally {
                        conn.end()
                    }
                })
            }
        }
    })
}

// 插入数据库
function insert(model, tableName) {
    return new Promise((resolve, reject) => {
        if (isObject(model)) {
            reject(new Error('更新失败，更新数据非对象'))
        } else {
            const entry = []
            Object.keys(model).forEach(key => {
                if (model.hasOwnProperty(key)) {
                    entry.push(`\`${key}\`='${model[key]}'`)
                }
            })
            if (entry.length > 0) {
                const conn = connect()
                let sql = `INSERT INTO \`${tableName}\`SET`
                sql = `${sql} ${entry.join(',')}`
                debug && console.log('插入数据库语句' + sql)
                conn.query(sql, (err, results) => {
                    try {
                        if (err) {
                            debug && console.log('插入失败，原因' + JSON.stringify(err))
                            reject(err)
                        } else {
                            debug && console.log('插入成功，原因' + JSON.stringify(results))
                            resolve(results)
                        }
                    } catch (e) {
                        reject(e)
                    } finally {
                        conn.end()
                    }
                })
            }
        }
    })
}

module.exports = {
    querySql,
    update,
    deleteUser,
    insert,
}
