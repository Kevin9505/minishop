<template>
  <div class="search-list">
    <!-- <dd-search /> -->
    <div class="search-arapper">
      <div class="search-input" @click="handleChangeToSearch">
        <icon type="search" size="14" />
        {{query}}
      </div>
    </div>
    <div class="tool-tab">
      <div class="tab-list" @click="handleChangeTab(tabIndex)" :class="{'tab-active':currentTabIndex===tabIndex}" v-for="(tabItem, tabIndex) in tabList" :key="tabIndex">{{tabItem}}</div>
    </div>
    <!-- 商品区 -->
    <div class="good-wrapper">
      <navigator :url="'/pages/detail/main?goodsId=' + goodsList.goods_id" class="good-list" v-for="(goodsList, index) in goodsData" :key="index">
        <div class="list-left">
          <img lazy-load :src="goodsList.goods_small_logo" alt="" mode="aspectFill">
        </div>
        <div class="list-right">
          <div class="good-name">{{goodsList.goods_name}}</div>
          <div class="good-price">
            ￥<span class="price">{{goodsList.goods_price}}</span>
          </div>
        </div>
      </navigator>
      <!-- 提示没有更多数据 -->
      <div v-if="!hasMore" class="tips">我是有底线的男人...</div>
    </div>
  </div>
</template>
<script>
import search from '../../components/search/search.vue'
import request from '../../utils/request.js'
export default {
  data () {
    return {
      query: '',
      pagenum: 1,
      pagesize: 20,
      // tab栏的数据
      tabList: ['综合', '销量', '价格'],
      // tab的切换的属性
      currentTabIndex: 0,
      // 商品数据
      goodsData: [],
      // 判断是否还有更多数据
      hasMore: true
    }
  },
  methods: {
    // 切换tab栏
    handleChangeTab (index) {
      this.currentTabIndex = index
    },
    // 获取商品列表数据
    getGoodsList () {
      // 已经没有更多数据时,不用再发请求了
      if (!this.hasMore) {
        return
      }
      // 发送请求拿数据
      request.get('https://itjustfun.cn/api/public/v1/goods/search', {
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      })
        .then(res => {
          const {meta} = res.data
          if (meta.status === 200) {
            const {goods} = res.data.data
            // 当goods列表的数量小于this.pagesize时,没有更多数据了
            if (goods.length < this.pagesize) {
              this.hasMore = false
              wx.showToast({ //期间为了显示效果可以添加一个过度的弹出框提示“加载中”  
                title: '到底啦!!!',
                icon: 'success',
                duration: 1000
              });
            }
            // 合并数据Array.concat(array)
            this.goodsData = this.goodsData.concat(goods)
            this.pagenum++
          }
        })
    },
    // 点击搜索框跳转搜索页
    handleChangeToSearch () {
      wx.navigateTo({
        url: '/pages/search/main'
      })
      Object.assign(this,this.$options.data())
      console.log(11)
    }
  },
  onLoad (query) { // 监听页面加载(只执行一次)
    console.log(query)
    this.query = query.query || ''
  },
  onShow () { // 监听页面显示(页面显示时就会执行)
    this.getGoodsList()
  },
  onUnload () {
    // 解决同一路由切换时,上一次的页面数据会保留问题
    Object.assign(this, this.$options.data())
  },
  onReachBottom () { // 页面滚到底部时触发
    this.getGoodsList()
  },
  components: {
    "dd-search": search
  }
}
</script>
<style lang="scss" scoped>
@import 'style.scss'
</style>
