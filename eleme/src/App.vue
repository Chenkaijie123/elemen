<template>
  <div id="app">
    <myheader :seller="seller"></myheader>
    <div class="tab border">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view :goods="goods"></router-view>
  </div>
</template>

<script>
  import header from './components/header/Header.vue'
  import {mapMutations} from 'vuex'
  export default {
    name: 'app',
    data () {
      return {
        seller: {},
        goods: []
      }
    },
    components: {
      myheader: header
    },
    methods: mapMutations(['RECEIVE_FOODS']),
    created() {
      let self = this
      this.$axios.get('/api/seller')
        .then((res) => {
          res = res.data
          if (res.error === 0) {
            self.seller = res.data
          }
        })
        .catch((error) => {
          alert(error)
        })
      setTimeout(() => {
        this.$axios.get('/api/goods')
          .then((res) => {
            res = res.data
            if (res.error === 0) {
              self.goods = res.data
              console.log(this.goods)
              self.RECEIVE_FOODS({goods: self.goods})
            }
          })
          .catch((error) => {
            alert(error)
          })
      }, 500)
    }
  }
</script>

<style lang="less">
  @import "common/less/mixin";

  #app {
    .tab {
      display: flex;
      height: 40px;
      line-height: 40px;
      width: 100%;
      .border-1px(rgba(7, 17, 27, 0.1));
      .tab-item {
        flex: 1;
        text-align: center;
        & > a {
          display: block;
          font-size: 14px;
          color: rgb(77, 85, 93);
          &.active {
            color: rgb(240, 20, 20);
          }
        }
      }
    }
  }
</style>
