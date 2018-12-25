<template>
  <div class="search-wrapper">
    <!-- 搜索框 -->
    <div class="input-wrapper">
      <div class="search-box">
        <icon class="icon" type="search" size="16" @click="handleClickSearch" />
        <input class="input" focus v-model="searchValue" @confirm="handleClickSearch" confirm-type="search" type="text" placeholder="请输入你想要的商品">
      </div>
      <navigator v-if="searchValue" @click="handleCancelSearch" class="cancel-btn">取消</navigator>
    </div>
    <div class="history-wrapper">
      <div class="title">
        <div class="history-title">历史记录</div>
        <icon class="icon" @click="handleClearHistory" v-if="historyData.length > 0" type="clear" size="16" />
      </div>
      <div class="content-wrapper">
        <div class="history-list" @click="handleClickHistoryList(list)" v-for="(list, index) in historyData" :key="index">
          {{list}}
        </div>
      </div>
      <div class="tips" v-if="historyData.length === 0">呀呀呀,还没有搜索记录呢...</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 搜索记录
      historyData: wx.getStorageSync('historyData') || [],
      // 输入框的值
      searchValue: ''
    }
  },
  methods: {
    // 清除所有的搜索记录
    handleClearHistory () {
      wx.clearStorage('historyData')
      this.historyData = []
    },
    // 确认搜索
    handleClickSearch () {
      // 在搜索记录中追加
      this.historyData.unshift(this.searchValue)
      // 去除重复的记录
      const newData = new Set(this.historyData)
      // 解构
      this.historyData = [...newData]
      // 设置本地缓存
      wx.setStorageSync('historyData', this.historyData)
      // 跳转页面
      wx.navigateTo({
        url: `/pages/goods_list/main?query=${this.searchValue}`
      })
      // 清空输入框
      this.searchValue = ''
    },
    // 取消搜索
    handleCancelSearch () {
      this.searchValue = ''
    },
    handleClickHistoryList (list) {
      wx.navigateTo({
        url: `/pages/goods_list/main?keyword=${list}`
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style.scss';
</style>
