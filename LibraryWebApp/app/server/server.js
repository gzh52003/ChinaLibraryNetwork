const express = require('express');
const fs = require('fs');

//创建一个服务器
const app = express();

// 启用静态资源服务器
app.use(express.static('./public'));

app.use((req,res)=>{
    const content = fs.readFileSync('./public/index.html');
    res.set('Content-Type','text/html;charset=utf-8');
    res.send(content.toString())
})

app.listen(2004,()=>{
    console.log('server is running on port 2004')
})