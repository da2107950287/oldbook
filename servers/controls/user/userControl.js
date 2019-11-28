const express = require('express');
//引入数据操作model层
const request = require('request');
const model = require('../../models/user/userModel');
//子路由的创建
const route = express.Router();
route.get('/', (req, res) => {
    let code = req.query.code;
    let nickname = req.query.nickname;
    let avatar = req.query.avatar;
    let appid = "wxf5964e8bcb28b558";
    let appsecret = "c464a09dca88becf0bc4a06fe0dae847";
    let urlwx = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appsecret}&js_code=${code}&grant_type=authorization_code`;
    request(urlwx, (error, response, body) => {
        if (error) {
            console.log(error);
            res.json({ code: -1, Msg: '授权失败' });
            return;
        }
        let token = JSON.parse(body);

        let mymodel = new model();
        let userinfo = {
            openid: token.openid,
            nickname: nickname,
            avatar: avatar
        };
        req.session.openid = token.openid;
        req.session.session_key = token.session_key;
        mymodel.addWxUser(userinfo, function(result) {
            //   保存openID,session_key

            res.json({ code: 1, Msg: '授权成功', openid: token.openid });
        })

    })

})
route.post('/zhuce', (req, res) => {
    let data = req.body;

    let mymodel = new model();
    mymodel.PerInforRegis(data, function(result) {
        console.log(result)
        res.json({ r: "ok" })
    })
})
route.post('/zhuce1', (req, res) => {
    let data = req.body;

    let mymodel = new model();
    mymodel.PerInforRegis1(data, function(result) {
        console.log(result)
        res.json({ r: "ok" })
    })
})
route.post('/rootadd', (req, res) => {
    let data = req.body;

    let mymodel = new model();
    mymodel.PerInforRegisroot(data, function(result) {

        res.json({ r: "ok" })
    })
})
route.post('/delect', (req, res) => {
    let mymodel = new model();

    mymodel.delectroot(req.body, function(result) {

        res.json(result);
    });
})
route.post('/search', (req, res) => {
    let mymodel = new model();

    mymodel.search(req.body, function(result) {
        res.json(result[0]);
    });
})
route.post('/searchpw', (req, res) => {
    let mymodel = new model();

    mymodel.searchpw(req.body, function(result) {
        res.json(result[0]);
    });
})
route.post('/login', (req, res) => {
    let data = req.body;

    let mymodel = new model();
    mymodel.getLogin(data, function(result) {

        if (result.length == 0) {

            mymodel.getByName(data, function(data1) {

                if (data1[0].length == 0) { res.json({ code: 0, password: "邮箱错误" }) } else if (data1[0].password != data.password) { res.json({ code: -1, password: "密码错误" }) }
            })


        } else {
            // req.session.nickname = data.nickname;
            // req.session.password = data.password;

            res.json({ code: 1, password: "登录成功", type: result[0].type });
        }
    })
})
route.post('/login1', (req, res) => {
    let data = req.body;

    let mymodel = new model();
    mymodel.getLogin1(data, function(result) {

        if (result.length == 0) {

            mymodel.getByName1(data, function(data1) {

                if (data1[0].length == 0) { res.json({ code: 0, password: "用户名错误" }) } else if (data1[0].password != data.password) { res.json({ code: -1, password: "密码错误" }) }
            })


        } else {
            // req.session.nickname = data.nickname;
            // req.session.password = data.password;

            res.json({ code: 1, password: "登录成功", type: result[0].type });
        }
    })
})

route.post('/yanzheng', (req, res) => {
    let data = req.body;


    let mymodel = new model();
    mymodel.getByName(data, function(data1) {
        console.log(data1[0])
        if (data1[0].length != 0) {
            res.json({ r: "email" })

        } else {
            if (data1[1].length != 0)
                res.json({ r: "nickname" })
            else {
                res.json({ r: "ok" })
            }
        }

    })
})
route.post('/yanzheng1', (req, res) => {
    let data = req.body;
    console.log("data");
    console.log(data);

    let mymodel = new model();
    mymodel.getByName(data, function(data1) {
        console.log(data1[1])
        if (data1[1].length != 0) {
            res.json({ r: "nickname" })

        } else {


            res.json({ r: "ok" })

        }

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
route.get('/eidt', (req, res) => {
    let data = req.query;

    let mymodel = new model();
    mymodel.infocate(data, function(result) {

        res.json(result);
    });
})
route.get('/searchopenid1', (req, res) => {
    let data = req.query;

    let mymodel = new model();
    mymodel.searchopenid1(data, function(result) {

        res.json({ r: result });
    });
})
route.get('/searchopenid2', (req, res) => {
    let data = req.query;
    console.log(data);
    let mymodel = new model();
    mymodel.searchopenid2(data, function(result) {

        res.json({ r: result });
    });
})
route.get('/searchopenid3', (req, res) => {
    let data = req.query;

    let mymodel = new model();
    mymodel.searchopenid3(data, function(result) {

        res.json({ r: result });
    });
})
route.get('/editup', (req, res) => {
        let mymodel = new model();


        mymodel.updateroot(req.query, function(result) {

            res.json(result[0]);
        });
    })
    //个人中心
route.get('/open', (req, res) => {
    let mymodel = new model();


    mymodel.open(req.query, function(result) {

        res.json(result);
    });
})
module.exports = route;