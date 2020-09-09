<template>
  <div class="home">
    <div class="pageWrap">
      <!-- 头部 -->
        <header>
          <van-row>
            <van-col span="8">
              <h1>
                <img src="../../public/images/logo.png" alt="中国图书网">
              </h1>
            </van-col>
            <van-col span="13">
              <van-cell-group>
                <van-field v-model="value" @focus="searchInput()" class="searchInput" placeholder="日本学术文库-日本的佛教与神祇信仰" />
              </van-cell-group>
            </van-col>
            <van-col span="3">
              <van-icon class="search" name="search" color="#fff" />
            </van-col>
          </van-row>
        </header>
      <!-- 首页轮播图 -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in bannerHome" :key="item.title">
          <a href="">
            <img :src="item.img" alt="item.title">
          </a>
        </van-swipe-item>
      </van-swipe>

      <!-- 快捷工具栏 -->
      <van-grid :column-num="5" :border="false">
        <van-grid-item v-for="item in navHome" :key="item.title" >
        <van-image :src="item.img_url" />
        <p class="toolsTit">{{item.title}}</p>
        </van-grid-item>
      </van-grid>

      <!-- 公告栏 -->
      <van-notice-bar left-icon="volume-o" :scrollable="false" color="red" background="#fff">
        <van-swipe
          vertical
          class="notice-swipe"
          :autoplay="3000"
          :show-indicators="false"
        >
          <van-swipe-item>
            <a href="">每日签到抽红包！</a>
            </van-swipe-item>
          <van-swipe-item>
            <a href="">新用户注册即送10元!</a>
            </van-swipe-item>
        </van-swipe>
      </van-notice-bar>

  

      <!-- 广告栏 -->
      <van-swipe class="my-swipe bannerBar" :autoplay="3000" indicator-color="white">
         <van-swipe-item>
          <img src="../../public/images/fzp700185.jpg" alt="">
        </van-swipe-item>
      </van-swipe>

      <!-- 今日值得看 -->
      <div class="newBookWrap">
        <!-- 今日值得看标题 -->
        <div class="newBookWrapTit">
          <van-row>
            <van-col span="20">
              <h2 class="newBookWrapTith">今日值得买</h2>
              </van-col>
            <van-col span="4">
              <!-- <van-button round type="default" size="mini" class="newBookWrapTitM">
                <span class="newBookWrapTitMore">更多</span>
                <van-icon name="arrow" />
                </van-button> -->
            </van-col>
          </van-row>
        </div>

        <!-- 今日值得看内容 -->
        <div class="newBookList">
          <van-grid :column-num="3" :border="false" :center="false">
            <van-grid-item v-for="item in newBookList" :key="item.title" >
            <van-image :src="item.img" class="newBookListImg" />
            <p class="newBookListTit">{{item.name}}</p>
            <p class="priceWrap">
              <span class="price">{{item.price}}</span>
              <del class="original">{{item.original}}</del>
            </p>
            </van-grid-item>
          </van-grid>
        </div>
      </div>

      <!-- 广告轮播图栏 -->
      <van-swipe class="my-swipe bannerSwiper" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in bannerSwiper" :key="item.title">
          <a href="">
            <img :src="item.img" alt="item.title">
          </a>
        </van-swipe-item>
      </van-swipe>

      <!-- 淘书团 -->
      <div class="tstWrap">
        <!-- 淘书团标题 -->
        <div class="tstTit">
          <van-row>
            <van-col span="20">
              <h2 class="tstWrapTith commomTith">
                <img src="../../public/images/taoshutuantitle.png" alt="">
              </h2>
              </van-col>
            <van-col span="4">
              <!-- <van-button round type="#666" size="mini" class="tstWrapTitM">
                <span class="tstWrapMore">更多</span>
                <van-icon name="arrow" />
              </van-button> -->
            </van-col>
          </van-row>
        </div>

        <!-- 淘书团内容 -->
        <div class="tstListW">
          <van-grid :column-num="2" :border="false" class="tstList" :center="false">
            <van-grid-item v-for="item in tst" :key="item.name" >
              <van-image :src="item.img" class="tstListImg" />
              <p class="tstListTit">
                <span class="tstListTitName"><van-tag type="danger">团</van-tag>{{item.name}}</span>
              </p>
              <div class="Tprice">
                <van-row type="flex">
                  <van-col span="14" class="TpriceT">
                    团购价:<span class="TpriceTPrice">{{item.price}}</span>
                  </van-col>
                </van-row>
              </div>
              <p class="tstListpriceWrap">
                <van-row>
                  <van-col span="16">
                    <del class="tstOriginal">{{item.original}}</del>
                  </van-col>
                  <van-col span="8">
                    <van-tag mark type="warning" class="tstDiscount">{{item.discount}}</van-tag>
                  </van-col>
                </van-row>
              </p>
            </van-grid-item>
          </van-grid>
        </div>
      </div>

      <!-- 读者热评 -->
      <div class="hottockWrap">
        <!-- 读者热评标题 -->
        <div class="hottockTit">
          <van-row>
            <van-col span="20">
              <h2 class="hottockTith commomTith">
                <img src="../../public/images/userhottocktitlle.png" alt="">
              </h2>
            </van-col>
          </van-row>
        </div>
        <div class="hottockList">
          <div class="hottockListTop">
            <van-row>
              <van-col span="10">
                <van-grid :column-num="1" :border="false" class="hottockListTopL" :center="false">
                <van-grid-item v-for="item in hottockListTop" :key="item.name" >
                  <van-image :src="item.img" class="hottockListImg" />
                </van-grid-item>
              </van-grid>
              </van-col>
              <van-col span="14">
                <van-grid :column-num="1" :border="false" class="hottockListTopL" :center="false">
                  <van-grid-item v-for="item in hottockListTop" :key="item.name" >
                    <div class="hottockListTopR">
                      <p class="name">{{item.name}}</p>
                      <div class="startWrap"><span class="full"></span><span class="full"></span><span class="full"></span><span class="full"></span><span class="full"></span>
                      <b>{{item.tock}}</b></div>
                      <div class="hottockListPriceWrap">
                        <span class="price">{{item.price}}</span>
                        <del class="original">{{item.original}}</del>
                      </div>
                      <div class="hottockListReview">
                        <span>[好评]</span>
                        {{item.review}}</div>
                    </div>
                  </van-grid-item>
                </van-grid>
              </van-col>
            </van-row>
          </div>

          <!-- 读者热评内容下半部分 -->
          <div class="hottockListBot">
            <van-grid :column-num="2" class="hottockListBotT" >
              <van-grid-item v-for="item in hottockListBot" :key="item.name" >
                <van-image :src="item.img" class="hottockListBotTImg" />
                <div class="hottockListBotB">
                  <p class="name">{{item.name}}</p>
                  <div class="startWrap"><span class="full"></span><span class="full"></span><span class="full"></span><span class="full"></span><span class="full"></span>
                  <b>{{item.tock}}</b></div>
                  <div class="hottockListBotBPriceWrap">
                    <span class="price">{{item.price}}</span>
                    <del class="original">{{item.original}}</del>
                  </div>
                  <div class="hottockListBotBReview">
                    <span>[好评]</span>
                    {{item.review}}</div>
                </div>
              </van-grid-item>
            </van-grid>
          </div>
        </div>
        <div class="hottockMain">
          <van-row>
            <van-col span="24">
              <div class="fiveStarLink">
                  <a href="#">查看五星书&gt;&gt;</a>
              </div>
            </van-col>
          </van-row>
        </div>
      </div>

      <!-- 推荐书单 -->
      <div class="recommendWrap">
        <div class="recommendTit">
          <van-row>
            <van-col span="24">
              <h2 class="hottockTith commomTith">
                <img src="../../public/images/recomandtitle.png" alt="">
              </h2>
            </van-col>
          </van-row>
        </div>
      <!-- 推荐书单内容 -->
        <div class="recommenList">
          <van-row>
          <van-col span="12">
            <van-grid :column-num="1" :border="false" class="recommenListL" :center="false">
                <van-grid-item v-for="item in recommenListL" :key="item.name" >
                  <van-image :src="item.img" class="recommenListLImg" />
                </van-grid-item>
            </van-grid>
          </van-col>
          <van-col span="12" class="recommenListRB">
            <van-grid :column-num="1" :border="false" class="recommenListR" :center="false">
                <van-grid-item v-for="item in recommenListR" :key="item.name" class="recommenListRT">
                  <van-image :src="item.img" class="recommenListRImg" />
                </van-grid-item>
            </van-grid>
          </van-col>
        </van-row>
        </div>
      </div>

      <!-- 新书速递 -->
      <div class="BookCourierWrap">
        <div class="BookCourierTit">
          <van-row>
            <van-col span="24">
              <h2 class="BookCourierTith commomTith">
                <img src="../../public/images/newtitle.png" alt="">
              </h2>
            </van-col>
          </van-row>
        </div>
        <!-- 新书速递内容 -->
        <div class="courierList">
          <van-grid :column-num="3" :border="false" :center="false">
            <van-grid-item v-for="item in BookCourierList" :key="item.title" >
            <van-image :src="item.img" class="courierListImg" />
            <p class="courierListTit">{{item.name}}</p>
            <p class="priceWrap">
              <span class="price">{{item.price}}</span>
              <del class="original">{{item.original}}</del>
            </p>
            </van-grid-item>
          </van-grid>
        </div>
      </div>


      <!-- 畅销榜 -->
      <div class="sellHotWrap">
        <div class="sellHotTit">
          <van-grid :column-num="1" :border="false">
            <van-grid-item v-for="item in sellHotTit" :key="item.img" >
            <van-image :src="item.img" class="courierListImg" />
            </van-grid-item>
          </van-grid>
        </div>

        <!-- 畅销榜内容 -->
        <div class="sellHotBook">
          <van-tabs v-model="activeName" @click="getGeneralList(activeName)" sticky>
            <van-tab title="总榜" name="shehuikexue">
              <van-grid :column-num="2" class="sellHotBookList">
                <van-grid-item v-for="item in data" :key="item._id" @click="gotoDetail(item._id)">
                  <van-image :src="item.url" class="sellHotBookImg"/>
                  <h4 class="sellHotBookListName">{{item.title}}</h4>
                  <p class="sellHotBookprice">
                    <span>{{item.sellPrice}}</span>
                    <del>{{item.priceTit}}</del>
                  </p>
                </van-grid-item>
              </van-grid>
            </van-tab>
            <van-tab title="文学" name="gushici"> 
              <van-grid :column-num="2" class="sellHotBookList">
                <van-grid-item v-for="item in data" :key="item._id" @click="gotoDetail(item._id)">
                  <van-image :src="item.url" class="sellHotBookImg"/>
                  <h4 class="sellHotBookListName">{{item.title}}</h4>
                  <p class="sellHotBookprice">
                    <span>{{item.sellPrice}}</span>
                    <del>{{item.priceTit}}</del>
                  </p>
                </van-grid-item>
              </van-grid>
            </van-tab>
            <van-tab title="社科" name="shehuikexue">
              <van-grid :column-num="2" class="sellHotBookList">
                <van-grid-item v-for="item in data" :key="item._id" @click="gotoDetail(item._id)">
                  <van-image :src="item.url" class="sellHotBookImg"/>
                  <h4 class="sellHotBookListName">{{item.title}}</h4>
                  <p class="sellHotBookprice">
                    <span>{{item.sellPrice}}</span>
                    <del>{{item.priceTit}}</del>
                  </p>
                </van-grid-item>
              </van-grid>
            </van-tab>
            <van-tab title="少儿" name="dongmankatong">
              <van-grid :column-num="2" class="sellHotBookList">
                <van-grid-item v-for="item in data" :key="item._id" @click="gotoDetail(item._id)">
                  <van-image :src="item.url" class="sellHotBookImg"/>
                  <h4 class="sellHotBookListName">{{item.title}}</h4>
                  <p class="sellHotBookprice">
                    <span>{{item.sellPrice}}</span>
                    <del>{{item.priceTit}}</del>
                  </p>
                </van-grid-item>
              </van-grid>
            </van-tab>
            <van-tab title="艺术" name="yishulilun">
              <van-grid :column-num="2" class="sellHotBookList">
                <van-grid-item v-for="item in data" :key="item._id" @click="gotoDetail(item._id)">
                  <van-image :src="item.url" class="sellHotBookImg"/>
                  <h4 class="sellHotBookListName">{{item.title}}</h4>
                  <p class="sellHotBookprice">
                    <span>{{item.sellPrice}}</span>
                    <del>{{item.priceTit}}</del>
                  </p>
                </van-grid-item>
              </van-grid>
            </van-tab>
            <van-tab title="生活" name="shehuikexue">
              <van-grid :column-num="2" class="sellHotBookList">
                <van-grid-item v-for="item in data" :key="item._id" @click="gotoDetail(item._id)">
                  <van-image :src="item.url" class="sellHotBookImg"/>
                  <h4 class="sellHotBookListName">{{item.title}}</h4>
                  <p class="sellHotBookprice">
                    <span>{{item.sellPrice}}</span>
                    <del>{{item.priceTit}}</del>
                  </p>
                </van-grid-item>
              </van-grid></van-tab>
            <van-tab title="文教" name="shehuikexue">
              <van-grid :column-num="2" class="sellHotBookList">
                <van-grid-item v-for="item in data" :key="item._id" @click="gotoDetail(item._id)">
                  <van-image :src="item.url" class="sellHotBookImg"/>
                  <h4 class="sellHotBookListName">{{item.title}}</h4>
                  <p class="sellHotBookprice">
                    <span>{{item.sellPrice}}</span>
                    <del>{{item.priceTit}}</del>
                  </p>
                </van-grid-item>
              </van-grid>
            </van-tab>
          </van-tabs>
        </div>

        <div class="sellHotMore">
          <van-row>
            <van-col span="24">
              <div class="enterSellHot">
                  <a href="#">进入畅销榜&gt;&gt;</a>
              </div>
            </van-col>
          </van-row>
        </div>

      </div>


      <!-- 页面底部 -->
      <div class="pagefoot">
        <div class="actions-wrap">
          <van-row type="flex" justify="center">
              <van-col span="7"></van-col>
              <van-col span="6" class="actions"><van-button type="default" size="mini" to="index">登录</van-button></van-col>
              <van-col span="11" class="actions"><van-button type="default" size="mini" to="index">注册</van-button></van-col>
          </van-row>
        </div>

        <div class="nav">
          <van-row class="navCla">
            <van-col span="8" class="red">
              <a href="#">触屏版</a>
            </van-col>
            <van-col span="8">
              <a href="#">电脑版</a>
            </van-col>
            <van-col span="8">
              <a href="#">帮助</a>
            </van-col>
          </van-row>
        </div>


        <div class="copyRight">
          <van-row class="copyRightCla">
            <van-col span="24" class="red">Copyright 中国图书网©2018 m.BooksChina.com</van-col>
          </van-row>
        </div>
      </div>

      <!-- 回到顶部 -->
      <div class="fixed_box">
        <van-row>
            <van-col span="24" class="fixed_boxCla">
              <div class="toTop" @click="toTop()">
                <img src="../../public/images/backtop.png" alt="返回顶部">
              </div>
            </van-col>
        </van-row>
      </div>



    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Swipe, SwipeItem, Lazyload,Col, Row ,Field,Cell, CellGroup, NoticeBar} from "vant";
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Col);
Vue.use(Row);
Vue.use(Field);
Vue.use(Cell).use(CellGroup);
Vue.use(NoticeBar);


