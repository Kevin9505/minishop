<template>
  <div class="category">
    <dd-search></dd-search>
    <div class="category-wrapper">
      <div class="left-menu">
        <ul ref="menuwrapper">
          <li :class="index === 0?'menu-active':''" v-for="(menuItem, index) in menuLIst" :key="menuItem.cat_id">
            <span class="menu-text">{{menuItem.cat_name}}</span>
          </li>
        </ul>
      </div>
      <div class="right-content">
        <div class="content-wrapper">
          <div class="content-list" v-for="(fitem, findex) in contentList" :key="findex">
            <div class="banner"></div>
            <div class="content" v-for="(sitem, sindex) in fitem.children" :key="sindex">
              <h3>{{sitem.cat_name}}</h3>
              <ul>
                <li v-for="(sonList,sonIndex) in sitem.children" :key="sonIndex">
                  <navigator class="cate-list" hover-class="none">
                    <img class="cat-icon" :src="'https://itjustfun.cn/'+sonList.cat_icon" :alt="sonList.cat_name">
                    <span class="cat-name">{{sonList.cat_name}}</span>
                  </navigator>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import search from '@/components/search/search.vue'
export default {
  data () {
    return {
      menuLIst: [],
      active: true,
      contentList: []
    }
  },
  mounted () {
    wx.request({
      url: 'https://itjustfun.cn/api/public/v1/categories',
      success: (res) => {
        console.log(res)
        const {meta} = res.data
        if (meta.status === 200) {
          const {data} = res.data
          this.menuLIst = data
          this.contentList = data
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

