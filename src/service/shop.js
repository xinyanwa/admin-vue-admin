const {querySql} = require('../db/index')

function shopInfo() {
    const sql = `select * from shop`
    return querySql(sql)
}


module.exports = {
    shopInfo
}
