const fs = require('fs');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');

/* const imgurl = "http://image12.bookschina.com/2019/20191223/1/s6810575.jpg";
const filename = path.basename(imgurl);
console.log(filename);
const fileStream = fs.createWriteStream('../images/' + filename);
request(imgurl).pipe(fileStream);
 */

// 1.获取目标html结构(要扒数据所在的地址)
const url = 'http://www.bookschina.com/kinder/53210000/';
//res请求地址响应的对象。响应回来的数据
request(url, (err, res, body) => {
    let $ = cheerio.load(body);
    const goodslist = []
    //.cate_search_content是父级，.selItem是小框框
    $('.bookList').find('li').each((idx, el) => {
        const $el = $(el);
        /*  let price = $el.find('.price').text()
         // 价格前面有￥,要过滤掉。数字开头，后面的拿一个以上。用mach会拿到一个数组，价格是数组中的第一个元素
         price = price.match(/[\d\.]+/)[0] */
        const imgurl = $el.find('.cover a img').attr('data-original')


        // 2. 爬取图片到本地
        // request请求图片地址，返回一个数据流
        const filename = path.basename(imgurl);
        console.log(filename);
        const fileStream = fs.createWriteStream('../images/' + filename);
        request(imgurl).pipe(fileStream);



        const goods = {
            // price,
            //设置图片的路径
            imgurl: 'images/' + filename
        }
        goodslist.push(goods);
    });
    console.log(goodslist);
})
//在npm中执行`node spider`



/* lis = $0.querySelectorAll('li')
var arr = []
lis.forEach((li,index) => {
    let obj = {}
    obj.id = index
    obj.url = li.querySelector('.cover a .lazyImg').src
    obj.title = li.querySelector('.infor .name a').innerText
    obj.author = li.querySelector('.otherInfor .author').innerText
    obj.pulishTiem = li.querySelector('.otherInfor .pulishTiem').innerText
    obj.publisher = li.querySelector('.otherInfor .publisher').innerText
    obj.sellPrice = li.querySelector('.priceWrap .sellPrice').innerText
    obj.discount = li.querySelector('.priceWrap .discount').innerText
    obj.priceTit = li.querySelector('.priceWrap del').innerText
    obj.recoLagu = li.querySelector('.recoLagu').innerText
    obj.kucun = 43435
    obj.xiaoliang = 54545
    obj.shangjiatime = ''
    //想要class名为statistics-view元素内的数据，判断这个元素有没有，没有则赋值为空。
    if (li.querySelector('.statistics-view')) {
        obj.span = li.querySelector('.statistics-view').innerText
    } else {
        obj.span = ''
    }
    //在此处打印obj可以查看报错是在哪里断开的。备注在代码中无效。
    console.log(obj)
    arr.push(obj)
})
JSON.stringify(arr)
 */













