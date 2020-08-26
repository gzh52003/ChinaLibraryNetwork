const express = require('express');
const router = express.Router();
const mongo = require('../utils/mongo');
const {formatData} = require('../utils/tools')

router.get('/:order_number',async(req,res)=>{
    const {order_number} = req.params;
    console.log('order_number=',order_number)
    const result = await mongo.find('express',{order_number:order_number});
    console.log(result)
    res.send(formatData({data:result[0]}));
})

module.exports = router;