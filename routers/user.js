// 路由文件中要有四个步骤
// 1. 加载express
// 2. 创建路由对象
// 3. 把接口挂载到路由对象上
// 4. 导出路由对象

const express = require('express');
const router = express.Router();

//   这里写接口
// 获取用户信息接口
router.get('/userinfo', async (req,res) => {
    //当用户请求这个借口的时候,作为服务器,该做什么
    // let r = await db('select * from user where id = ?')
    console.log(req.user);
    
});
module.exports = router;