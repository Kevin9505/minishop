<template>
  <div class="search-arapper">
    <div class="search-input">
      <icon type="search" size="14" />
      搜索
    </div>
  </div>
</template>
<style lang="scss" scoped>
.search-arapper{
  padding: 20rpx 16rpx;
  background-color: #ff2d4a;
  // position: fixed;
  // top: 0;
  // left: 0;
  // z-index: 10;
  .search-input{
    // width: 725rpx;
    height: 60rpx;
    // width: 100%;
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
