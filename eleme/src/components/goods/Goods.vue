<template>
  <div class="goods-container">
    <div v-if="goods.length === 0">
      <Loading></Loading>
    </div>
    <div v-if="goods.length" class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item, index) in goods" @click="scrollToSelectMenu(index)" class="menu-item"
              :class="{'current':currentIndex === index}">
            <span class="text border">
              <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="item in goods" class="food-list food-list-hook">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-for="food in item.foods" class="food-item border">
                <div class="icon">
                  <img :src="food.icon" width="57" height="57"/>
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc" v-show="food.description">{{food.description}}</p>
                  <div class="extra">
                    <span class="sell-count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}</span>
                  </div>
                  <div class="price">
                    <span class="now">¥{{food.price}}</span><span v-show="food.oldPrice"
                                                                  class="old">¥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <Cartcontrol :food="food"></Cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <shopcart></shopcart>
  </div>
</template>

<script>
  import IScroll from 'iscroll/build/iscroll-probe'
  import Loading from '../loading/Loading'
  import Cartcontrol from '../cartcontrol/Cartcontrol'
  import Shopcart from '../shopcart/Shopcart'
  export default {
    props: {
      goods: {
        type: Array
      }
    },
    data() {
      return {
        classMap: this.$store.state.classMap,
        currentIndex: 0,
        listHeight: []
      }
    },
    created () {
      this.$nextTick(() => {
        this.initScrollTemplate()
      })
    },
    methods: {
      scrollToSelectMenu(index) {
        var selectLi = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')[index]
        this.currentIndex = index
        this.foodsScroll.scrollToElement(selectLi, 300)
      },
      initScrollTemplate() {
        if (this.$refs.menuWrapper) {
          this.getFoodsListHeight()
          this.menuScroll = new IScroll(this.$refs.menuWrapper, {
            click: true
          })
          this.foodsScroll = new IScroll(this.$refs.foodsWrapper, {
            click: true,
            probeType: 3
          })
          let self = this
          this.foodsScroll.on('scroll', function () {
            self.getCurrentIndex(Math.abs(Math.round(this.y)))
          })
        }
      },
      getCurrentIndex(num) {
        for (let i = 0; i < this.listHeight.length - 1; i++) {
          let heigh = this.listHeight[i]
          if (i + 1 === this.listHeight.length - 1 && num >= heigh) {
            this.currentIndex = i
            return
          }
          if (num >= heigh && num < this.listHeight[i + 1]) {
            this.currentIndex = i
            return
          }
        }
      },
      getFoodsListHeight() {
        let selectLis = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < selectLis.length; i++) {
          let li = selectLis[i]
          height += li.clientHeight
          this.listHeight.push(height)
        }
      }
    },
    watch: {
      goods (val) {
        if (val.length > 0) {
          this.$nextTick(() => {
            this.initScrollTemplate()
          })
        }
      }
    },
    components: {
      Loading,
      Cartcontrol,
      Shopcart
    }
  }
</script>

<style lang="less" scoped>
  @import "../../common/less/mixin";

  .goods {
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 46px;
    overflow: hidden;
    .menu-wrapper {
      flex: 0 0 80px;
      width: 80px;
      background: #f3f5f7;
      .menu-item {
        display: table;
        height: 54px;
        width: 56px;
        padding: 0 12px;
        &.current {
          position: relative;
          margin-top: -1px;
          background: #fff;
          font-weight: 700;
        }
        .text {
          display: table-cell;
          vertical-align: middle;
          width: 56px;
          font-size: 14px;
          line-height: 14px;
          .border-1px(rgba(7, 17, 27, 0.1));
        }
        .icon {
          display: inline-block;
          vertical-align: top;
          width: 12px;
          height: 12px;
          margin-right: 1px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          .iconImg(3)
        }
      }
    }
    .foods-wrapper {
      flex: 1;
      .title {
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: rgb(147, 153, 159);
        background: #f3f5f7;
      }
      .food-item {
        position: relative;
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        .border-1px(rgba(7, 17, 27, 0.1));
        &:last-child {
          margin-bottom: 0;
          .border-none();
        }
        .icon {
          flex: 0 0 57px;
          margin-right: 10px;
        }
        .content {
          flex: 1;
          .name {
            margin: 2px 0 8px;
            height: 14px;
            line-height: 14px;
            font-size: 14px;
            color: rgb(7, 17, 27);
          }
          .desc, .extra {
            font-size: 10px;
            line-height: 10px;
            color: rgb(147, 153, 159);
          }
          .desc {
            margin-bottom: 8px;
          }
          .extra .sell-count {
            margin-right: 12px;
          }
          .price {
            font-weight: 700;
            line-height: 24px;
            .now {
              margin-right: 8px;
              font-size: 14px;
              color: rgb(240, 20, 20);
            }
            .old {
              text-decoration: line-through;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
          }
          .cartcontrol-wrapper {
            position: absolute;
            right: 0;
            bottom: 12px;
          }
        }
      }
    }
  }


</style>
