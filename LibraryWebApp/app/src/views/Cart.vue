<template>
  <div>
    <div class="cartWrap">
      <!-- 头部 -->
      <div class="cartHead">
        <van-nav-bar title="购物车" left-text="" left-arrow  @click-left="onClickLeft">
          <template #right>
            <div class="editBtn" id="editBtn">编辑</div>
            <van-icon name="ellipsis" size="25" />
          </template>
        </van-nav-bar>
      </div>

      <!-- 步骤条 -->
      <!-- <van-steps :active="active" class="steps">
        <van-step>购物车</van-step>
        <van-step>提交订单</van-step>
        <van-step>付款</van-step>
        <van-step>购买完成</van-step>
      </van-steps> -->

      <!-- 购物车列表 -->
      
    <van-card
      :price="item.sellPrice"
      :title="item.title"
    
      v-for="item in cartList"
      :key="item._id"

    >
      <template #tag>
        <van-checkbox v-model="item.checked" class="selChecked"></van-checkbox>
      </template>
      <template #thumb>
        <van-image :src='item.url' class="goodsImg" @click="gotoDetail(item._id)"></van-image>
      </template>
      <template #price>
        <van-row>
          <van-col span="24">
            <p class="price">
              <span>{{item.sellPrice}}</span>
              <del>{{item.priceTit}}</del>
            </p>
          </van-col>
          
        </van-row>
        <!-- <p class="price">
          <span>{{item.sellPrice}}</span>
          <del>{{item.priceTit}}</del>
        </p> -->

        <van-row>
          <van-col span="16">
            <van-stepper :value="item.qty" input-width="20px" button-size="20px" theme="round" async-change integer @change="changeQty(item._id,$event)" />
          <!-- async-change: 点击按钮时不会直接修改数量，而是根据value的值来显示 -->
          </van-col>
          <van-col span="8">
            <!-- <van-button plain size="mini" type="danger" icon="cross" @click.stop="removeItem(item._id)"></van-button> -->
            <van-icon name="like-o" size="20"/>
            <van-icon name="delete" size="20" @click.stop="removeItem(item._id)" />
          </van-col>
        </van-row>
      </template>
    </van-card>

    <!-- 订单结算 -->
    <van-submit-bar :price="totalPrice" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checkAll">全选</van-checkbox>
    </van-submit-bar>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import {  NavBar , Step, Steps , Card , Stepper , SubmitBar} from 'vant';
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex';
// Vue.use(Sticky);
Vue.use(NavBar);
import { Toast } from 'vant';
Vue.use(Step);
Vue.use(Steps);
Vue.use(Card);
Vue.use(Stepper);
Vue.use(SubmitBar);


export default {
  data(){
    return{
      active:0,
    }
  },
  // onClickLeft() {
  //     Toast('返回');
  //   },
  //   onClickRight() {
  //     Toast('按钮');
  //   },
  methods:{
    onClickLeft(){
      this.$router.push('/home');
    },
  
    onSubmit(){
      
    },
    gotoDetail(id){
      this.$router.push('/goods/'+id);
    },
    // removeItem(id){
    //   this.$store.commit('remove',id)
    // },
    // clearCart(){
    //   this.$store.commit('clear')
    // },
    // ...mapMutations(['removeItem','clearCart']), //等效于上面的代码
    ...mapMutations({
      removeItem:'remove',
      clearCart:'clear'
    }),
    // changeQty(id,qty){
    //   // this.$store.commit('changeQty',{_id:id,qty})
    //   this.$store.dispatch('changeQtyAsync',{_id:id,qty})
    // }
    ...mapActions({
      // changeQty:'changeQtyAsync'
      changeQty(dispatch,_id,qty){
        dispatch('changeQtyAsync',{_id,qty})
      }
    })
  },

  computed:{
  
      // cartlist:'goodslist', // 等效于：cartlist()=>this.$store.state.goodslist

      // 映射模块化后的数据
     cartList:{
        // //console.log('mapState=',state)
        get(){
          return this.$store.state.cart.cartList
        },
          // return state.cart.cartList

        set(val){
          this.$store.commit("checkAll123",val)
        }
      },

    checkAll:{
      get(){
        return this.cartList.every(item=>item.checked);
      },
      set(val){
        console.log(this)
        this.cartList = this.cartList.map(item=>{
          item.checked = val;
          return item;
        });
      }
    },

    totalPrice(){
      // return this.goodslist.reduce((pre,item)=>pre+item.sales_price*item.qty,0)*100;
      return this.$store.getters.totalPrice

      // 添加命名空间的获取方式
      // return this.$store.getters['cart/totalPrice']
    }
  },

  created() {
    // this.getCartList();
    this.$store.commit('displayTabbar',false);
  },
  beforeDestroy(){
    // this.$parent.showMenu = true;
    //  //console.log('cart.destroyed',this.$parent.showMenu)
    this.$store.commit('displayTabbar',true);
  }

};
</script>

<style lang="scss" scoped>
.cartWrap{
  background: #f3f3f3;
  padding-bottom: 80px;
  // padding: 0.88rem 0 1rem !important;
}
/* 头部 */
.cartHead{
  box-shadow: 0px 0px 10px #d4d2d3;
}
.editBtn{
  margin-right:10px;
}

/* 步骤条 */
.steps{
  margin-bottom: 10px;
}

/* 购物车列表 */
.van-submit-bar{
  padding-bottom:20px;
}

.van-card__tag {
      top: 30px;
      left: -30px;
    }
.van-card__thumb{
  margin-left: 10px;
}
.goodsImg{
  width:70px;
  height:75px;
}
.van-card{
  padding-left:30px;
}
.price {
  font-size:.95rem;
  margin-bottom: 10px;
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
.van-card__price{
  width:100%;
}
.van-icon-like-o{
  margin-right:5px;
}
.van-card__title{
  font-size:.95rem;
}
</style>