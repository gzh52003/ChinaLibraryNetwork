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
        <van-swipe-item>
          <img src="../../public/img/banner1.jpg" alt="">
        </van-swipe-item>
        <van-swipe-item>
          <img src="../../public/img/banner2.jpg" alt="">
        </van-swipe-item>
        <van-swipe-item>
          <img src="../../public/img/banner3.jpg" alt="">
        </van-swipe-item>
        <van-swipe-item>
          <img src="../../public/img/banner4.jpg" alt="">
        </van-swipe-item>
        <van-swipe-item>
          <img src="../../public/img/banner5.jpg" alt="">
        </van-swipe-item>
        <van-swipe-item>
          <img src="../../public/img/banner6.jpg" alt="">
        </van-swipe-item>
        <van-swipe-item>
          <img src="../../public/img/banner7.jpg" alt="">
        </van-swipe-item>
      </van-swipe>

      <!-- 快捷工具栏 -->
      <van-grid :column-num="5">
        <van-grid-item v-for="item in navHome" :key="item.title">
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
        <div class="newBookWrapTit">
          <van-row>
            <van-col span="20">今日值得买</van-col>
            <van-col span="4">
              <van-button round type="info" size="mini">更多</van-button>
            </van-col>
          </van-row>
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
    // 轮播图数据
    // recommend === data.data
    
  }
}
</script>
<style lang="scss" scoped>
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
// .my-swipe{
//   width:640px;
//   margin:0 auto;
//   .van-swipe__track{
//     width:640px;
//       .van-swipe-item{
//         width:640px;
//         font-size: 20px;
//         height: 140px;
//         text-align: center;
//         background-color: #ccc;
//         img{
//           width:100%;
//           height: 100%;
//         }
//       }
//   }
// }
.my-swipe .van-swipe-item {
  // width:640px;
  font-size: 20px;
  height: 140px;
  text-align: center;
  background-color: #ccc;
}
.my-swipe .van-swipe-item img {
  width:100%;
  height: 100%;
}

.toolsTit{
  font-size:0.8rem;
}

/* 广告栏 */
.notice-swipe {
    height: 2rem;
    line-height: 40px;
}
.van-notice-bar{
  height:68px;
  margin:10px;
}

/* 广告栏 */
.bannerBar{
  // width:640px;
  margin:0 auto;
  img{
    width:100%;
    height: 100%;
  }
}

/* 今日值得看 */
.newBookWrap{
  .newBookWrapTit{
    height:24px;
    background:#f9bd00;
  }
}


</style>


