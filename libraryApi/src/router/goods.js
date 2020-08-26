const express = require('express');
const router = express.Router();
// const query = require('../utils/mysql');
const mongo = require('../utils/mongo');
const { formatData } = require('../utils/tools')









// get /api/goods 查询所有商品
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
    const result = await mongo.find('goods', obj, { skip, sort, limit })
    console.log("obj", obj);
    console.log("result", result);
    res.send(result);
    // res.send(formatData({ data: result }));
})


router.get('/check', async (req, res) => {
    console.log(123);
    const { title } = req.query;
    console.log("333333", req.query);
    const result = await mongo.find('goods', { title });
    console.log("666666666666", result);
    if (result.length > 0) {
        res.send(formatData({ code: 0 }))
    } else {
        res.send(formatData())
    }
    /*  const { title } = req.query;
     try {
         const result = await mongo.find('goods', { title });
         if (result.length > 0) {
             console.log("length 大于0");
         }
         res.send(formatData({ data: result }));
     } catch (error) {
         console.log("报错了", error);
         res.send(formatData());
     } */


})


//获取单个商品
router.get('/:id', async (req, res) => {
    let { id } = req.params


    // 查询所有商品
    const result = await mongo.find('goods', { _id: id }, {})

    res.send(formatData({ data: result }));
})



//改
router.put('/:id', async (req, res) => {
    const { id } = req.params;

    let { title, author, pulishTiem, publisher, sellPrice, discount, priceTit, kucun, recoLagu } = req.body;
    let newData = { title, author, pulishTiem, publisher, sellPrice, discount, priceTit, kucun, recoLagu }
    try {
        await mongo.update('goods', { _id: id }, { $set: newData });
        res.send(formatData({ data: { _id: id, ...newData } }))
    } catch (err) {
        res.send(formatData({ code: 0 }))
    }


})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const ids = id.split(",")
    console.log("id=", ids);

    
    try {
        const result = await mongo.remove('goods', { _id: { $in: ids } })
        res.send('success')


    } catch (err) {
        res.send('fail');
    }

})

//增加数据
router.post('/', async (req, res) => {

    let { title, author, pulishTiem, publisher, sellPrice, discount, priceTit, kucun, recoLagu } = req.body;
    console.log(req.body);
    let result
    try {
        result = await mongo.insert('goods', { title, author, pulishTiem, publisher, sellPrice, discount, priceTit, kucun, recoLagu });
        res.send(formatData());
    } catch (err) {
        res.send(forMatData({ code: 0 }))

    }
})




module.exports = router;