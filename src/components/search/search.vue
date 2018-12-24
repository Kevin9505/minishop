<template>
  <div class="search-arapper">
    <navigator hover-class="none" url="/pages/search/main" open-type="navigate" class="search-input">
      <icon type="search" size="14" />
      搜索
    </navigator>
  </div>
</template>
<script>
export default {
  methods: {
    // handleToSearch () {
    //   wx.navigateTo({
    //     url: '/pages/search/main'
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
.search-arapper{
  padding: 20rpx 16rpx;
  background-color: #ff2d4a;
  .search-input{
    height: 60rpx;
    font-size: 14px;
    color: #bbbbbb;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    background-color: #fff;
    icon{
      margin-right: 16rpx;
    }
  }
}
</style>
