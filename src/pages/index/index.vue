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
    <!-- 产品楼层 -->
    <div class="floor-wrapper">
      <div class="floor-item" v-for="(floorItem, index) in floorData" :key="index">
        <div class="floor-title">
          <img :src="floorItem.floor_title.image_src" :alt="floorItem.floor_title.name" mode="aspectFill">
        </div>
        <div class="floor-content">
          <div class="content-left">
            <navigator 
            class="left-item"
            hover-class="none"
            :open-type="floorItem.product_list[0].open_type" :url="floorItem.product_list[0].navigator_url">
              <img :src="floorItem.product_list[0].image_src" :alt="floorItem.product_list[0].name" mode="aspectFill">
            </navigator>
          </div>
          <div class="content-right">
            <navigator 
            hover-class="none"
            class="right-item"
            v-if="list!==0"
            :open-type="contentItem.open_type" :url="contentItem.navigator_url" v-for="(contentItem, list) in floorItem.product_list" :key="list">
              <img :src="contentItem.image_src" :alt="contentItem.name">
            </navigator>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import search from "@/components/search/search.vue"
import request from '@/utils/request.js'
export default {
  data () {
    return {
      imgUrls: [],
      menus: [],
      floorData: []
    }
  },
  mounted () {
    // wx.request({
    //   url: 'https://itjustfun.cn/api/public/v1/home/swiperdata',
    //   success: (res) => {
    //     const {meta} = res.data
    //     if (meta.status === 200) {
    //       const {data} = res.data
    //       this.imgUrls = data
    //     }
    //   }
    // })
    // wx.request({
    //   url: 'https://itjustfun.cn/api/public/v1/home/catitems',
    //   success: (res) => {
    //     // console.log(res)
    //     const {meta} = res.data
    //     if (meta.status === 200) {
    //       const {data} = res.data
    //       this.menus = data
    //     }
    //   }
    // })
    // wx.request({
    //   url: 'https://www.zhengzhicheng.cn/api/public/v1/home/floordata',
    //   success: (res) => {
    //     // console.log(res)
    //     const {meta} = res.data
    //     if (meta.status === 200) {
    //       const {message} = res.data
    //       this.floorData = message
    //     }
    //   }
    // })
    this.getData()
  },
  methods: {
    // async await
    // async 放置在一个函数前面,意味着这个函数总是返回一个promise,如果代码中有return <非promise>语句，JavaScript会自动把返回的这个value值包装成promise的resolved值。
    // await可以让JavaScript进行等待，直到一个promise执行并返回它的结果，JavaScript才会继续往下执行。
    // try{}catch(err){} 捕获代码块错误信息
    async getData () {
      try{
        let res = await request('https://itjustfun.cn/api/public/v1/home/swiperdata')
        const {meta} = res.data
        if (meta.status === 200) {
          const {data} = res.data
          this.imgUrls = data
        }
      }catch(err){
        console.log(err)
      }

      try{
        let res = await request('https://itjustfun.cn/api/public/v1/home/catitems')
        const {meta} = res.data
        if (meta.status === 200) {
          const {data} = res.data
          this.menus = data
        }
      }catch(err){
        console.log(err)
      }

      try{
        let res = await request('https://www.zhengzhicheng.cn/api/public/v1/home/floordata')
        const {meta} = res.data
        if (meta.status === 200) {
          const {message} = res.data
          this.floorData = message
        }
      }catch(err){
        console.log(err)
      }
      
    }
  },
  components: {
    "dd-search": "search"
  }
};
</script>

<style scoped lang="scss">
@import 'index.scss';
</style>
