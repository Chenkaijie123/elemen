<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-dec icon-remove_circle_outline" v-show="myFood.count>0" @click="decCart"></div>
    </transition>
    <div class="cart-count" v-show="myFood.count>0" :class="{refrash: valueChange}">{{myFood.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart"></div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        count: 0
      }
    },
    computed: {
      ...mapGetters(['allGoods', 'valueChange']),
      myFood() {
        return this.allGoods.find(f => f.name === this.food.name)
      }
    },
    methods: {
      ...mapActions({addFn: 'addToCart', decFn: 'decToCart'}),
      addCart () {
        this.addFn(this.food)
      },
      decCart () {
        this.decFn(this.food)
      }
    }
  }
</script>

<style lang="less" scoped>
  .cartcontrol {
    font-size: 0;
    .cart-dec {
      transition: all 0.4s linear;
      &.move-enter, &.move-leave-to {
        opacity: 0;
        transform: translate3D(24px, 0, 0) rotate(180deg);
      }
    }
    .cart-dec, .cart-add {
      padding: 6px;
      display: inline-block;
      line-height: 24px;
      font-size: 24px;
      color: rgb(0, 160, 220);
    }
    .cart-count {
      display: inline-block;
      padding-top: 7px;
      vertical-align: top;
      text-align: center;
      line-height: 24px;
      font-size: 10px;
      color: rbg(147, 153, 159);
    }
  }
</style>
