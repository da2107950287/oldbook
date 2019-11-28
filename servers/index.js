const express = require('express');
//解析数据
const bodyParser = require('body-parser');
var name;
const app = express();

app.use(require('./open.js').cookie);
app.use(require('./open.js').session);
app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    res.header("Access-Control-Allow-Credentials", true); //设置cookie跨域问题
    next();
});
//解析数据格式
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//get请求
app.get('/', (req, res) => {
    console.log("首页");
    // res.send(req.session);
});
//用户模块入口文件
app.use('/user', require("./controls/user/userControl"));
app.use('/cate', require("./controls/bookcate/bookcateC.js"));
app.use('/base', require("./controls/bookbase/basebookC"));
app.use('/public', require("./controls/bookpublic/bookpublicC"));
// app.use(require('./re.js').cookie);
// app.use(require('./re.js').session);
app.use('/show', require("./controls/show/showbookC.js"));
//静态资源管理
app.use(express.static("./upload/"));
//监听端口
app.listen(82, () => {
    console.log("82端口server启动成功");
})