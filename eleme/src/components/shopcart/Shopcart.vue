<template>
  <div class="shopcart-wrapper">
      <div class="cart-list">
        <transition>
        <div class="cart-list-contral">
            <div v-for="item in carProducts" class="li">
                <span class="cart-list-name">{{item.name}}</span>
                <span class="cart-list-count">{{item.count}}份</span>
                <span class="cart-list-btn">
                  <Cartcontrol :food="item"></Cartcontrol>
                </span>
            </div>
        </div>
        </transition>
      </div>
    <div class="shopcart">
      <div class="footer-content">
        <div class="content-left">
          <div class="logo-warper">
            <div class="logo"><i class="icon-shopping_cart"></i></div>
            <div class="num">99</div>
          </div>
          <div class="price">¥10</div>
          <div class="desc">另需配送费¥4元</div>
        </div>
        <div class="content-right">
          <div class="pay">还差30¥起送</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import  { mapGetters } from 'vuex'
  import Cartcontrol from '../cartcontrol/Cartcontrol'
  export default {
    data() {
      return {}
    },
  computed:{
    ...mapGetters(['carProducts'])
  },
    components:{
      Cartcontrol
    }
  }
</script>

<style lang="less" scoped rel="stylesheet/less">
  @import "../../common/less/mixin";
  .cart-list{
    transition: all .8s linear;
    &.go-enter,&.go-leave-to{
    transform: translateX(0);
    }
    position: fixed;
    /*margin-bottom: 0;*/
    bottom: 34px;
    padding-bottom: 22px;
    background-color:white;
    width: 100%;

    /*z-index: 12;*/
    .li{
      height: 34px;
      line-height: 34px;
      display: flex;
      span{
        color:blue;
      }
      .cart-list-name{
        flex: 1;
        padding-left: 20px;
      }
      .cart-list-count{
        flex: 1;
        padding-right:20px;
        text-align: right;
      }
      .cart-list-btn{
        flex: 0 0 100px;
      }
    }
  }
  .shopcart {
    position: fixed;
    height: 48px;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 50;
    background: #141d27;
    .footer-content {
      display: flex;
      font-size: 0;
      .content-left {
        flex: 1;
        .logo-warper, .price, .desc {
          display: inline-block;
        }
        .logo-warper {
          position: relative;
          top: -10px;
          z-index: 55;
          margin: 0 12px;
          padding: 6px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          vertical-align: top;
          background: #141d27;
          .logo {
            width: 100%;
            height: 100%;
            line-height: 44px;
            border-radius: 50%;
            text-align: center;
            font-size: 24px;
            background: #2B343C;
            color: rgba(255, 255, 255, 0.4);
            &.highlight {
              color: rgb(255, 255, 255);
              background: rgb(0, 160, 220);
            }
          }
          .num {
            position: absolute;
            top: 0;
            right: 0;
            width: 24px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            border-radius: 8px;
            font-size: 9px;
            color: #fff;
            background: rgb(240, 20, 20);
            box-shadow: 0 4px 8px 0 rbga(0, 0, 0, 0.4);
          }
        }
        .price {
          margin: 12px 0;
          padding-right: 12px;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          line-height: 24px;
          font-size: 16px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.4);
          &.highlight {
            color: #fff;
          }
        }
        .desc {
          margin: 12px 0;
          padding-left: 12px;
          font-size: 10px;
          line-height: 24px;
          color: rgba(255, 255, 255, 0.4);
        }
      }
      .content-right {
        flex: 0 0 105px;
        width: 105px;
        background: #2B343C;
        .pay {
          padding: 0 8px;
          height: 48px;
          line-height: 48px;
          font-size: 12px;
          font-weight: 700;
          text-align: center;
          color: rgba(255, 255, 255, 0.4);
          &.enough {
            background: #55da6c;
            color: #fff;
          }
        }
      }
    }
  }
</style>
