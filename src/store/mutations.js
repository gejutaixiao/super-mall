import {ADD_COUNTER, ADD_TO_CART} from './mutations-types.js'

export default {
  //mutations的唯一目的就是修改state中状态
  //mutations中的每个方法尽可能完成的事件比较单一一点
  [ADD_COUNTER](state, payLoad) {
    payLoad.count++
  },
  [ADD_TO_CART](state, payLoad) {
    payLoad.checked = true;
    state.cartList.push(payLoad)
  }
}
