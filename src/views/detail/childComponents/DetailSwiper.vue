<template>
    <swiper class="detail-swiper">
      <swiper-item v-for="item in topImages">
        <img :src="item" alt="" @load="detailSwiper">
      </swiper-item>
    </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper/index.js'
  export default {
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      detailSwiper() {
        this.$emit('detailSwiper')
      }
    }
  }
</script>

<style scoped>
  .detail-swiper {
    height: 300px;
    overflow: hidden;
  }
</style>
