const myDb = require('../../database/mysql');
class userModel extends myDb {
    constructor() {
            super();
        }
        //微信小程序用户注册
    addWxUser(userinfo, callback) {
            let data = [];
            let fieldstring = [];
            let field = [];

            for (const key in userinfo) {
                if (userinfo.hasOwnProperty(key)) {
                    field.push("?");
                    data.push(userinfo[key]);
                    fieldstring.push(key);
                }
            }

            let sql = `insert into wxuser (${fieldstring.join(",")}) values (${field.join(",")})`;
            this.test();
            this.connection.query(sql, data, (error, results) => {
                callback(results);
                this.end();
            })
        }
        //用户注册
    PerInforRegis(userinfo, callback) {
        console.log(userinfo)
        let data = [];
        let fieldstring = [];
        let field = [];

        for (const key in userinfo) {

            if (userinfo.hasOwnProperty(key)) {
                field.push("?");
                data.push(userinfo[key]);
                fieldstring.push(key);
            }
        }

        let sql = `insert into user (${fieldstring.join(",")}) values (${field.join(",")})`;
        this.test();
        this.connection.query(sql, data, (error, results) => {
            // console.log("results")
            // console.log(results)
            callback(results);
            this.end();
        })
    }


    PerInforRegis1(userinfo, callback) {
        console.log(userinfo)
        let data = [];
        let fieldstring = [];
        let field = [];

        for (const key in userinfo) {
            if (key == "password1") { continue; }
            if (userinfo.hasOwnProperty(key)) {
                field.push("?");
                data.push(userinfo[key]);
                fieldstring.push(key);
            }
        }

        let sql = `insert into user (${fieldstring.join(",")}) values (${field.join(",")})`;
        this.test();
        this.connection.query(sql, data, (error, results) => {
            // console.log("results")
            // console.log(results)
            callback(results);
            this.end();
        })
    }
    PerInforRegisroot(userinfo, callback) {
        let data = [];
        let fieldstring = [];
        let field = [];
        userinfo.type = 1;
        for (const key in userinfo) {
            if (key == 'password1') { delete userinfo.password1; }
            if (userinfo.hasOwnProperty(key)) {
                field.push("?");
                data.push(userinfo[key]);
                fieldstring.push(key);
            }
        }

        let sql = `insert into user (${fieldstring.join(",")}) values (${field.join(",")})`;
        this.test();
        this.connection.query(sql, data, (error, results) => {
            callback(results);
            this.end();
        })
    }
    getLogin(logininfo, callback) {
        this.test();
        let sql = `select * from user where email=? and password=?`;
        this.connection.query(sql, [logininfo.email, logininfo.password], (error, results) => {


            callback(results);

        })
    }
    getLogin1(logininfo, callback) {
        this.test();
        let sql = `select * from user where nickname=? and password=?`;
        this.connection.query(sql, [logininfo.nickname, logininfo.password], (error, results) => {


            callback(results);

        })
    }
    getByName(nameinfo, callback) {

        let sql = `select * from user where email=?;`;
        let sql1 = `select * from user where nickname=?;`;
        this.connection.query(sql + sql1, [nameinfo.email, nameinfo.nickname], (error, results) => {
            console.log(results)
            callback(results);

        })
    }
    getByName1(nameinfo, callback) {

        let sql = `select * from user where nickname=?;`;
        let sql1 = `select * from user where password=?;`;
        this.connection.query(sql + sql1, [nameinfo.nickname, nameinfo.password], (error, results) => {
            console.log(results)
            callback(results);

        })
    }
    insertShow(page, limitnum, callback) {
        this.test();
        let count = `select count(*) as num from user WHERE status=1;`
        let sql = `SELECT * FROM  user WHERE status=1 LIMIT ${(page-1)*limitnum}, ${limitnum}`;
        this.connection.query(count + sql, function(err, result) {

            callback(result);
            this.end();
        })
    }
    updateroot(data, callback) {
        this.test();

        // UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值
        let string1 = [];
        let string2 = [];
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                if (key == "uid") { continue; }
                let value = key + "=?"
                string1.push(value);
                string2.push(data[key]);

            }
        }


        string2.push(data.uid);
        let sql = `update user set ${string1.join(",")} where uid=?`;
        this.connection.query(sql, string2, function(err, result) {

            callback(result);
            this.end();
        })
    }
    infocate(data, callback) {
        this.test();
        let sql = `select * from user where uid=?`;
        this.connection.query(sql, data.uid, function(err, result) {
            callback(result);

            this.end();
        })
    }
    delectroot(data, callback) {
        this.test();
        let sql = `update user set status=0 where uid=?`;
        this.connection.query(sql, [data.uid], function(err, result) {

            callback(result);
            this.end();
        })
    }
    search(data, callback) {
        this.test();
        let sql = `select * from user where nickname=?`;
        this.connection.query(sql, [data.nickname], function(err, result) {

            callback(result);
            this.end();
        })
    }
    searchpw(data, callback) {
        this.test();
        let sql = `select * from user where email=?`;
        this.connection.query(sql, [data.email], function(err, result) {

            callback(result);
            this.end();
        })
    }

    searchopenid1(data, callback) {
        this.test();
        let sql = ` update user set email=? where openid=?`;
        this.connection.query(sql, [data.email, data.openid], function(err, result) {
            callback(result.affectedRows);
            this.end();
        })
    }
    searchopenid2(data, callback) {
        this.test();
        let sql = ` update user set nickname=? where openid=?`;
        this.connection.query(sql, [data.nickname, data.openid], function(err, result) {
            callback(result.affectedRows);
            this.end();
        })
    }
    searchopenid3(data, callback) {
        this.test();
        let sql = ` update user set password=? where openid=?`;
        this.connection.query(sql, [data.password, data.openid], function(err, result) {
            callback(result.affectedRows);
            this.end();
        })
    }
    open(data, callback) {
        this.test();
        let sql = `select * from wxuser where openid=?;`;
        let sql1 = `select * from user where openid=?;`;

        this.connection.query(sql + sql1, [data.openid, data.openid], function(err, result) {
            callback(result);
            this.end();
        })
    }
}

module.exports = userModel;