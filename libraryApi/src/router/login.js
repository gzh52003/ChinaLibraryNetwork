const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const token = require('../utils/token');

const { formatData,md5 } = require('../utils/tools');
const mongo = require('../utils/mongo');
const {password_privateKey}=require("../config.json");

// 登录
router.get('/', async (req, res) => {
    let { username:login, password, vcode, mdl } = req.query;

    // 从会话中获取验证码
    // 校验验证码
    // console.log('login.session=', req.session)
    if (vcode !== req.session.vcode) {
        res.send(formatData({ code: 10 }))
        return;
    }

    // 加密后进行查询
     const hash = crypto.createHash('md5');
     hash.update(password + password_privateKey); // 加盐 盐值
     password = hash.digest('hex');

    password = md5(password)

    let result = await mongo.find('user', { login, password },{field: { password: false }});//[{}]
    
    
    if (result.length > 0) {
        // 用户名、密码、验证码都校验通过后，判断是否有免登陆选项
        // 1. 生成token
        let authorization;
        if (mdl === 'true') {
            // token的操作
            
            authorization = token.create({ login }, '7d')
        }else{
            authorization = token.create({ login })
        }
        
        result = result[0];
        let userinfo = await mongo.find('userinfo', { login});
        Object.assign(result,userinfo);
        result.authorization = authorization
        res.send(formatData({ data: result }));
    } else {
        res.send(formatData({ code: 0 }))
    }
})



module.exports = router;