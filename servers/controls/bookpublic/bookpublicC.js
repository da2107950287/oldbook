const express = require("express");
const route = express.Router();
const model = require("../../models/bookpublic/bookpublicM");
route.post('/add', (req, res) => {
    let data = req.body;
    let mymodel = new model();
    mymodel.add(data, function (result) {
        res.json({
            r: "ok"
        })
    })
})
route.get('/cle', (req, res) => {
    let mymodel = new model();
    mymodel.insertcate(function (result) {
        res.json(result);
    });
})
route.get('/show', (req, res) => {
    let mymodel = new model();
    console.log(req.query)
    let page = req.query.page ? req.query.page : 1;
    let limitnum = req.query.limit ? req.query.limit : 10;
    mymodel.insertcateShow(page, limitnum, function (result) {

        let value = {
            "code": 0,
            "msg": "",
            "count": result[0][0].num,
            "data": result[1]
        }

        res.json(value);
    });
})
//删除图书出版信息数据
route.post('/delect', (req, res) => {
    let mymodel = new model();

    mymodel.delectcate(req.body, function (result) {

        res.json(result);
    });
})
route.get('/eidt', (req, res) => {
    let data = req.query;

    let mymodel = new model();
    mymodel.infocate(data, function (result) {
        res.json(result);
    });
})
route.get('/editup', (req, res) => {
    let mymodel = new model();


    mymodel.update(req.query, function (result) {

        res.json(result);
    });
})

// 移动端请求
route.get('/newbook', (req, res) => {
    let mymodel = new model();
    mymodel.newbooksort(function (result) {
        res.json(result);
    });
})
route.post('/xiangqing', (req, res) => {
    let mymodel = new model();
    mymodel.xiangqingbook(req.body, function (result) {

        res.json(result);
    });
})
route.post('/searchmobile', (req, res) => {
    let mymodel = new model();

    mymodel.searchmobile(req.body, function (result) {

        res.json(result);
    });
})
route.post('/Order', (req, res) => {
    let mymodel = new model();
    req.body.user = req.session.username;
    if (req.session.username) {
        mymodel.Order(req.body, function (result) {
            if (result.affectedRows == 1) {
                res.json({
                    "statu": "ok"
                });
            } else {
                res.json({
                    "statu": "no"
                });
            }
        });
    } else {
        res.json({
            "statu": "login"
        })
    }
})
route.post('/orderSelect', (req, res) => {
    let mymodel = new model();

    mymodel.orderSelect({
        "user": req.session.username
    }, function (result) {
        res.json(result);

    });
})
route.get('/searchall', (req, res) => {
    let mymodel = new model();
    mymodel.searchall(req.query, function (result) {
        res.json(result);

    });
})

route.post('/Category', (req, res) => {
    let mymodel = new model();
    mymodel.Category(function (result) {
        res.json(result);

    });
})

route.post('/loginmobile', (req, res) => {
    let username = req.body.value;
    let password = req.body.pass;
    let value = {
        'username': username,
        'password': password
    }
    let mymodel = new model();
    mymodel.loginmobile(value, function (result) {

        if (result != undefined) {
            req.session.username = username;
            res.json({
                tag: "ok"
            });
        } else(res.json({
            tag: "no"
        }))

    });
})


route.post('/zhucemobile', (req, res) => {
    let username = req.body.value;
    let password = req.body.pass;
    let value = {
        'username': username,
        'password': password
    }
    let mymodel = new model();
    mymodel.zhucemobile(value, function (result) {
        res.json(result);

    });
})
route.get('/myself', (req, res) => {
    let mymodel = new model();
    console.log(req.session.username)
    if (req.session.username) {
        mymodel.myself({
            value: req.session.username
        }, function (result) {
            console.log(result)
            res.json(result)
        });
    } else {
        res.json({
            "statu": "login"
        })
    }

})
module.exports = route;