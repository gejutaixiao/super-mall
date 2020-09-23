<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" @pullingUp="detailpullingUp" :pullUpLoad="true" @scroll="contentScroll" :probeType="3">
      <detail-swiper :topImages="topImages" @detailSwiper="detailSwiper"></detail-swiper>
      <detail-base-info :goodsInfo="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramsInfo" ref="params"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommend" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <!-- <toast></toast> -->
  </div>
</template>

<script>
  import DetailNavBar from './childComponents/DetailNavBar.vue'
  import DetailSwiper from './childComponents/DetailSwiper.vue'
  import DetailBaseInfo from './childComponents/DetailBaseInfo.vue'
  import DetailShopInfo from './childComponents/DetailShopInfo.vue'
  import DetailGoodsInfo from './childComponents/DetailGoodsInfo.vue'
  import DetailParamInfo from './childComponents/DetailParamInfo.vue'
  import DetailCommentInfo from './childComponents/DetailCommentInfo.vue'
  import DetailBottomBar from './childComponents/DetailBottomBar.vue'

  import Scroll from 'components/common/scroll/Scroll.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'

  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from 'network/detail.js'
  import {debounce} from 'common/utils.js'
  import {itemListenerMixin} from 'common/mixin.js'
  import {mapActions} from 'vuex'

  // import Toast from 'components/common/toast/Toast.vue'

  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,

      GoodsList

      // Toast
    },
    mixins: [itemListenerMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramsInfo: {},
        commentInfo: {},
        recommend: [],
        themeTopYs: [],
        getThemeTopYs: null,
        currentIndex: 0
        // message: '',
        // show: false
      }
    },
    methods: {
      ...mapActions(['addCart']),
      addToCart() {
        //1.获取购物车需要展示的信息
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        //2.将商品添加到购物车中(1.Promise 2.mapActions)
        // this.$store.dispatch('addCart', product).then(res => {
        //   console.log(res);
        // })
        this.addCart(product).then(res => {
          // console.log(res);
          // this.show = true;
          // this.message = res;

          // setTimeout(() => {
          //   this.show = false
          //   this.message = ''
          // }, 1500)
          this.$toast.show(res)
        })
      },
      imageLoad() {
        this.refresh();
        this.getThemeTopYs()
      },
      detailpullingUp() {
        console.log('detailpullingUp')
      },
      detailSwiper() {
        this.refresh()
      },
      titleClick(index) {
        // console.log(index);
        this.$refs.scroll.scrollTo(0, this.themeTopYs[index])
      },
      contentScroll(position) {
        // console.log(position);
        //1.获取y值
        const positionY = -position.y;
        let length = this.themeTopYs.length
        /**
         * [0, 7983, 9120, 9452， 非常大的值]
         * Number.MAX_VALUE
         * positionY在0 和 7938 之间， index = 0
         * positionY在 7938 和 9120 之间， index = 1
         * positionY在9120 和 9452 之间， index= 2
         * positionY在9120 和 非常大的值之间，index = 3
         *
         * positionY大于等于9120，index = 3
         */
        //2.positionY和主题里面的值进行对比
        for(let i in this.themeTopYs) {
          // if(positionY > -this.themeTopYs[i*1] && positionY < -this.themeTopYs[i*1+1]) {
          //   console.log(i);
          // }
          /**
           * if(this.currentIndex !== i && ())
           */
          if(this.currentIndex !== i && ((i < length - 1 && positionY >= -this.themeTopYs[i*1] && positionY < -this.themeTopYs[i*1+1]) || (i == length - 1 && positionY >= -this.themeTopYs[i*1]))) {
            this.currentIndex = i;
            console.log(this.currentIndex);
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
      }
    },
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid

      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        console.log(res)
        //1.获取顶部轮播图数据
        const data = res.result;
        this.topImages = data.itemInfo.topImages

        //2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        //3.创建店铺信息对象
        this.shop = new Shop(data.shopInfo)

        //4.保存商品的详情数据
        this.detailInfo = data.detailInfo

        //5.获取参数信息
        this.paramsInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //6.取出评论信息
        if(data.rate.cRate != 0) {
          this.commentInfo = data.rate.list[0]
        }

        //根据最新的数据，对应的DOM是已经被渲染出来了
        //但是图片依然是没有加载完（获取到offsetTop是不包含图片的）
        //offetTop值不对的时候，都是因为图片的问题
        // this.$nextTick(() => {
        //   this.themeTopYs = [];
        //   this.themeTopYs.push(0);
        //   this.themeTopYs.push(-this.$refs.params.$el.offsetTop);
        //   this.themeTopYs.push(-this.$refs.comment.$el.offsetTop);
        //   this.themeTopYs.push(-this.$refs.recommend.$el.offsetTop);
        //   console.log(this.themeTopYs)
        // })
      });

      //3.请求推荐数据
        getRecommend().then(res => {
          console.log(res, '777777');
          this.recommend = res.data.list
        });

        //4.给getThemeTopYs赋值(对this.themeTopYs赋值的操作进行防抖)
        this.getThemeTopYs = debounce(() => {
          this.themeTopYs = [];
          this.themeTopYs.push(0);
          this.themeTopYs.push(-this.$refs.params.$el.offsetTop);
          this.themeTopYs.push(-this.$refs.comment.$el.offsetTop);
          this.themeTopYs.push(-this.$refs.recommend.$el.offsetTop);
          console.log(this.themeTopYs)
        }, 100)
    },
    mounted() {
      this.$refs.scroll.refresh();

      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTopYs)
    },
    // updated() {
    //   this.themeTopYs = []
    //   this.themeTopYs.push(0);
    //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    //   console.log(this.themeTopYs)
    // },
    destroyed() {
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    /* z-index: 9; */
    background-color: #fff;
  }
  .content {
    position: relative;
    height: calc(100% - 93px);
    overflow: hidden;
  }
</style>
