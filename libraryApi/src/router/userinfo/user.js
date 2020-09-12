const express = require('express');
const router = express.Router();
const mongo = require('../../utils/mongo');
const crypto = require('crypto');
const {formatData,md5} = require('../../utils/tools');
const {password_privateKey}=require("../../config.json");

//获取用户列表
router.get('/',async (req,res)=>{
    let {page=1,size=10,value,typeKey} = req.query;
    const limit = size*1;
    const skip = (page-1)*size;
    let o = {};

    value?o[typeKey]=new RegExp(value):"";
    
    
    const result = await mongo.find('userinfo',o,{limit,skip})
    const {count} = await mongo.findcount('userinfo',o,{limit,skip})
    res.send(formatData({data:{data:result,count}}));
});
//删除删除
router.delete('/:id',async (req,res)=>{
    const {id} = req.params;
    try{
        await mongo.remove('userinfo',{_id:id});
        res.send(formatData())
    }catch(err){
        res.send(formatData({code:0}))
    }
});

//批量删除
router.delete('/',async (req,res)=>{
    const {idarr} = req.query;
    // if(typeof idarr === "string"){
    //     idarr = JSON.parse(idarr);
    // }
    console.log("输出一下idarr",idarr);
    try{
        await mongo.remove('userinfo',{_id:{$in:idarr}});
        res.send(formatData())
    }catch(err){
        res.send(formatData({code:0}))
    }
});
// 获取单个用户信息、
router.get('/:id',async(req,res)=>{
    const {id} = req.params;console.log('id=',id)

    const result = await mongo.find('userinfo',{_id:id},{
        // 过滤字段：password不返回前端
        field:{password:false}
    });
    console.log(result)
    res.send(formatData({data:result[0]}));
})

router.put('/:id',async (req,res)=>{
    const {id} = req.params;
    let {role,headImg,age,gender,email,username} = req.body;


    let newData = {role,headImg,age,gender,email,username}
    // if(password){
    //     password = md5(password);
    //     newData.password = password
    // }

    try{
        await mongo.update('userinfo',{_id:id},{$set:newData});
        res.send(formatData({data:{_id:id,...newData}}))
    }catch(err){
        // console.log('err=',err);
        res.send(formatData({code:0}))
    }
})

router.post('/',async (req,res)=>{
    let {login,username,password,gender,age,email,role,baseurl,headImg} = req.body;
    
    const hash = crypto.createHash('md5');
    hash.update(password+password_privateKey); // 加盐 盐值
    password = hash.digest('hex');
    
    password = md5(password)
    let result,userres
    try{
        result = await mongo.insert('userinfo',{login,username,gender,age,email,role,baseurl,headImg});
        userres = await mongo.insert('user',{login,password});
        res.send(formatData());
    }catch(err){
        res.send(forMatData({code:0}))

    }
})
module.exports = router;