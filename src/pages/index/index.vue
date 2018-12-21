<template>
  <div class="index">
    <!-- 搜索框 -->
    <dd-search></dd-search>
    <!-- 轮播图 -->
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
          <navigator hover-class="none" :url="item.navigator_url" :open-type="item.open_type">
            <image
              :src="item.image_src"
              class="slide-image"
              mode="aspectFill"
            />
          </navigator>
        </swiper-item>
      </block>
    </swiper>
    <!-- 导航菜单 -->
    <div class="menus">
      <navigator hover-class="none" :open-type="item.open_type" :url="item.navigator_url" class="menu-list" v-for="(item, index) in menus" :key="index">
        <img :src="item.image_src" alt="" mode="aspectFill">
      </navigator>
    </div>
  </div>
</template>

<script>
import search from "@/components/search/search.vue";
export default {
  data () {
    return {
      imgUrls: [],
      menus: []
    }
  },
  mounted () {
    wx.request({
      url: 'https://itjustfun.cn/api/public/v1/home/swiperdata',
      success: (res) => {
        const {meta} = res.data
        if (meta.status === 200) {
          const {data} = res.data
          this.imgUrls = data
        }
      }
    })
    wx.request({
      url: 'https://itjustfun.cn/api/public/v1/home/catitems',
      success: (res) => {
        console.log(res)
        const {meta} = res.data
        if (meta.status === 200) {
          const {data} = res.data
          this.menus = data
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
@import 'index.scss';
</style>
