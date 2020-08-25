const express = require('express');
const router = express.Router();
const query = require('../utils/mysql');
const mongo = require('../utils/mongo');
const {formatData,md5} = require('../utils/tools')

// const mysql = require('mysql');

// 配置数据库
// 第一种：使用连接对象
// var connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : '',
//     database : 'jiaoxue'
// });

// 第二种：使用连接池（推荐）
//创建连接池：默认创建10个连接对象放到连接池中
// var pool  = mysql.createPool({
//     host     : 'localhost',
//     user     : 'root',
//     password : '',
//     database: 'jiaoxue',
//     multipleStatements: true
// });

router.get('/',async (req,res)=>{
    // 读取数据库，获取所有用户
    const {page=1,size=10} = req.query;
    const limit = size*1;
    const skip = (page-1)*size;
    const result = await mongo.find('user',{},{limit,skip,field:{password:false}})
    res.send(formatData({data:result}));
})

router.delete('/:id',async (req,res)=>{
    const {id} = req.params;
    try{
        await mongo.remove('user',{_id:id});
        res.send(formatData())
    }catch(err){
        res.send(formatData({code:0}))
    }
    
    
})

// 获取单个用户信息、
router.get('/:id',async(req,res)=>{
    const {id} = req.params;console.log('id=',id)

    const result = await mongo.find('user',{_id:id},{
        // 过滤字段：password不返回前端
        field:{password:false}
    });
    console.log(result)
    res.send(formatData({data:result[0]}));
})

router.put('/:id',async (req,res)=>{
    const {id} = req.params;
    let {password,age,gender} = req.body;
    let newData = {age,gender}
    if(password){
        password = md5(password);
        newData.password = password
    }

    try{
        await mongo.update('user',{_id:id},{$set:newData});
        res.send(formatData({data:{_id:id,...newData}}))
    }catch(err){
        // console.log('err=',err);
        res.send(formatData({code:0}))
    }
    
    
})
module.exports = router;