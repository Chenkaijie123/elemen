/**
 * Created by newuser on 2017/9/22.
 */
import * as types from '../mutation-types'

const state = {
  added: [] // 把商品中count>0的商品添加进该数组
}

const getters = {
  carProducts: state => state.added
}

const mutations = {
  [types.RECEIVE_CARTS](state, allGoods) { // 刷新购物车列表数组
   let target=[]
    for(let i=0;i<allGoods.length;i++){
     if(allGoods[i].count>0){
       target.push(allGoods[i])
     }
    }
    state.added=target
    // console.log(state.added[0].name)
  }
}

export default {
  state,
  getters,
  mutations
}
