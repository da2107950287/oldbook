const cookieParser = require('cookie-parser');
const session = require('express-session');
let secret = "wangke";
let MYSQLStore = require('express-mysql-session')(session);
exports.cookie = cookieParser(secret);
let sessionStore = new MYSQLStore(require('./database/db.config'));
exports.session = session({
    key: 'sessionid',
    secret: secret,
    store: sessionStore,
    name: 'sessionid',
    resave: false,
    saveUninitialized: false,
    cookie: { max: 24 * 3600 * 1000 }
})