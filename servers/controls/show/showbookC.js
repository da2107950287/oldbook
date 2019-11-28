const express = require("express");
const route = express.Router();
const model = require("../../models/showbookM/showbookM.js");

route.get('/book', (req, res) => {
    // let data = req.body;

    let mymodel = new model();
    mymodel.showbook(function(result) {

        res.json({ result });


    })
})
route.get('/showallbook', (req, res) => {
    // let data = req.body;
    let page = req.query.page;
    console.log(page)
    let mymodel = new model();
    mymodel.showallbook(page, function(result) {

        res.json({ result });

        // res.cookie("username", "wangke", { maxAge: 24 * 3600 * 1000 });
    })
})
route.get('/specialbook', (req, res) => {
    // let data = req.body;

    let mymodel = new model();
    mymodel.specialbook(function(result) {

        res.json({ result });

        // res.cookie("username", "wangke", { maxAge: 24 * 3600 * 1000 });
    })
})
route.get('/keybook', (req, res) => {
    let data = req.query;
    console.log(data);
    let mymodel = new model();
    mymodel.keybook(data, function(result) {

        res.json({ result });

        // res.cookie("username", "wangke", { maxAge: 24 * 3600 * 1000 });
    })
})
route.get('/bookinfo', (req, res) => {
    let data = req.query;

    let mymodel = new model();
    mymodel.bookinfo(data, function(result) {

        let arr = result[0].keyword.split(",");
        result[0].keyword1 = arr;
        let characteristic1 = result[0].characteristic.slice(0, 20);
        let a_introduction1 = result[0].a_introduction.slice(0, 20);
        let b_introduction1 = result[0].b_introduction.slice(0, 20);
        let brief = result[0].brief.slice(0, 50);
        result[0].characteristic1 = characteristic1;
        result[0].a_introduction1 = a_introduction1;
        result[0].b_introduction1 = b_introduction1;
        result[0].brief1 = brief;
        res.json(result[0]);
    })
})
module.exports = route;