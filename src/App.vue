<template>
  <div>
    <vheader :seller="seller"></vheader>
    <div class="v-tab border-transform">
      <router-link to="/goods">商品</router-link>
      <router-link to="/ratings">评论</router-link>
      <router-link to="/seller">商家</router-link>
    </div>
    <keep-alive>
    <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import vheader from './components/header/header'
  import {urlParse} from 'common/js/urlparse'

  const ERR_OK = 0
  export default{
    data() {
      return {
        seller: {
          id: (() => {
            let queryParse = urlParse()
            return queryParse.id
          })()
        }
      }
    },
    created() {
      this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.seller = Object.assign({}, this.seller, response.data)
        }
      })
    },
    components: {
      vheader
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
@import "./common/less/mixin";

.v-tab{
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  .border-bottom-1px(#f5f5f5);
  a{
    flex:1;
    text-align: center;
    font-size: 14px;
    color: rgb(77, 85, 93);
    &.active{
      color: rgb(240, 20, 20);
    }
  }
}
</style>
