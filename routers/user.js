// 路由文件中要有四个步骤
// 1. 加载express
// 2. 创建路由对象
// 3. 把接口挂载到路由对象上
// 4. 导出路由对象

const express = require('express');
const router = express.Router();
//加载加密模块
const utility = require('utility');
const path = require('path');
const db = require(path.join(__dirname, '../utils/db.js'));

//   这里写接口
// 获取用户信息接口
router.get('/userinfo', async (req,res) => {
    //当用户请求这个借口的时候,作为服务器,该做什么
    // 答: 从数据库中获取该用户的信息,响应给客户端
    let r = await db('select id,username,nickname,email,user_pic from user where id = ?',req.user.id)
    // console.log(req.user);
    // console.log(r);
    if (r && r.length > 0) {
        res.send({
            status:0,
            message:'获取用户信息成功',
            data:r[0]
        });
    }else{
        res.send({status:1,message:'获取用户信息失败'});
    }

    
    
});

//  更新密码接口
router.post('/updatepwd',async (req, res) => {
    // 获取原密码和新密码
    let oldPwd = utility.md5(req.body.oldPwd);//原密码
    let newPwd = utility.md5(req.body.newPwd);//新密码
    // 1.判断原密码和新密码是否一致
    if(oldPwd == newPwd) {
        return res.send({status: 1, message: '新旧密码不能一样'})
    }
    // 2.先检查原密码是否正确
    let r1 = await db('select * from user where password=? and id=?',[oldPwd,req.user.id]);
    if (r1.length === 0 || r1 === undefined) {
        return res.send({status:1,message:'原密码错误'})
    }

    // 3.更新密码
    let r2 = await db('update user set password=? where id =?',[newPwd,req.user.id])
    if (r2 && r2.affectedRows>0) {
        res.send({status:0,message:'修改密码成功'});
    }else{
        res.send({status:1,message:'修改密码失败'})
    }
})

//  更换头像接口
router.post('/update/avatar',async (req,res) => {
    let r = await db('update user set user_pic=? where id=?',[req.body.avatar, req.user.id])
    if (r && r.affectedRows>0) {
        res.send({status:0,message:'更换头像成功'});
    } else {
        res.send({status:1,message:'更换头像失败'});
    }
})

//  更新用户信息
router.post('/userinfo',async (req, res) =>{
     // 判断一下提交的id和当前用户的id是否一致
     if (req.body.id != req.user.id) {
         return res.send({status:1,message:'id错误,请重新登录'});
     }
     let r =await db('update user set ? where id=?',[req.body , req.user.id]);
     if (r && r.affectedRows>0) {
         res.send({status: 0 ,message:'更新用户信息成功'})
     } else {
         res.send({status:1,message:'更新用户信息失败'})
     }
});
module.exports = router;