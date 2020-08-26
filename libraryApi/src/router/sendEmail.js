const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');



router.post("/sendEmail",(req,res)=>{
    let transporter = nodemailer.createTransport({
        // host: 'smtp.ethereal.email',
        service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
        port: 465, // SMTP 端口
        secureConnection: true, // 使用了 SSL
        auth: {
          user: '1746934940@qq.com',//你的邮箱
          // 这里密码不是qq密码，是你设置的smtp授权码
          pass: 'lxeeeszgknwoiigd',
        }
      });
      let mailOptions = {
        from: '"小天哥哥"<1746934940@qq.com>', // 这里写上你自己的邮箱
        to: '1468995379@qq.com', // 这里写上要发送到的邮箱
        subject: '中国图书网登陆验证码，请不要告诉任何人哦！', // Subject line
        html: '<b>验证码为：456786 5分钟内有效</b>' // html body
      };
       
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('发送成功 Message sent: %s', info.messageId);
      });
})
module.exports = router;