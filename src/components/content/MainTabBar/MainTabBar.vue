<template>
  <div class="main-tab-bar">
    <tab-bar>
      <tab-bar-item path="/home">
        <img src="~assets/img/tabbar/shouye1.png" alt="" slot="item-icon">
        <img src="~assets/img/tabbar/shouye.png" alt="" slot="item-icon-active">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <img src="~assets/img/tabbar/leimupinleifenleileibie.png" alt="" slot="item-icon">
        <img src="~assets/img/tabbar/leimupinleifenleileibie2.png" alt="" slot="item-icon-active">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="cart">
        <img src="~assets/img/tabbar/gouwuchezhengpin.png" alt="" slot="item-icon">
        <img src="~assets/img/tabbar/gouwuche2.png" alt="" slot="item-icon-active">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="profile">
        <img src="~assets/img/tabbar/wode.png" alt="" slot="item-icon">
        <img src="~assets/img/tabbar/wode2.png" alt="" slot="item-icon-active">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
  import TabBar from 'components/common/tabbar/TabBar.vue'
  import TabBarItem from 'components/common/tabbar/TabBarItem.vue'
export default {
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style>
  /* @import url("assets/css/base.css"); */
  .main-tab-bar {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
  }
  
  .tab-bar-item {
    flex: 1;
  }
</style>
