const { Router, urlencoded, json } = require('express');
// express.json===bodyParse.json, ....
const session = require('express-session')
const token = require('../utils/token');
const cors = require('../filter/cors')

//引入配置文件
const config = require('../config.json')


const router = Router();


const userRouter = require('./user');
const goodsRouter = require('./goods');
const regRouter = require('./reg');
const loginRouter = require('./login');
const vcodeRouter = require('./vcode');
const uploadRouter = require('./upload');
const orderRouter = require('./order');
const expressRouter = require('./express');
const changeAddressRouter = require('./changeAddress');
const cartRouter = require('./cart');
const { formatData } = require('../utils/tools');
const userinfoRouter = require('./userinfo/user');
//发送邮箱
const sendRouter = require("./sendEmail");

// CORS跨域
router.use(cors);

// 数据格式化中间件
router.use(urlencoded({ extended: false }), json())



// 使用session会话
// 通过req.session获取存入会话的数据
router.use(session({
    secret: 'laoxie',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        // 设置cookie有效期
        maxAge: 1000*60*60*2
    }
}))


// /api/user
// router.use('/user', userRouter);
//api/userinfo 获取用户信息
router.use('/userinfo',userinfoRouter);

// /api/goods
router.use('/goods', goodsRouter);

// 注册
router.use('/reg', regRouter);

// 登录
router.use('/login', loginRouter);

// 上传
router.use('/upload', uploadRouter);

// 校验token
router.get('/jwtverify',(req,res)=>{
    const {authorization} = req.query;
    console.log('test',authorization)

    // verify方法校验成功：得到一个对象
    // verify方法校验不通过：直接抛出错误
    // try{
    //     var decoded = jwt.verify(authorization, 'laoxie');
    //     res.send(formatData())
    // }catch(err){
    //     res.send(formatData({code:0}))
    // }

    if(token.verify(authorization)){
        res.send(formatData())
    }else{
        res.send(formatData({code:0}))
    }
});

router.use('/order',orderRouter);
router.use('/send', sendRouter);

router.use('/express',expressRouter);

router.use('/changeAddress',changeAddressRouter);

router.use('/cart',cartRouter);

// 验证码
router.use('/vcode', vcodeRouter);
module.exports = router;