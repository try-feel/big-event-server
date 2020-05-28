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

// 发布新文章
// 获取文章列表数据
router.get('/list', async (req, res) => {
    // 获取四个参数
    let pagenum = req.query.pagenum || 1; //默认获取第一页的数据
    let pagesize = req.query.pagesize || 2; //默认每页显示两条
    let cate_id = req.query.cate_id; //分类id
    let state = req.query.state; //状态

    // 组合where条件
    let w = '';
    if (cate_id) {
        w += ' cate_id=' + cate_id + 'and';
    }
    if (state) {
        w += `state='$(state)' and`;
    }
    //查询文章列表数据
    let r = await db(`select a.Id, a.title, a.pub_date, a.state, a.state, c.name cate_name from article a join category c on a.cate_id=c.Id where ${w} author_id=? limit ${(pagenum- 1) * pagesize}, ${pagesize}`, req.user.id);

    //查询文章总数
    let r2 = await db(`select count(*) total from article where ${w} author_id=?`, req.user.id);
    // console.log(r2);

    if (r && r2) {
        res.send({
            status: 0,
            message: '获取列表成功',
            data: r,
            total: r2[0].total
        })
    } else {
        res.send({
            status: 1,
            message: '获取文章列表失败'
        })
    }
})
// 根据id删除文章数据
// 根据id获取文章详情


module.exports = router;