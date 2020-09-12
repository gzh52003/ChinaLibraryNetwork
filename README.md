# ChinaLibraryNetwork

#### 官网：http://m.bookschina.com/home/index
#### 上线网址
​    后台管理系统：120.24.89.48:2006
​        测试账号:admin
​        测试密码:123456
​    Webapp:120.24.89.48:2004
​        测试账号:admin
​        测试密码:123456

#### git仓库地址：https://github.com/gzh52003/ChinaLibraryNetwork

#### 团队分工
#####     组长：李佼娜

#####     成员：李明珍、韦雨兰

​       

```js
*负责模块说明
    *李佼娜：
        后台管理系统：订单管理模块、功能模块、全局组件和公共模块维护、协调工作。
        WebApp：搭建WebApp项目；首页、购物车模块、打包上线部署；分析和确认模块，分模块。
        API接口：订单查询接口；物流查询，后台修改物流地址。 

     *李明珍：
        后台管理系统：用户信息管理、个人中心、用户登录、注册；解决冲突、部署服务；分析和确认模块；协调工作。
        WebApp：用户登录、注册、个人中心、解决bug。
        API接口：API搭建项目框架；数据库表的设计;用户增、删、改、查；登录token验证；用户注册。 
    
     *韦雨兰：
        后台管理系统：爬取数据、渲染商品列表、添加商品、删除商品（单个商品删除，商品批量删除）、修改商品、商品查询，商品分页；优化用户体验；解决冲突；分析和确认模块。
        WebApp：爬取数据、商品分类页、商品列表页、商品详情页、编写readme.md文档。
        API接口：商品查询接口、删除接口、修改接口、增加接口；解决bug。
```

##项目页面截图（3-5张）：
![](D:\GZ2003\ChinaLibraryNetwork\ChinaLibraryNetwork\LibraryWebApp\app\public\images\封面.png "登录")

![](D:\GZ2003\ChinaLibraryNetwork\ChinaLibraryNetwork\LibraryWebApp\app\public\images\后台管理系统商品列表页.png "后台管理系统商品列表页")

![](D:\GZ2003\ChinaLibraryNetwork\ChinaLibraryNetwork\LibraryWebApp\app\public\images\后台管理系统订单页.png "后台管理系统订单页")

![](D:\GZ2003\ChinaLibraryNetwork\ChinaLibraryNetwork\LibraryWebApp\app\public\images\webApp-首页.jpg "webApp-首页")

![](D:\GZ2003\ChinaLibraryNetwork\ChinaLibraryNetwork\LibraryWebApp\app\public\images\webApp-我的.jpg "webApp-我的")



#### 项目目录说明：

```
├─libraryApi 	 接口API
│  └─src 	接口文件夹 
│      ├─filter 	跨域文件
│      ├─public 	根目录
│      │  └─uploads	后台图片文件
│      │      └─images	图片文件夹
│      ├─router     
│      │  └─userinfo    
│      └─utils	请求接口
├─libraryWeb	后台管理系统
│  ├─public	根目录
│  │  ├─data	数据
│  │  └─images	图片
│  └─src	数据文档
│      ├─components
│      ├─pages	组件文件
│      │  ├─goods	商品组件文件
│      │  ├─order	订单组件文件
│      │  ├─power 
│      │  └─user	用户组件文件
│      ├─router	路由配置文件
│      └─utils	请求文件
└─Library	 WebApp
    └─app
        ├─public	根目录
        │  └─images	图片
        └─src	 数据文档
            ├─router	路由配置文件
            ├─store	VUEX
            ├─utils	请求接口
            └─views	功能文件
```








