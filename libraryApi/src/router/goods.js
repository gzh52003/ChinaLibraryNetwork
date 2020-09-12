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
    const result = await mongo.find("goods", obj, { skip, sort, limit })
    console.log("obj", obj);
    console.log("result", result);
    res.send(result);
})

//按照传过来的类型，从相应的数据库中查找值
//filedtype查询的字段, 查询的值value 
router.get('/all', async (req, res) => {
    let { page = 1, size = 10, sort = "add_time", filedtype, value, booktype } = req.query;
    //const skip = (page - 1) * size; //0
    //const limit = size * 1; //10  
    console.log(booktype);
    let obj = {};
    value ? obj[filedtype] = value : "";
    // 处理排序参数
    sort = sort.split(',');// ['price'],['price','-1']
    // 查询所有商品
    const result = await mongo.find(booktype, obj, { sort })
    // console.log("obj", obj);
    console.log("result", result);
    res.send(result);
})
















router.get('/check', async (req, res) => {
    // console.log(123);
    const { title, id, } = req.query;
    //console.log("333333", booktype);
    const result = await mongo.find("goods", { title });
    //console.log("666666666666", result);
    if (result.length > 0 && id !== result[0]._id.toString()) {
        res.send(formatData({ code: 0 }))
    } else {
        res.send(formatData())
    }
})

/* router.get('/check2', async (req, res) => {
    // console.log(123);
    const { id, booktype } = req.query;
    console.log('id', id);
    console.log("333333", booktype);
    const result = await mongo.find(booktype, { id });
    console.log("666666666666", result);
    if (result.length > 0 && id !== result[0]._id.toString()) {
        res.send(formatData({ code: 0 }))
    } else {
        res.send(formatData())
    }
})
 */

router.get('/book', async (req, res) => {
    const { id, booktype } = req.query;
    console.log('booktype', booktype);
    console.log('id', id);

    try {
        const result = await mongo.find(booktype, { _id: id })
        res.send(formatData({ data: result[0] }))

    } catch (err) {
        res.send(formatData({ code: 0 }));
    }
})

router.get('/search', async (req, res) => {
    let { page = 1, size, sort = "add_time", value } = req.query;
    const skip = (page - 1) * size; //0
    const limit = size * 1; //10  
    let obj = {};
    console.log("value", value);
    value ? obj["title"] = value : "";
    // 处理排序参数
    sort = sort.split(',');// ['price'],['price','-1']
    // 查询所有商品
    const result = await mongo.find('shehuikexue', obj, { skip, sort, limit })
    console.log("obj", obj);
    console.log("result", result);
    res.send(result);
})


router.get('/:id/kucun',async (req,res)=>{
    const {id} = req.params;
    try {
        const result = await mongo.find("cart", { _id: id })
        res.send(formatData({ data: result[0] }))

    } catch (err) {
        res.send(formatData({ code: 0 }));
    }
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