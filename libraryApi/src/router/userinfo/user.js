const express = require('express');
const router = express.Router();
const mongo = require('../../utils/mongo');
const {formatData,md5} = require('../../utils/tools');

//获取用户列表
router.get('/',async (req,res)=>{
    const {page=1,size=10} = req.query;
    const limit = size*1;
    const skip = (page-1)*size;
    const result = await mongo.find('userinfo',{},{limit,skip})
    res.send(formatData({data:result}));
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
    let {role,headImg,age,gender,email} = req.body;


    let newData = {role,headImg,age,gender,email}
    if(password){
        password = md5(password);
        newData.password = password
    }

    try{
        await mongo.update('userinfo',{_id:id},{$set:newData});
        res.send(formatData({data:{_id:id,...newData}}))
    }catch(err){
        // console.log('err=',err);
        res.send(formatData({code:0}))
    }
    
    
})
module.exports = router;