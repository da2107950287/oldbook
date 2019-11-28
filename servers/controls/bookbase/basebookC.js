const express = require("express");
const route = express.Router();
const multer = require('multer');
const model = require("../../models/basebookM/basebookM.js");
// var upload = multer({ dest: "./upload" }); // 文件储存路径
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './upload');
    },
    filename: function(req, file, cb) {

        cb(null, Date.now() + "-" + Math.random() + "." + file.originalname.split('.').pop());
    }
})

var upload = multer({ storage: storage });

route.post('/upload', upload.single('img'), function(req, res, next) {

    let file = { src: "http://localhost:82/" + req.file.filename };

    res.json(file);
});





route.post('/add', (req, res) => {
    let data = req.body;

    let mymodel = new model();
    mymodel.add(data, function(result) {
        res.json({ r: "ok" })
    })
})
route.get('/show', (req, res) => {
    let mymodel = new model();

    let page = req.query.page ? req.query.page : 1;
    let limitnum = req.query.limit ? req.query.limit : 10;
    mymodel.insertShow(page, limitnum, function(result) {

        let value = { "code": 0, "msg": "", "count": result[0][0].num, "data": result[1] }

        res.json(value);
    });
})

route.post('/delect', (req, res) => {
    let mymodel = new model();

    mymodel.delectcate(req.body, function(result) {

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
route.get('/editup', (req, res) => {
    let mymodel = new model();


    mymodel.updatebook(req.query, function(result) {

        res.json(result);
    });
})
route.post('/yanzheng', (req, res) => {
    let data = req.body;
    let mymodel = new model();
    mymodel.getByName(data, function(data1) {

        if (data1.length != 0) { res.json({ r: "ok" }) } else { res.json({ r: "no" }) }

    })
})
module.exports = route;