export default {
  name: "Home",
  data() {
    return {
      data:"",
      value:"",
      active:0,
      activeName:"shehuikexue",
      value: '',
      booktype:'shehuikexue',
      bannerHome:[
        {
          title:"满200减100",
          img:"images/banner1.jpg"
        },
        {
          title:"港台敦煌学文库",
          img:"images/banner2.jpg"
        },
        {
          title:"渡边淳乐园三部曲",
          img:"images/banner3.jpg"
        },
        {
          title:"王小波精选珍藏集",
          img:"images/banner4.jpg"
        },
        {
          title:"写给儿童的世界历史",
          img:"images/banner5.jpg"
        },
        {
          title:"字里行间文库",
          img:"images/banner6.jpg"
        },
        {
          title:"大师手绘本·格林童话",
          img:"images/banner7.jpg"
        },
      ],
      navHome: [
        {
          img_url:"images/changxiaobang.png",
          title:"畅销榜"
        },
        {
          img_url:"images/taoshutuan.png",
          title:"淘书团"
        },
        {
          img_url:"images/freepost.png",
          title:"9.9包邮"
        },
         {
          img_url:"images/new.png",
          title:"新上架"
        },
        {
          img_url:"images/publisher.png",
          title:"出版社"
        }
      ],
      newBookList: [
        {
          name:"胡适的情缘与晚境",
          img:"images/s2817470.jpg",
          price:"¥9.2",
          original:"¥30.0",
        },
        {
          name:"交响情人梦",
          img:"images/s3286658.jpg",
          price:"¥8.1",
          original:"¥20.0",
        },
        {
          name:"第三者-希区柯克悬念故事集-惊悚悬念袖珍馆I-02-经典随身读",
          img:"images/s5881513.jpg",
          price:"¥3.6",
          original:"¥15.0",
        },
        {
          name:"克里奥佩特拉的女儿",
          img:"images/s5687148.jpg",
          price:"¥13.0",
          original:"¥32.0",
        },
        {
          name:"美国夫人",
          img:"images/s4781707.jpg",
          price:"¥14.6",
          original:"¥36.0",
        },
        {
          name:"是你.制造了天气",
          img:"images/s4745646.jpg",
          price:"¥9.6",
          original:"¥28.0",
        },
      ],
      bannerSwiper:[
        {
          title:"扶他柠檬茶推荐书单",
          img:"/images/700185(1).jpg"
        },
        {
          title:"全场活动",
          img:"/images/700185(2).jpg"
        },
        {
          title:"马伯庸推荐书单",
          img:"/images/700185(3).jpg"
        }
      ],
      tst:[
        {
          name:"日本著名作家渡边淳一情爱指引四部曲“欲情四课”臻美典藏纪念套装！《男人这东西》《女人这东西》《丈夫这东西》《欲情课》精装全4册，陆求实、李迎跃翻译。这是一套书写两性关系的经典读本，身为情爱文学大师的渡边淳一以医生、作家、情圣的三重身份，以医学知识和生活经验为基础，从生理、心理角度真诚相告，阐释恋爱与婚姻的奥秘与规律。定价159.2元，现团购价48元包邮！",
          img:"images/14151_20200903064039.jpg",
          Tprice:"团购价",
          price:"¥48",
          original:"原价¥159.2 ",
          discount:"3.0折",
        },
        {
          name:"《钱文忠集》9册，上海三联书店出版，包含佛学论文集《天竺与佛陀》，书评文集《瓦釜集》，时评文集《文中有话》，史评文集《钱文忠品读人与城》，随笔集《戊子草》《己丑草》《庚寅草》《人文精神的桃花源》，还有叙述恩师成长经历及学术思想的《季门立雪》。总定价241.4元，现团购价65元包邮！",
          img:"images/14149_20200904091544.jpg",
          Tprice:"团购价",
          price:"¥65",
          original:"原价¥241.4",
          discount:"2.7折",
        },
        {
          name:"企鹅经典童书原版引进《瓢虫仙子成长故事》绘本全七册，铜版纸全彩图文，美国亚马逊五星畅销图书，曾连续82周荣登《纽约时报》童书榜单，深受家长与孩子喜爱。本系列以“瓢虫仙子”露露的日常生活为主题，通过活泼可爱的图画和浅显易懂的文字，讲述了7个富于生活气息的故事，风格幽默，独具匠心，和孩子们探讨想象与独立、责任与担当、冒险与勇气、积极与乐观、友谊与妥协、对立与合作以及换位思考等成长课题。定价96.6元，",
          img:"images/9141_20180919062318.jpg",
          Tprice:"团购价",
          price:"¥29",
          original:"原价¥96.6",
          discount:"3.0折",
        },
        {
          name:"市面少见！胡兰成作品精装2册：尘封三十年遗稿初次曝光《文明皇后》，附有精美手稿高清影印，散文笔法写就别样拓跋魏史，文明皇后、崔浩千年后终获知己；在日本封尘半个世纪的《易经与老子》，乱世文人胡兰成以其特殊经历讲述《易经》与《老子》，观点独到，此为大陆初次出版中译本。两册均由陈丹青题写书名，装帧精美，宜读宜藏。定价86元，现团购价69元包邮！",
          img:"images/14154_20200904101415.jpg",
          Tprice:"团购价",
          price:"¥69",
          original:"原价¥86.0 ",
          discount:"8.0折",
        },
      ],
      hottockListTop:[
        {
          name:"时间停止的那一天",
          img:"images/s7578997.jpg",
          tock:"8条评论",
          price:"¥15.0",
          original:"¥42.8",
          review:"触动万千读者的热销书《一个人的朝圣》作者口碑新作，跨越两个时空，善良、焦虑、不完美却又真实迷人的灵魂，努力在爱中弥补伤害，也终将获得力量，像个英雄一样从黑暗走入光明。读完之后，你会爱上书中的角色，他们善良、焦虑、有缺陷、有趣而美好。全书附有45幅英国原版木刻插画，描绘精致，画面生动。",
        }
      ],
      hottockListBot:[
        {
          name:"汉语成语小词典-第6版",
          img:"images/s5585727.jpg",
          tock:"11条评论",
          price:"¥5.7",
          original:"¥17.8",
          review:"释义准确，拼音规范，例句简明，特别适合中小学教师生和一般语文工作者使用。是深受读者欢迎的畅销书之一。",
        },
        {
          name:"龙居景观-中国人的空间艺术",
          img:"images/s2271029.jpg",
          tock:"33条评论",
          price:"¥14.4",
          original:"¥36.0",
          review:"豆瓣8分，一个日本学者对中国空间艺术的多情研究，一本随笔式的中国空间艺术美论著，短小精悍而论说深刻，触及中国文化深层次一面。",
        }
      ],
      recommenListL:[
        {img:"images/305417.jpg"},
      ],
      recommenListR:[
        {img:"images/305197.jpg"},
        {img:"images/wc305212.jpg"},
      ],
      BookCourierList:[
        {
          name:"大西岛",
          img:"images/s6777048.jpg",
          price:"¥7.3",
          original:"¥22.8",
        },
        {
          name:"冷战的静谧边界/全新视角，精微解读",
          img:"images/s7825158.jpg",
          price:"¥32.0",
          original:"¥68.0",
        },
        {
          name:"浅语的艺术/娓娓道出童书写作的秘密",
          img:"images/s7649896.jpg",
          price:"¥12.2",
          original:"¥32.0",
        }
      ],
      sellHotTit:[
        {
          img:"images/changxiaobangtitle.png",
        }
      ],
      allItem:[],
      title:"title",
      icon: {
        active: 'https://img.yzcdn.cn/vant/user-active.png',
        inactive: 'https://img.yzcdn.cn/vant/user-inactive.png',
      },
    };
  },
  components: {},
 
  methods:{
    async getGeneralList( booktype ){
      this.booktype = booktype;
      const { data } = await this.$request.get("/goods/all",{
        params:{booktype}
      });
      this.data = data;
      //console.log("data=", data);
    },
    toTop(){
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // 表示平滑的滚动
      })
    },
    gotoDetail(id){
      let booktype=this.booktype;
      // this.$router.push(`/goods/all/${id}`)
      this.$router.push({
        name:'Goods',
        params:{
          booktype,
          id,
        }
      })
    },
    searchInput(){
       //console.log(this.value);
        // const { data:res } = await this.$request.get("/goods/search",{
        //   params:{["value"]:this.value}
        // });
        // this.data = res;
        // this.$router.push(`/goods/all/${id}`)
        this.$router.push({
          name:'Search',
        })
       
    }

  },
  created() {
    let booktype=this.booktype;
    this.getGeneralList(booktype);

    
  }
}
</script>
<style lang="scss" scoped>
.pageWrap{
  padding-bottom:80px;
}
/* 头部css */
header{
  height:52px;
  background:#e60000;
  .van-row{
    height:52px;
    .van-col{
      height:52px;
      h1{
        position: absolute;
        left: 0;
        top: 0;
        height: 36px;
        margin-top: 8px;
        img{
          height:36px;
        }
      }
    }
  }
}
.van-hairline--top-bottom{
    height: 36px;
    margin-top: 8px;
    border-radius: 36px;
    line-height: 36px;
}
.search{
  font-size:30px;
  padding-top:11px;
  margin-left:10px;
}
.van-field{
    height: 36px;
    padding:0px;
    padding-left:10px;
    font-size:14px;
    line-height: 36px;
    border-radius: 36px;
}
.van-field__body{
  text-indent: 12px;
  border-radius: 36px;
}

