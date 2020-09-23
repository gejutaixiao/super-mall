import {ADD_COUNTER, ADD_TO_CART} from './mutations-types.js'

export default {
  addCart(context, payLoad) {
    return new Promise((resolve, reject) => {
      //payLoad新添加的商品
      // let oldProduct = null;
      // for(let item of state.cartList) {
      //   if(item.iid = payLoad.iid) {
      //     oldProduct = item;
      //   }
      // }
      //1.查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(function(item) {
        return item.iid === payLoad.iid
      })
      //2.判断oldProduct
      if (oldProduct) { //数量+1
        // oldProduct.count += 1;
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前的商品数量+1')
      } else {  //添加新的商品
        payLoad.count = 1;
        // state.cartList.push(payLoad)
        context.commit(ADD_TO_CART, payLoad)
        resolve('添加了新的商品')
      }
    })
  }
}
