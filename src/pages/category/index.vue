<template>
  <div class="category">
    <dd-search></dd-search>
    <div class="category-wrapper">
      <scroll-view scroll-y class="left-menu">
        <ul ref="menuwrapper">
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
            <div class="banner"></div>
            <div class="content" v-for="(sitem, sindex) in contentList.children" :key="sindex">
              <h3>{{sitem.cat_name}}</h3>
              <ul>
                <li v-for="(sonList,sonIndex) in sitem.children" :key="sonIndex">
                  <navigator class="cate-list" hover-class="none">
                    <img class="cat-icon" :src="'https://itjustfun.cn/'+sonList.cat_icon" :alt="sonList.cat_name" mode="aspectFill">
                    <span class="cat-name">{{sonList.cat_name}}</span>
                  </navigator>
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
import search from '../../components/search/search.vue'
export default {
  data () {
    return {
      menuLIst: [],
      active: true,
      contentList: {},
      currentIndex: 0
    }
  },
  methods: {
    handleClickMenu (index) {
      this.currentIndex = index
      this.contentList = this.menuLIst[index]
      // console.log(this.contentList)
    }
  },
  mounted () {
    wx.request({
      url: 'https://itjustfun.cn/api/public/v1/categories',
      success: (res) => {
        // console.log(res)
        const {meta} = res.data
        if (meta.status === 200) {
          const {data} = res.data
          this.menuLIst = data
          this.contentList = data[0]
        }
      }
    })
  },
  components: {
    'dd-search': 'search'
  }
}
</script>

<style lang="scss" scoped>
@import 'style.scss'
</style>

