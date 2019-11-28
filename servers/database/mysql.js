const db = require('./db.config');
const mysql1 = require('mysql');
class dataBase {
    constructor() {
        this.connection = mysql1.createConnection(db);

    }
    test() { this.connection.connect(); }
    end() {
        this.connection.end();
    }
}
module.exports = dataBase;