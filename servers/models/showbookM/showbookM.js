const myDb = require('../../database/mysql');
class showbookM extends myDb {
    constructor() {
        super();
    }

    showbook(callback) {
        this.test();

        let sql = `SELECT * FROM  rbook WHERE stute=1 and tuijian>=1`;
        this.connection.query(sql, function(err, result) {

            callback(result);
            this.end();
        })
    }


    showallbook(page, callback) {
        this.test();

        let sql = `SELECT * FROM  rbook WHERE stute=1 LIMIT ${(page-1)*9}, 9 `;
        this.connection.query(sql, function(err, result) {

            callback(result);
            this.end();
        })
    }

    specialbook(callback) {
        this.test();

        let sql = `SELECT r.* FROM  rbook r ,public p WHERE r.rid=p.rid and p.price<=1000`;
        this.connection.query(sql, function(err, result) {
            callback(result);
            this.end();
        })
    }

    keybook(data, callback) {
        this.test();
        let a = [];
        let sql = `SELECT r.* FROM  rbook r ,public p WHERE r.rid=p.rid and r.bname like '%${data.key}%' `;
        console.log(sql)
        this.connection.query(sql, function(err, result) {
            if (result == undefined) { callback(a); }
            callback(result);
            this.end();
        })
    }

    bookinfo(data, callback) {
        this.test();

        let sql = `SELECT r.*,p.* FROM  rbook r,public p WHERE r.rid=p.rid and r.rid=?`;
        this.connection.query(sql, [data.rid], function(err, result) {
            callback(result);
            this.end();
        })
    }

}
module.exports = showbookM;