/* 首页轮播图css */
.my-swipe .van-swipe-item {
  height: 140px;
  text-align: center;
  background-color: #ccc;
  img {
    width:100%;
    height: 100%;
  }
}

/* 快捷工具栏 */
.toolsTit{
  font-size:0.8rem;
}

/* 广告栏 */
.notice-swipe {
    height: 20px;
    line-height: 20px;
}
.van-notice-bar{
  font-size:0.24rem;
  height:30px;
  margin:10px;
}

/* 广告栏 */
.bannerBar{
  margin:0 auto;
  img{
    width:100%;
    height: 100%;
  }
}

/* 今日值得看 */
.newBookWrap{
  padding-bottom: 10px;
  .newBookWrapTit{
    height:34px;
    background:#f9bd00;
    .newBookWrapTith{
      font-size:0.8rem;
      line-height:34px;
      color: #fff;
      margin-left:10px;
    }
  }
  .newBookWrapTitM{
    font-size:0.8rem;
    line-height:24px;
    color: #fff;
    background:#f9bd00;
    margin-top:5px;
    .newBookWrapTitMore{
      padding:0 5px;
    }
  }
}
.newBookListImg{
  height:100px;
}
.newBookListTit{
  color: #000;
  font-size: .5rem;
  line-height: 18px;
  margin-top: 0.5rem;
  padding: 0 0.1rem;
  height: 35px;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.priceWrap {
    overflow: hidden;
    padding: 0 6px;
    line-height: 18px;
    margin-top: 4px;
    .price {
      float: left;
      color: #e60000;
      font-size: 0.24rem;
    }
    .original {
      float: left;
      color: #999999;
      font-size: 0.22rem;
      margin-left: 7px;
    }
  
}
.van-icon-arrow{
  font-size: .5rem;
  line-height: 18px;
}

/* 广告轮播图 */
.bannerSwiper{
  margin-bottom: 10px;
}

/* 淘书团 */
.tstWrap{
  .tstTit{
    height:35px;
    .tstWrapTitM{
    font-size:0.8rem;
    line-height:24px;
    margin-top:5px;
      .tstWrapMore{
        padding:0 5px;
      }
    } 
  }
}
.commomTith{
  height:30px;
  img{
    height:100%;
  }
}
.tstListTitName{
  color: #000000;
  width:100%;
  line-height: 18px;
  height: 36px;
  font-size: 0.22rem;
  overflow: hidden;
  padding: 0 6px;
  margin-top: 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  .van-tag{
    margin-right:5px;
  }
}
.TpriceT {
    padding: 0 6px;
    color: #e60000;
    font-size: 0.18rem;
    line-height: 15px;
    margin-top: 5px;
    .TpriceTPrice{
      font-size: 0.22rem;
    }
}
.tstOriginal{
  float: left;
  color: #9a9a9a;
  padding: 0 6px;
  font-size: 0.2rem;
  line-height: 18px;
}

.tstDiscount {
    float: right;
    height: 15.6px;
    line-height: 15.6px;
    font-size: 0.18rem;
    color: #fff;
    background: #efb64d;
    border-radius: 15.6px 0 0 15.6px;
    padding: 0 4px;
}

/* 读者热评 */
.hottockListImg{
  float:left;
}
.hottockListTopR{
  float:right;
}
.hottockListTop{
  overflow: hidden;
  min-height: 150px;
}
.hottockListImg {
    margin: 9px 0;
    height: 132px;
    text-align: center;
}
.hottockListTopR {
  .name {
    color: #000;
    font-size: 0.22rem;
    line-height: 18px;
    margin-top: 10px;
    height: 18px;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  .startWrap {
    overflow: hidden;
    line-height: 12px;
    margin-top: 6px;
    span {
      display:inline-block;
      height: 12px;
      width: 12px;
      margin: 0 3px 0 0;
    }
    .full{
      background-image: url("../../public/images/full.png");
      background-size: 12px 12px;
    }

  }
  .hottockListPriceWrap{
    overflow: hidden;
    line-height: 18px;
    margin-top: 4px;
    .price{
      color: #e60000;
      font-size: 0.24rem;
    }
    .original{
      color: #999999;
      font-size: 0.22rem;
      margin-left: 7px;
    }
  }
  .hottockListReview{
    color: #666666;
    font-size: 0.2rem;
    line-height: 18px;
    height: 55px;
    padding: 3px 9px;
    background: #f3f3f3;
    margin: 6px 0 0;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    span {
      color: #e60000;
    }
  }
}
.hottockListBotT{
  .van-grid-item{
    text-align: center;
    padding: 9px 0;
  }
}

.hottockListBotTImg{
  max-width: 70%;
  height: 120px;
}
.hottockListBotB{
  .name {
    color: #000;
    font-size: 0.22rem;
    line-height: 18px;
    margin-top: 10px;
    height: 18px;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  .startWrap {
    overflow: hidden;
    line-height: 12px;
    margin-top: 6px;
    span {
      display:inline-block;
      height: 12px;
      width: 12px;
      margin: 0 3px 0 0;
    }
    .full{
      background-image: url("../../public/images/full.png");
      background-size: 12px 12px;
    }
    .half {
      background-image: url("../../public/images/halfstart.png");
      background-size: 12px 12px;
    }
  }
  .hottockListBotBPriceWrap{
    overflow: hidden;
    line-height: 18px;
    margin-top: 4px;
    .price{
      color: #e60000;
      font-size: 0.24rem;
    }
    .original{
      color: #999999;
      font-size: 0.22rem;
      margin-left: 7px;
    }
  }
  .hottockListBotBReview{
    color: #666666;
    font-size: 0.2rem;
    line-height: 18px;
    height: 42px;
    padding: 3px 9px;
    background: #f3f3f3;
    margin: 6px 0 0;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    span {
      color: #e60000;
    }
  }
  
}

.fiveStarLink a {
    display:inline-block;
    width:100%;
    text-align: center;
    font-size: 0.24rem;
    color: #4a4a4a;
    height: 50px;
    line-height: 50px;
    background: #efbf41;
}

/* 推荐书单 */
.recommendWrap {
    margin-top: 10px;
}
.recommendTit{
  background: #fff;
  padding: 6px 0 6px;
  box-shadow: 0px 1px 2px #dddcdd;
  margin-bottom: 2px;
}
.recommenListLImg{
  height:262px;
}

/* 新书速递 */
.BookCourierTit {
  background: #fff;
  padding: 6px 0 6px;
  box-shadow: 0px 1px 2px #dddcdd;
  margin-bottom: 2px;
}
.courierListTit{
  color: #000;
    font-size: .5rem;
    line-height: 18px;
    margin-top: 0.5rem;
    padding: 0 0.1rem;
    height: 35px;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
}


/* 畅销榜 */
.sellHotBookImg{
    max-width: 70%;
    height:80%;
}
.sellHotBookprice {
  del {
    color: #999;
    margin-right: 5px;
    &::before {
      content: "￥";
    }
  }
  span {
    color: #f00;
    &::before {
      content: "￥";
    }
  }
}
.sellHotBookListName{
  color: #000;
  font-size: 0.22rem;
  line-height: 18px;
  margin-top: 7px;
  padding: 0 9px 0 12px;
  height: 40px;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.sellHotBookprice {
    overflow: hidden;
    // padding: 0 6 0 0.2rem;
    line-height: 18px;
    margin-top: 4px;
    span {
      float: left;
      color: #e60000;
      font-size: 0.24rem;
    }
    del{
      color: #999999;
      font-size: 0.22rem;
      margin-left: 7px;
    }
}
.enterSellHot{
  text-align: center;
  height: 48px;
  line-height: 48px;
  background:#dddcdd;
  a{
    font-size: 0.24rem;
    color: #8e8e8e;
    display: block;
  }
}
/* 页面底部 */
.pagefoot{
  .actions-wrap{
    padding: 12px 0;
    border-bottom: 1px solid #f3f3f3;
  }
}
.actions{
  padding: 5px 0;
}
.nav{
  text-align: center;
  font-size: 0.22rem;
  color: #666666;
  line-height: 36px;
  .navCla{
    .van-col{
      a{
      color: #666;
      }
    }
    .red {
      a{

      color: #e60000;
      }
    }

  }
}
.copyRight{
  font-size: 0.22rem;
  color: #8e8e8e;
  text-align: center;
  line-height: 48px;
}

/* 回到顶部 */
.fixed_box {
  // display: none;
  position: fixed;
  right: 0em;
  bottom: 100px;
  height: 54px;
  width: 54px;
  line-height: 15px;
  z-index: 5;
}
.fixed_boxCla{
  .toTop{
    display: block;
    img{
      width: 52px;
      height:52px;
      font-size: 12px;
    }
  }
}


</style>


