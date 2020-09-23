<template>
  <div class="bottom-bar">

    <div class="check-info">
      <check-button class="check-button" :is-checked="isSelectedAll" @click.native="checkButtonClick"></check-button>
      <span>全选</span>
    </div>

    <div class="price">
      合计：{{totalPrice}}
    </div>

    <div class="cacluate">
      去计算({{checkLength}})
    </div>

  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton.vue'
  import {mapGetters} from 'vuex'
  export default {
    name: '',
    components: {
      CheckButton
    },
    methods: {
      checkButtonClick() {
        if(this.isSelectedAll) { //全部选中
          this.cartList.forEach(item => item.checked = false)
        } else {  //部分或全部不选中
          this.cartList.forEach(item => item.checked = true)
        }
      }
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return '￥' + this.$store.getters.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue += item.price * item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectedAll() {
        //1.使用filter
        // if(this.cartList.length === 0) return false
        // return !(this.cartList.filter(item => !item.checked).length)

        //2.使用find函数
        // if(this.cartList.length === 0) return false
        // return !this.cartList.find(item => !item.checked)

        //3.使用普通方法
        if(this.cartList.length === 0) return false
        for(let item of this.cartList) {
          if(!item.checked) {
            return false
          }
        }
        return true
      }
    }
  }
</script>

<style scoped="scoped">
  .bottom-bar {
    position: relative;
    line-height: 40px;
    display: flex;

    height: 40px;
    background-color: #eee;
    font-size: 14px;
  }

  .check-info {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .price {
    margin-left: 30px;
    flex: 1;
  }

  .cacluate {
    width: 100px;
    text-align: center;
    background-color: hotpink;
    color: white;
  }
</style>
