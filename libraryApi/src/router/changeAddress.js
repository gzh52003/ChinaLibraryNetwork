const express = require('express');
const router = express.Router();
const mongo = require('../utils/mongo');
const {formatData} = require('../utils/tools')


// router.put('/:order_number',async (req,res)=>{
//     const {order_number} = req.params;
//     let {order_address} = req.body;
//     try{
//         await mongo.update('order',{order_number:order_number},{$set:order_address});
//         res.send(formatData({data:{order_number:order_number,order_address}}))
//     }catch(err){
//         console.log('err=',err);
//         res.send(formatData({code:0}))
//     }
// })

router.put('/:order_number',async (req,res)=>{
    const {order_number} = req.params;
    const {order_address} = req.body;
    console.log(order_number);
    // let {order_address} = req.body;
    let newData = {order_address}
    console.log(newData)
    try{
        await mongo.update('order',{order_number:order_number},{$set:newData});
        // res.send(formatData({data:{order_number:order_number,...newData}}))
        res.send(formatData({data:{order_number:order_number,...newData}}))
    }catch(err){
        // console.log('err=',err);
        res.send(formatData({code:0}))
    }
    
    
})
module.exports = router;