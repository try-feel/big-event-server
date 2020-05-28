const path = require('path');
const cors = require('cors');
const express = require('express');
const jwt = require('express-JWT');
const app = express();
app.listen(3007, () => console.log('接口启动'));

// --------------配置应用级别的中间件-------------------
app.use(cors());
app.use(express.urlencoded({
    extended: false
}));
//解析token字符串,控制哪些借口必须要登录就才可以访问
//把用户保存的数据,放到 req.user 的变量上
app.use(jwt({
    secret: 'bigevent'
}).unless({
    path: /^\/api/
}));

// -----------------加载路由模块----------------
// app.use('前缀',require('xxxxx'))
app.use('/api', require(path.join(__dirname, 'routers', 'login')));
app.use('/my/article', require(path.join(__dirname, 'routers', 'article')));
app.use('/my/article', require(path.join(__dirname, 'routers', 'category')));
app.use('/my', require(path.join(__dirname, 'routers', 'user')));

//---------------- 错误处理中间件------------
// 错误处理中间件必须是四个参数
app.use(function (err, req, res, next) {
    console.log(err.name); //错误名字
    console.log(err.message); //错误提示

    if (err.name === 'UnauthorizedError') {
        //如果错误的名字是 UnauthorizedError,则表示是token相关的错误
        res.status(401).send({
            status: 1,
            message: '身份认证失败!'
        });
    }
});