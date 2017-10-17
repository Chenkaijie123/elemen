/**
 * Created by newuser on 2017/9/20.
 */
import * as types from './mutation-types'
export const linstenTranstionEnd = (context, {obj, callback}) => {
  if (typeof obj === 'object') {
    obj.addEventListener('webkitTransitionEnd', () => {
      callback && callback()
    })
    obj.addEventListener('transitionEnd', () => {
      callback && callback()
    })
  }
}

export const transitionAgain = ({state, commit}, {obj, modules}) => {
  console.log(state[modules].index )
  if (state[modules].index >= state[modules].length) {
    commit(types.REMOVE_TRANSITION, {obj})
    commit(types.SET_TRANSLATE, {x: 0, y: 0, z: 0, obj})
    state[modules].index = 0
  }
}

export const addToCart = ({commit, getters}, food) => {
  commit(types.ADD_TO_CART, food)
  commit(types.RECEIVE_CARTS, getters.allGoods)
}

export const decToCart = ({commit, getters}, food) => {
  commit(types.DEC_TO_CART, food)
  commit(types.RECEIVE_CARTS, getters.allGoods)
}
