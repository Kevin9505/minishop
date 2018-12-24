<template>
  <div class="category">
    <dd-search />
    <div class="category-wrapper">
      <scroll-view scroll-y class="left-menu">
        <ul>
          <li 
          :class="{'menu-active':index === currentIndex}"
          v-for="(menuItem, index) in menuLIst" 
          :key="menuItem.cat_id"
          @click="handleClickMenu(index)"
          >
            <span class="menu-text">{{menuItem.cat_name}}</span>
          </li>
        </ul>
      </scroll-view>
      <scroll-view scroll-y class="right-content">
        <div class="content-wrapper">
          <div class="content-list">
            <div class="banner" v-if="menuLIst.length>0"></div>
            <div class="content" v-for="(sitem, sindex) in contentList.children" :key="sindex">
              <div class="title" v-if="sitem.children">/<span>{{sitem.cat_name}}</span>/</div>
              <ul>
                <li @click="handleClickCatelist(sonList.cat_name)" v-for="(sonList,sonIndex) in sitem.children" :key="sonIndex">
                  <div class="cate-list">
                    <img lazy-load class="cat-icon" :src="'https://itjustfun.cn/'+sonList.cat_icon" :alt="sonList.cat_name" mode="aspectFill">
                    <span class="cat-name">{{sonList.cat_name}}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </scroll-view>
    </div>
  </div>
</template>

<script>
// 引用公共组件
import search from '../../components/search/search.vue'
// 引用封装的请求函数
import request from '../../utils/request.js'
export default {
  data () {
    return {
      menuLIst: [],
      contentList: {},
      currentIndex: 0
    }
  },
  methods: {
    // 点击按钮切换定义的商品
    handleClickMenu (index) {
      this.currentIndex = index
      try {
        const value = wx.getStorageSync('cateData')
        if (value) {
          const newValue = JSON.parse(value)
          // console.log(newValue)
          // Do something with return value
          this.contentList = newValue[index]
        }
      } catch (e) {
        // Do something when catch error
        console.log(e)
      }
    },
    // 跳转商品页
    handleClickCatelist (data) {
      wx.navigateTo({
        url: `/pages/search_list/main?keyword=${data}`
      })
    }
  },
  mounted () {
    try {
      // 获取本地缓存
      const value = wx.getStorageSync('cateData')
      // 判断是否有本地缓存,有则从本地获取数据,不然发请求
      if (value) {
        const newValue = JSON.parse(value)
        this.menuLIst = newValue
        this.contentList = newValue[0]
      } else {
        request('https://itjustfun.cn/api/public/v1/categories')
          .then(res => {
            const {meta} = res.data
            if (meta.status === 200) {
              const {data} = res.data
              this.menuLIst = data
              this.contentList = data[0]
              // 缓存本地
              try {
                // 设置本地缓存
                wx.setStorageSync('cateData', JSON.stringify(this.menuLIst))
              } catch (e) { }
            }
          })
        }
      } catch (e) {
        // Do something when catch error
      }
  },
  components: {
    'dd-search': 'search'
  }
}
</script>

<style lang="scss" scoped>
@import 'style.scss'
</style>

