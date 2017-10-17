/**
 * Created by newuser on 2017/9/21.
 */
import * as types from '../mutation-types'
const state = {
  cartGoods: [],
  value: false
}

const getters = {
  allGoods: state => state.cartGoods,
  valueChange: state => state.value

}

const mutations = {
  [types.RECEIVE_FOODS](state, {goods}) { // 过滤去除重复的食物商品
    let allGoods = []
    for (let i = 0; i < goods.length; i++) {
      let item = goods[i]
      for (let j = 0; j < item.foods.length; j++) {
        let food = item.foods[j]
        let test = allGoods.find(f => f.name === food.name)
        if (!test) {
          food.count = 0
          allGoods.push(food)
        }
      }
    }
    state.cartGoods = allGoods
  },
  [types.ADD_TO_CART](state, food) {
    state.cartGoods.find(f => f.name === food.name).count++
    state.value = !state.value
  },
  [types.DEC_TO_CART](state, food) {
    state.cartGoods.find(f => f.name === food.name).count--
    state.value = !state.value
  }

}

export default {
  state,
  getters,
  mutations
}
