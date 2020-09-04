<template>
  <div class="home">
    <div class="pageWrap">
      <!-- 头部 -->
        <header>
          <van-row>
            <van-col span="8">
              <h1>
                <img src="../../public/img/logo.png" alt="中国图书网">
              </h1>
            </van-col>
            <van-col span="13">
              <van-cell-group>
                <van-field v-model="value" class="searchInput" placeholder="日本学术文库-日本的佛教与神祇信仰" />
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
      <van-notice-bar  :scrollable="false" color="#333" background="#fff">
        <van-swipe
          vertical
          class="notice-swipe"
          :autoplay="3000"
          :show-indicators="false"
        >
          <van-swipe-item>
            <img src="../../public/img/noticetitle.png" />
            每日签到抽红包！</van-swipe-item>
          <van-swipe-item>
            <img src="../../public/img/noticetitle.png" />
            新用户注册即送10元!</van-swipe-item>
        </van-swipe>
      </van-notice-bar>

      <!-- 广告栏 -->
      <van-swipe class="my-swipe bannerBar" :autoplay="3000" indicator-color="white">
         <van-swipe-item>
          <img src="../../public/img/fzp700185.jpg" alt="">
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
              <van-button round type="default" size="mini" class="newBookWrapTitM">
                <span class="newBookWrapTitMore">更多</span>
                <van-icon name="arrow" />
                </van-button>
            </van-col>
          </van-row>
        </div>

        <!-- 今日值得看内容 -->
        <div class="newBookList">
          <van-grid :column-num="3" :border="false">
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
              <h2 class="tstWrapTith">
                <img src="../../public/img/taoshutuantitle.png" alt="">
              </h2>
              </van-col>
            <van-col span="4">
              <van-button round type="#666" size="mini" class="tstWrapTitM">
                <span class="tstWrapMore">更多</span>
                <van-icon name="arrow" />
                </van-button>
            </van-col>
          </van-row>
        </div>

        <!-- 淘书团内容 -->
        <div class="tstListW">
          <van-grid :column-num="2" :border="false" class="tstList">
            <van-grid-item v-for="item in tst" :key="item.name" >
              <van-image :src="item.img" class="tstListImg" />
              <p class="tstListTit">
                <!-- <span><van-tag type="danger">团</van-tag></span> -->
                <span class="tstListTitName"><van-tag type="danger">团</van-tag>{{item.name}}</span>
              </p>
              <div class="Tprice">
                <van-row>
                  <van-col span="24">
                    团购价: 
                                           <span>{{item.price}}</span>
                  </van-col>
                </van-row>
              </div>
              <p class="tstListpriceWrap">
                <van-row>
                  <van-col span="16">
                    <del class="original">{{item.original}}</del>
                  </van-col>
                  <van-col span="8">
                    <span class="discount">{{item.discount}}</span>
                  </van-col>
                </van-row>
                
              </p>
            </van-grid-item>
          </van-grid>
        </div>
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
      active:0,
      value: '',
      bannerHome:[
        {
          title:"满200减100",
          img:"img/banner1.jpg"
        },
        {
          title:"港台敦煌学文库",
          img:"img/banner2.jpg"
        },
        {
          title:"渡边淳乐园三部曲",
          img:"img/banner3.jpg"
        },
        {
          title:"王小波精选珍藏集",
          img:"img/banner4.jpg"
        },
        {
          title:"写给儿童的世界历史",
          img:"img/banner5.jpg"
        },
        {
          title:"字里行间文库",
          img:"img/banner6.jpg"
        },
        {
          title:"大师手绘本·格林童话",
          img:"img/banner7.jpg"
        },
      ],
      navHome: [
        {
          img_url:"img/changxiaobang.png",
          title:"畅销榜"
        },
        {
          img_url:"img/taoshutuan.png",
          title:"淘书团"
        },
        {
          img_url:"img/freepost.png",
          title:"9.9包邮"
        },
         {
          img_url:"img/new.png",
          title:"新上架"
        },
        {
          img_url:"img/publisher.png",
          title:"出版社"
        }
      ],
      newBookList: [
        {
          name:"胡适的情缘与晚境",
          img:"img/s2817470.jpg",
          price:"¥9.2",
          original:"¥30.0",
        },
        {
          name:"交响情人梦",
          img:"img/s3286658.jpg",
          price:"¥8.1",
          original:"¥20.0",
        },
        {
          name:"第三者-希区柯克悬念故事集-惊悚悬念袖珍馆I-02-经典随身读",
          img:"img/s5881513.jpg",
          price:"¥3.6",
          original:"¥15.0",
        },
        {
          name:"克里奥佩特拉的女儿",
          img:"img/s5687148.jpg",
          price:"¥13.0",
          original:"¥32.0",
        },
        {
          name:"美国夫人",
          img:"img/s4781707.jpg",
          price:"¥14.6",
          original:"¥36.0",
        },
        {
          name:"是你.制造了天气",
          img:"img/s4745646.jpg",
          price:"¥9.6",
          original:"¥28.0",
        },
      ],
      bannerSwiper:[
        {
          title:"扶他柠檬茶推荐书单",
          img:"/img/700185(1).jpg"
        },
        {
          title:"全场活动",
          img:"/img/700185(2).jpg"
        },
        {
          title:"马伯庸推荐书单",
          img:"/img/700185(3).jpg"
        }
      ],
      tst:[
        {
          name:"日本著名作家渡边淳一情爱指引四部曲“欲情四课”臻美典藏纪念套装！《男人这东西》《女人这东西》《丈夫这东西》《欲情课》精装全4册，陆求实、李迎跃翻译。这是一套书写两性关系的经典读本，身为情爱文学大师的渡边淳一以医生、作家、情圣的三重身份，以医学知识和生活经验为基础，从生理、心理角度真诚相告，阐释恋爱与婚姻的奥秘与规律。定价159.2元，现团购价48元包邮！",
          img:"img/14151_20200903064039.jpg",
          Tprice:"团购价",
          price:"¥48",
          original:"原价¥159.2 ",
          discount:"3.0折",
        },
        {
          name:"《钱文忠集》9册，上海三联书店出版，包含佛学论文集《天竺与佛陀》，书评文集《瓦釜集》，时评文集《文中有话》，史评文集《钱文忠品读人与城》，随笔集《戊子草》《己丑草》《庚寅草》《人文精神的桃花源》，还有叙述恩师成长经历及学术思想的《季门立雪》。总定价241.4元，现团购价65元包邮！",
          img:"img/14149_20200904091544.jpg",
          Tprice:"团购价",
          price:"¥65",
          original:"原价¥241.4",
          discount:"2.7折",
        },
        {
          name:"企鹅经典童书原版引进《瓢虫仙子成长故事》绘本全七册，铜版纸全彩图文，美国亚马逊五星畅销图书，曾连续82周荣登《纽约时报》童书榜单，深受家长与孩子喜爱。本系列以“瓢虫仙子”露露的日常生活为主题，通过活泼可爱的图画和浅显易懂的文字，讲述了7个富于生活气息的故事，风格幽默，独具匠心，和孩子们探讨想象与独立、责任与担当、冒险与勇气、积极与乐观、友谊与妥协、对立与合作以及换位思考等成长课题。定价96.6元，",
          img:"img/9141_20180919062318.jpg",
          Tprice:"团购价",
          price:"¥29",
          original:"原价¥96.6",
          discount:"3.0折",
        },
        {
          name:"市面少见！胡兰成作品精装2册：尘封三十年遗稿初次曝光《文明皇后》，附有精美手稿高清影印，散文笔法写就别样拓跋魏史，文明皇后、崔浩千年后终获知己；在日本封尘半个世纪的《易经与老子》，乱世文人胡兰成以其特殊经历讲述《易经》与《老子》，观点独到，此为大陆初次出版中译本。两册均由陈丹青题写书名，装帧精美，宜读宜藏。定价86元，现团购价69元包邮！",
          img:"img/14154_20200904101415.jpg",
          Tprice:"团购价",
          price:"¥69",
          original:"原价¥86.0 ",
          discount:"8.0折",
        },
      ],
      goodslist: [],
      icon: {
        active: 'https://img.yzcdn.cn/vant/user-active.png',
        inactive: 'https://img.yzcdn.cn/vant/user-inactive.png',
      },
    };
  },
  components: {},
  methods:{
    gotoDetail(id){
      // this.$router.push(`/goods/${id}`)
      this.$router.push({
        name:'Goods',
        params:{
          id
        }
      })
    }
  },
  created() {
  
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
    height: 40px;
    line-height: 40px;
}
.van-notice-bar{
  height:68px;
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
    padding-top:4px;
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
.tstWrapTith{
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
  // text-indent: 0.3rem;
  padding: 0 6px;
  margin-top: 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.Tprice {
    padding: 0 6px;
    color: #e60000;
    font-size: 0.18rem;
    line-height: 15px;
    margin-top: 5px;
}



</style>


