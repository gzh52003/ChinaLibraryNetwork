<template>
  <div class="search">
    <div class="searchWrap">
        <!-- 头部 -->
        <header>
            <van-row class="searchW">
                <van-col span="2">
                    <van-icon name="arrow-left" size="30" class="arrow-left" color="#fff"/>
                </van-col>
                <van-col span="22">
                    <van-search
                    v-model="value"
                    show-action
                    shape="round"
                    placeholder="托马斯·沃尔夫"
                    background="#e60000"
                    @search="onSearch()"
                    >
                    <template #action>
                        <div @click="onSearch()" class="searchA">搜索</div>
                    </template>
                    </van-search>
                </van-col>
            </van-row>
        </header>

        <!-- 热门搜索 -->
        <div class="hot_search">
            <van-row>
                <van-col span="24" class="hot_searchTit">热门搜索</van-col>
            </van-row>
            <div class="hot_search_list">
                <van-row>
                    <van-col span="12">
                        <a href="javascript:">
                            <van-button round type="default" size="mini">摘星星的男孩</van-button>
                        </a>
                        </van-col>
                    <van-col span="12">
                        <a href="javascript:">
                            <van-button round type="default" size="mini">为生命而阅读</van-button>
                        </a>
                        </van-col>
                </van-row>

                <van-row>
                    <van-col span="12">
                        <a href="javascript:">
                            <van-button round type="default" size="mini">乡土中国</van-button>
                        </a>
                        </van-col>
                    <van-col span="12">
                        <a href="javascript:">
                            <van-button round type="default" size="mini">九型人格</van-button>
                        </a>
                        </van-col>
                </van-row>
            </div>
            
        </div>
      
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Search } from 'vant';

Vue.use(Search);


export default {
    name:'search',
    data(){
        return{
            value:'',
            booktype:"shehuikexue",
            id:'',
        }
    },
    methods:{
        async onSearch(){
            let booktype=this.booktype;
            const { data } = await this.$request.get("/goods/search",{
              params:{["value"]:this.value}
            });
            this.data = data;
            this.id = data[0]._id;
            let id = this.id;
            console.log(this.id);
            this.$router.push({
                name:'Goods',
                params:{
                    booktype,
                    id,
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.arrow-left{
    margin-top:14px;
}
.searchW{
  height:56px;
  background:#e60000;
}
.searchA{
    color:#fff;
}
.hot_search {
    padding: 0 12px;
}
.hot_searchTit{
    font-size: 1rem;
    height: 18px;
    line-height: 18px;
    margin-top: 10px;
    color: #333;
}
.hot_search_list{
    margin-top:10px;
}
.hot_search_list{
    .van-row{
        margin-bottom: 10px; 
    }
}
.van-button__content{
    color: #e60000;
    padding: 0 12px;
    font-size: 0.22rem;
    white-space: nowrap;
}
</style>