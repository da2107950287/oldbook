const myDb = require('../../database/mysql');
class bookcateM extends myDb {
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
                values1.push(key);
                values2.push("?");
                values3.push(data[key]);

            }
        }


        let sql = `insert into public (${values1.join(",")}) values (${values2.join(",")})`;
        this.connection.query(sql, values3, function (err, result) {


            callback(result);
            this.end();
        })
    }
    insertcate(callback) {
        this.test();

        let sql = `select rid,bname from rbook where 1`;
        this.connection.query(sql, function (err, result) {
            callback(result);
            this.end();
        })
    }
    infocate(data, callback) {
        this.test();
        let sql = `select p.*,r.bname from public p,rbook r where r.rid=p.rid and tid=?`;
        this.connection.query(sql, data.tid, function (err, result) {
            callback(result);
            this.end();
        })
    }
    insertcateShow(page, limitnum, callback) {
        this.test();
        let count = `select count(*) as num from public ;`
        let sql = `select p.*,r.rid,r.bname from public p,rbook r where r.rid=p.rid and  p.stute=1 LIMIT ${(page-1)*limitnum}, ${limitnum}`;
        this.connection.query(count + sql, function (err, result) {
            //select p.*,r.rid,r.bname from public p,rbook r where r.rid=p.rid;
            callback(result);
            this.end();
        })
    }
    update(data, callback) {
        this.test();
        // UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值
        let string1 = [];
        let string2 = [];
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                let value = key + "=?"
                string1.push(value);
                string2.push(data[key]);

            }
        }


        string2.push(data.tid);
        let sql = `update public set ${string1.join(",")} where tid=?`;
        this.connection.query(sql, string2, function (err, result) {

            callback(result);
            this.end();
        })
    }
    delectcate(data, callback) {
        this.test();
        let sql = `update public set stute=0 where tid=?`;
        this.connection.query(sql, [data.tid], function (err, result) {
            callback(result);
            this.end();
        })
    }
    //移动端请求
    newbooksort(callback) {
        this.test();
        let sql = `select r.*,p.price from rbook r,public p where r.rid=p.rid order by addtime desc`
        this.connection.query(sql, function (err, result) {

            callback(result);
            this.end();
        })
    }

    xiangqingbook(data, callback) {
        this.test();
        let sql = `select r.*,p.* from rbook r,public p where r.rid=p.rid and r.rid=?`
        this.connection.query(sql, [data.id], function (err, result) {
            callback(result);

            this.end();
        })
    }

    searchmobile(data, callback) {
        this.test();
        let sql = `select cid from class where name=?`
        let sql1 = `select * from rbook where class=?`
     
        let that = this;
        this.connection.query(sql, [data.name], function (err, result) {
           
            if (result.length!=0) {
                that.connection.query(sql1, [result[0].cid], function (err, result) {
                    callback(result);
                    that.end();
                })
            }
        })


    }
    myself(data,callback) {
        this.test();
        // var timestamp = new Date().toString();
        let sql = `select * from usermobile where nickname='${data.value}'`
        this.connection.query(sql, function (err, result) {
            console.log(sql)
            callback(result);
            this.end();
        })
    }

    Order(data, callback) {
        this.test();
        var timestamp = new Date().toString();
        let sql = `insert into List (rid,num,addtime1,username) values (${data.id},${data.count},'${timestamp}','${data.user}')`
        this.connection.query(sql, function (err, result) {
            callback(result);
            this.end();
        })
    }

    orderSelect(data,callback) {
        this.test();
        
        let sql = `select l.*,r.*,p.price from List l,rbook r,public p where r.rid=l.rid and r.rid=p.rid and l.rid=p.rid and username='${data.user}'`
        this.connection.query(sql, function (err, result) {
            console.log(sql)
            callback(result);
            this.end();
        })
    }

    searchall(data, callback) {
        this.test();
        let sql = `select * from rbook where search like'%${data.value}%' `
        this.connection.query(sql, function (err, result) {
            console.log(sql)
            callback(result);
            this.end();
        })
    }


    Category(callback) {
        this.test();
        let sql = `select * from class where pid=0;select * from class where pid!=0;' `
        this.connection.query(sql, function (err, result) {
            callback(result);
            this.end();
        })
    }

    loginmobile(data, callback) {
        this.test();
        let sql = `select * from usermobile where statue=1 and nickname='${data.username}' and password=${data.password}`
        this.connection.query(sql, function (err, result) {
            callback(result);
            this.end();
        })
    }

    zhucemobile(data, callback) {
        this.test();
        let that=this;
        let sql0 = `select * from usermobile where statue=1 and nickname='${data.username}' and password=${data.password}`;
        let sql = `insert into usermobile (nickname,password) values ('${data.username}','${data.password}')`;
        this.connection.query(sql0, function (err, result) {
            console.log(sql0);
           if(result.length==0)
           {
            that.connection.query(sql, function () {
                callback({name:"ok"});
            })
           }
           else{callback({name:"exit"})}
            this.end();
        })
        
    }
}
module.exports = bookcateM;