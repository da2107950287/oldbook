const cookieParser = require('cookie-parser')
const session = require('express-session')
const MYSQLStore = require('express-mysql-session')
let secret = "wangke"
exports.cookie = cookieParser(secret)
let sessionStore = new MYSQLStore(require('./database/mysql'));
exports.session = session({
    key: 'sessionid',
    secret: secret,
    store: sessionStore,
    resave: false,
    name: 'sessionid',
    saveUninitialized: true,
    cookie: { maxAge: 24 * 3600 * 1000 }
})