const myDb = require('../../database/mysql');
class basebookM extends myDb {
    constructor() {
        super();
    }

    add(data, callback) {
        this.test();
        let values1 = [];
        let values2 = [];
        let values3 = [];
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                if (key == "img") { continue; }
                values1.push(key);
                values2.push("?");
                values3.push(data[key]);

            }
        }
        let sql = `insert into rbook (${values1.join(",")}) values (${values2.join(",")})`;
        this.connection.query(sql, values3, function(err, result) {


            callback(result);
            this.end();
        })
    }


    insertShow(page, limitnum, callback) {
        this.test();
        let count = `select count(*) as num from rbook WHERE stute=1;`
        let sql = `SELECT * FROM  rbook WHERE stute=1 LIMIT ${(page-1)*limitnum}, ${limitnum}`;
        this.connection.query(count + sql, function(err, result) {

            callback(result);
            this.end();
        })
    }

    infocate(data, callback) {
        this.test();
        let sql = `select * from rbook where rid=?`;
        this.connection.query(sql, data.rid, function(err, result) {
            callback(result);

            this.end();
        })
    }

    updatebook(data, callback) {
        this.test();
        // UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值
        let string1 = [];
        let string2 = [];
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                if (key == "img") { continue; }
                let value = key + "=?"
                string1.push(value);
                string2.push(data[key]);

            }
        }


        string2.push(data.rid);
        let sql = `update rbook set ${string1.join(",")} where rid=?`;
        this.connection.query(sql, string2, function(err, result) {

            callback(result);
            this.end();
        })
    }

    delectcate(data, callback) {
        this.test();
        let sql = `update rbook set stute=0 where rid=?`;
        this.connection.query(sql, [data.rid], function(err, result) {
            callback(result);
            this.end();
        })
    }

    getByName(nameinfo, callback) {

        let sql = `select * from rbook where bname=?`;
        this.connection.query(sql, [nameinfo.bname], (error, results) => {
            callback(results);

        })
    }
}
module.exports = basebookM;