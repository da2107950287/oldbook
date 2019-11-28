const myDb = require('../../database/mysql');
class bookcateM extends myDb {
    constructor() {
        super();
    }

    addcate(data, callback) {
        this.test();
        let values1 = [];
        let values2 = [];
        let values3 = [];
        for (const key in data) {
            if (data.hasOwnProperty(key)) {

                values1.push(key);
                values2.push("?");
                values3.push(data[key]);

            }


        }
        values1.splice(1, 1);
        values1.splice(1, 0, "pid");
        let sql = `insert into fenlei (${values1.join(",")}) values (${values2.join(",")})`;
        this.connection.query(sql, values3, function(err, result) {
            console.log(values1, values2, values3)

            callback(result);
            this.end();
        })
    }
    insertcate(callback) {
        this.test();

        let sql = `select * from fenlei where pid = 0`;
        this.connection.query(sql, function(err, result) {
            callback(result);
            this.end();
        })
    }
    infocate(data, callback) {
        this.test();
        let sql = `select * from fenlei where fid=?`;
        this.connection.query(sql, data.fid, function(err, result) {
            callback(result);

            this.end();
        })
    }
    insertcateShow(page, limitnum, callback) {
        this.test();
        let count = `select count(*) as num from fenlei WHERE stute=1;`
        let sql = `SELECT * FROM  fenlei WHERE stute=1 LIMIT ${(page-1)*limitnum}, ${limitnum}`;
        this.connection.query(count + sql, function(err, result) {

            callback(result);
            this.end();
        })
    }
    updatecate(data, callback) {
        this.test();
        // UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值
        let sql = `update fenlei set pid=?,name=? where fid=?`;
        this.connection.query(sql, [data.pid, data.name, data.fid], function(err, result) {
            callback(result);
            this.end();
        })
    }
    delectcate(data, callback) {
        this.test();
        let sql = `update fenlei set stute=0 where fid=?`;
        this.connection.query(sql, [data.fid], function(err, result) {
            callback(result);
            this.end();
        })
    }

    getByName(nameinfo, callback) {

        let sql = `select * from fenlei where name=?`;
        this.connection.query(sql, [nameinfo.name], (error, results) => {
            callback(results);

        })
    }
}

module.exports = bookcateM;