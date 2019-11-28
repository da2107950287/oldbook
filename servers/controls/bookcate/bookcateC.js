const express = require('express');

//子路由的创建
const route = express.Router();
//引入数据操作model层
const model = require('../../models/bookcate/bookcateM');
route.post('/add', (req, res) => {
    let data = req.body;
    let mymodel = new model();
    mymodel.addcate(data, function(result) {

        res.json({ r: "ok" })
    });

})
route.post('/yanzheng', (req, res) => {
    let data = req.body;

    let mymodel = new model();
    mymodel.getByName(data, function(data1) {

        if (data1.length != 0) { res.json({ r: "ok" }) } else { res.json({ r: "no" }) }

    })
})
route.get('/cle', (req, res) => {
    let mymodel = new model();
    mymodel.insertcate(function(result) {
        res.json(result);
    });
})
route.get('/eidt', (req, res) => {
    let data = req.query;

    let mymodel = new model();
    mymodel.infocate(data, function(result) {
        res.json(result);
    });
})
route.get('/show', (req, res) => {
    let mymodel = new model();
    console.log(req.query)
    let page = req.query.page ? req.query.page : 1;
    let limitnum = req.query.limit ? req.query.limit : 10;
    mymodel.insertcateShow(page, limitnum, function(result) {

        let value = { "code": 0, "msg": "", "count": result[0][0].num, "data": result[1] }

        res.json(value);
    });
})
route.get('/editup', (req, res) => {
        let mymodel = new model();


        mymodel.updatecate(req.query, function(result) {

            res.json(result);
        });
    })
    //删除分类图书数据
route.post('/delect', (req, res) => {
    let mymodel = new model();

    mymodel.delectcate(req.body, function(result) {

        res.json(result);
    });
})
module.exports = route;