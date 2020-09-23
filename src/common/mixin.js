import {
  debounce
} from './utils.js'

import BackTop from 'components/content/backTop/BackTop.vue'

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null
    }
  },
  mounted() {
    
    this.refresh = debounce(this.$refs.scroll.refresh, 50);
    this.itemImgListener = () => {
      this.refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
    console.log('hunruneizhongde')
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
      console.log('backtop')
    }
  },

}
