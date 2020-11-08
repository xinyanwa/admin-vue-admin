function isObject(o) {
    return Object.prototype.toString.call(0) === '[Object Object]'
}

module.exports = {
    isObject
}
