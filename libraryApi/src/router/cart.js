const express = require('express');
const router = express.Router();
// const query = require('../utils/mysql');
const mongo = require('../utils/mongo');
const { formatData } = require('../utils/tools')

router.get('/', async (req, res) => {
    let { page = 1, size, sort = "add_time", filedtype, value } = req.query;
    const skip = (page - 1) * size; //0
    const limit = size * 1; //10  
    let obj = {};
    console.log("value", value);
    value ? obj[filedtype] = value : "";
    // 处理排序参数
    sort = sort.split(',');// ['price'],['price','-1']
    // 查询所有商品
    const result = await mongo.find('cart', obj, { skip, sort, limit })
    console.log("obj", obj);
    console.log("result", result);
    res.send(result);
})


//增加数据
router.post('/', async (req, res) => {
    let { title, author, pulishTiem, publisher, sellPrice, qty, discount, priceTit, kucun, recoLagu } = req.body;
    console.log(req.body);
    let result
    try {
        result = await mongo.insert('cart', { title, author, pulishTiem, publisher, sellPrice, discount, priceTit, kucun, recoLagu , qty});
        res.send(formatData());
    } catch (err) {
        res.send(forMatData({ code: 0 }))

    }
})


router.delete('/:id',async (req,res)=>{
    const {id} = req.params;

    try{
        const result = await mongo.remove('cart',{_id:id})
        res.send(formatData())

    }catch(err){
        res.send(formatData({code:0}));
    }

})

module.exports = router;