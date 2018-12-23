<template>
  <div class="search-list">
    <dd-search />
    <div class="tool-tab">
      <div class="tab-list" @click="handleChangeTab(tabIndex)" :class="{'tab-active':currentTabIndex===tabIndex}" v-for="(tabItem, tabIndex) in tabList" :key="tabIndex">{{tabItem}}</div>
    </div>
    <!-- 商品区 -->
    <div class="good-wrapper">
      <div class="good-list">
        <div class="list-left"></div>
        <div class="list-right">
          <div class="good-name">紫米紫米紫米紫米紫米紫米紫米紫米紫米紫米紫米紫米紫米紫米</div>
          <div class="good-price">
            ￥<span class="price">69</span>
          </div>
        </div>
      </div>
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
      tabList: ['综合', '销量', '价格'],
      currentTabIndex: 0
    }
  },
  methods: {
    handleChangeTab (index) {
      this.currentTabIndex = index
    }
  },
  onload (query) {
    console.log(query)
    this.query = query
    request.get('https://itjustfun.cn/api/public/v1/goods/search', {
      query: this.query,
      pagenum: this.pagenum,
      pagesize: this.pagesize
    })
      .then(res => {
        console.log(11)
        console.log(res)
      })
  },
  components: {
    "dd-search": search
  }
}
</script>
<style lang="scss" scoped>
@import 'style.scss'
</style>
