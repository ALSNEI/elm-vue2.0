<template>
  <div id="app">
    <v-header :seller ="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
         <router-link to="/goods" class="table">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings" class="table">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller" class="table">商家</router-link>
      </div>
    </div>
    <!-- keep-alive 将组件状态保存在缓存中，不会再次请求 体验优化-->
    <keep-alive>
      <router-view :seller ="seller" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import {urlParse} from 'common/js/util.js';
import Header from 'components/header/header';

const ERR_OK = 0;

export default {
  name: 'app',
  data(){
    return{
      seller:{
        // 解决不同商家id的收藏问题
        // 1.获取id
        // 2.将获取的ID绑定到商家数据对象上
        // 3.本地存储收藏状态，
        // 4.切换不同商家时，读取本地存储的收藏状态(在进行存储收藏状态时，如果是false，可以选择不存储，这样没必要并且不占内存)
        id:(() => {
          let queryParam = urlParse();
          // console.log(queryParam)
          return queryParam.id;
        })()
      }
    };
  },//定义为函数是为了多次调用数据,因为Vue中组件是可以影响另外一个组件的
  created(){
    this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
      //console.log(response);//response是个属性,需要转换为JSON数据
      //response = response.json();//API文档中JSON方法返回的是promise对象
      response = response.body;//API文档中body方法返回的是json对象
      if(response.errno === ERR_OK){
        // this.seller = response.data;
        // 利用ES6的对象拓展方法Object.assign(）将ID绑定在seller数据对象上
        this.seller = Object.assign({},this.seller,response.data);
        // console.log(this.seller.id);
      }
    })
  },
  components:{
    'v-header':Header,
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
/*display/position等会影响布局的属性写在前面,宽高也写在前面一些,这些都是会触发reflow,并且是不可继承的属性都会放前面一些,字体颜色等可继承的放在后面,这是css的书写规范*/
@import "./common/stylus/mixin.styl";
#app
  .tab
    display:flex
    width:100%
    height:40px
    line-height:40px
    /*border-bottom:1px solid rgba(7,17,27,.1)*/
    border-1px(rgba(7,17,27,.1))
    .tab-item
      flex:1
      text-align:center
      & > a
        display:block
        font-size:14px
        color: rgb(77,85,93)
        &.active
          color:rgb(240,20,20)
</style>
