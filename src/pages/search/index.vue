<template>
  <div class="search-wrapper">
    <div class="input-wrapper">
      <div class="search-box">
        <icon class="icon" type="search" size="16" />
        <input class="input" confirm-type="search" type="text" placeholder="请输入你想要的商品">
      </div>
      <navigator class="cancel-btn">取消</navigator>
    </div>
    <div class="history-wrapper">
      <div class="title">
        <div class="history-title">历史记录</div>
        <icon class="icon" @click="handleClearHistory" type="clear" size="16" />
      </div>
      <div class="content-wrapper">
        <div class="history-list" v-for="(list, index) in historyData" :key="index">
          {{list}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      historyData: ['小秘密', '你是谁', '你是谁', '你是谁', '你是谁',]
    }
  },
  methods: {
    handleClearHistory () {
      console.log(11)
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'style.scss';
</style>
