const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const {formatData,md5} = require('../utils/tools');
const mongo = require('../utils/mongo');
const {password_privateKey}=require("../config.json");
const { log } = require('console');

// RESTful api规范
// 注册
router.post('/',async (req,res)=>{
    let {username,password} = req.body;
    
    const hash = crypto.createHash('md5');
    hash.update(password+password_privateKey); // 加盐 盐值
    password = hash.digest('hex');
    
    password = md5(password)
    let result
    try{
        result = await mongo.insert('user',{login:username,password});
        result = await mongo.insert('userinfo',{login:username});
        res.send(formatData());
    }catch(err){
        res.send(forMatData({code:0}))

    }
})

router.get('/check',async (req,res)=>{
    const {username,_id} = req.query;
    
    let result = await mongo.find('user',{login:username});
    result = result.filter(item=>item._id != _id);
    console.log("输出过滤结果result:",result);
    if(result.length>0){
        res.send(formatData({code:0}))
    }else{
        res.send(formatData())
    }
})


module.exports = router;