<template>
  <div class="index">
    <dd-search></dd-search>
    <swiper
      indicator-dots=true
      indicator-color="rgba(255,255,255,1)"
      indicator-active-color="#ff2d4a"
      autoplay=true
      interval=5000
      duration=500
      circular=true
    >
      <block v-for="(item, index) in imgUrls" :key="index">
        <swiper-item>
          <navigator :url="item.navigator_url" :open-type="item.open_type">
            <image
              :src="item.image_src"
              class="slide-image"
              mode="aspectFill"
            />
          </navigator>
        </swiper-item>
      </block>
    </swiper>
  </div>
</template>

<script>
import search from "@/components/search/search.vue";
export default {
  data () {
    return {
      // https://itjustfun.cn
      imgUrls: []
    }
  },
  mounted () {
    wx.request({
      url: 'https://itjustfun.cn/api/public/v1/home/swiperdata',
      // type: 'get',
      // dataType: 'json',
      success: (res) => {
        const {meta} = res.data
        if (meta.status === 200) {
          const {data} = res.data
          this.imgUrls = data
        }
      }
    })
  },
  components: {
    "dd-search": "search"
  }
};
</script>

<style scoped lang="scss">
.index{
  .slide-image{
    width: 100%;
    height: 340rpx;
    display: block;
  }
}
</style>
