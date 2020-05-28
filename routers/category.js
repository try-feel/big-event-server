// 路由文件中要有四个步骤
// 1. 加载express
// 2. 创建路由对象
// 3. 把接口挂载到路由对象上
// 4. 导出路由对象

const express = require('express');
const router = express.Router();
const path = require('path');
const db = require(path.join(__dirname, '../utils/db.js'));

//   这里写接口

//  获取文章分类列表
router.get('/cates', async (req, res) => {
    let r = await db('select * from category')
    if (r) {
        res.send({
            status: 0,
            message: '分类获取成功',
            data: r
        })
    } else {
        res.send({
            status: 1,
            message: '分类获取失败'
        })
    }
})
//  新增文章分类
router.post('/addcates', async (req, res) => {
    let r = await db('insert into category set ?', req.body)
    // console.log(r);

    if (r && r.affectedRows > 0) {
        res.send({
            status: 0,
            message: '添加分类成功'
        })
    } else {
        res.send({
            status: 1,
            message: '添加分类失败'
        })
    }
})
//  根据id删除文章分类
router.get('/deletecate/:id', async (req, res) => {
    let index = req.params.index;
    let r = await db('delete from category where id=?');
    if (r && r.affectedRows > 0) {
        res.send({
            status: 0,
            message: '删除分类成功'
        })
    } else {
        res.send({
            status: 1,
            message: '删除分类失败'
        })
    }
})

//  根据id更新文章分类
router.post('/updatecate',async (req, res) => {
    console.log(req.body);
    let r = await db('update category set ? where Id=?',[req.body, req.body.Id]);
    if (r && r.affectedRows > 0) {
        res.send({
            status: 0,
            message: '更新分类成功'
        })
    } else {
        res.send({
            status: 1,
            message: '更新分类失败'
        })
    }
})
module.exports = router;