<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :title="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed"></tab-control>

    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loaderMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-view></feature-view>
      <tab-control :title="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from './childrenComps/HomeSwiper.vue'
  import HomeRecommendView from './childrenComps/HomeRecommendView.vue'
  import FeatureView from './childrenComps/FeatureView.vue'

  import NavBar from 'components/common/navbar/NavBar.vue'
  import TabControl from 'components/content/tabControl/TabControl.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'
  import Scroll from 'components/common/scroll/Scroll.vue'


  import {
    getHomeMultidata,
    getHomeGoods
  } from 'network/home.js'
  import {debounce} from 'common/utils.js'
  import {itemListenerMixin, backTopMixin} from 'common/mixin.js'

  export default {
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll
    },
    mixins: [itemListenerMixin, backTopMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0

      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata()
      //2.请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    mounted() {
      // //1.监听item中图片加载完成
      // const refresh = debounce(this.$refs.scroll.refresh, 50)
      // this.itemImgListener = () =>{
      //   refresh()
      // }
      // this.$bus.$on('itemImageLoad', this.itemImgListener);

      //2.获取tabContorl的offsetTop
      //所有的组件都有一个属性$el：用于获取组件中的元素
    },
    activated() {
      console.log('actived');
      this.$refs.scroll.refresh();
      this.$refs.scroll.scrollTo(0, this.saveY, 0);
    },
    deactivated() {
      // console.log('deactived');
      //1.保存Y值
      this.saveY = this.$refs.scroll.getScrollY();
      //2.取消全局事件监听
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    methods: {
      /**
       * 事件监听相关方法
       */

      tabClick(index) {
        switch(index) {
          case 0:
            this.currentType = 'pop'
            console.log(this.currentType)
            break
          case 1:
            this.currentType = 'new'
            console.log(this.currentType)
            break
          case 2:
            this.currentType = 'sell'
            console.log(this.currentType)
            break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },

      contentScroll(position) {
        // console.log(position);
        //1.判断backTop是否显示
        this.isShowBackTop = (-position.y) > 1000;

        //2.决定tabControl是否吸顶（position：fixed）
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loaderMore() {
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },
      /**
        网络请求相关的方法
      */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // this.result = res
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;

          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped="scoped">
  #home {
    /* padding-top: 44px; */
  height: 100vh;

  position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: white;
   /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
/*  .tab-control {
    position: sticky;
    top: 44px;
    background-color: #fff;
    z-index: 9;
  } */

  .content {
   /* height: 600px; */
   overflow: hidden;

  position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
/*   height: calc(100%-93px);
    overflow: hidden;
    margin-top: 44px; */
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>
