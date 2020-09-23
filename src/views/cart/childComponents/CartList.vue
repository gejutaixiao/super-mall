<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" :key="index" :product="item"></cart-list-item>
    </scroll>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  import Scroll from 'components/common/scroll/Scroll.vue'
  import CartListItem from './CartListItem.vue'
  export default {
    name: 'CartList',
    computed: {
      ...mapGetters(['cartList'])
    },
    components: {
      Scroll,
      CartListItem
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped="scoped">
  .cart-list {
    height: calc(100% - 133px);
  }
  .content {
   height: 100%;
   overflow: hidden;
 }
</style>
