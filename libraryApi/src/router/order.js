const express = require('express');
const router = express.Router();
const mongo = require('../utils/mongo');
const {formatData} = require('../utils/tools')

//查
router.get('/',async (req,res)=>{
    // mongo
    const {pageNum,pageSize,fieldtype,value} = req.query;
    const limit = pageSize*1;
    const skip = (pageNum-1)*pageSize;
    let o={};
    value?o[fieldtype]=value*1 :"";
    console.log(o);
    const result = await mongo.find('order',o,{limit,skip})
    res.send(formatData({data:result}));
})

module.exports = router;