// 路由文件中要有四个步骤
// 1. 加载express
// 2. 创建路由对象
// 3. 把接口挂载到路由对象上
// 4. 导出路由对象
const path = require('path');
const db = require(path.join(__dirname, '../utils/db.js'));
//加载加密模块
const utility = require('utility');
//加载jsonwebtoken模块,用于生成token字符串
const jsonwebtoken = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

//   这里写接口

//   注册接口
router.post('/reguser', async (req, res) => {
    // 接收客户端提交的  username 和 password. 直接用req.body
    console.log(req.body);

    req.body.password = utility.md5(req.body.password);
    console.log(req.body);

    // 写一条insert语句,添加入库
    let r = await db('insert into user set ?', req.body);
    // console.log(r);// 添加成功返回一个对象,失败了返回undefined
    if (r && r.affectedRows > 0) {
        //成功
        res.send({
            status: 0,
            message: '注册成功'
        });
    } else {
        //失败
        res.send({
            status: 1,
            message: '注册失败'
        });
    }
    // 做出响应即可
});

//    登陆接口
router.post('/login', async (req, res) => {
    // 通过req.body 接收username和password
    let username = req.body.username;
    let password = utility.md5(req.body.password);

    //判断账号密码是否正确
    let r = await db('select * from user where username = ? and password=?', [username, password]);
    console.log(r); // 查询信息,得到非空数组: 没有查到,得到空数组
    if (r && r.length > 0) {
        //登录成功
        res.send({
            status: 0,
            message: '登录成功',
            // token: 'Bearer' jsonwebtoken.sign('数据','用于加密的字符串',配置项);
            // 'Bearer '必须有一个空格
            token: 'Bearer ' + jsonwebtoken.sign({
                username: req.body.username,
                id: r[0].id
            },'bigevent',{
                expiresIn: '2 days'
            })
        });
    } else {
        //登陆失败
        res.send({
            status: 1,
            message: '登录失败'
        });

    }

})
module.exports = router;