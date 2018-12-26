<template>
  <div class="personal-wrapper">
    <div class="userinfo-wrapper">
      <div class="user-info">
        <div class="setting iconfont icon-weibiaoti103"></div>
        <div class="avator">
        </div>
        <div class="message iconfont icon-xiaoxi1"></div>
      </div>
      <div class="user-name">登录 / 注册</div>
    </div>
    <div class="content">
      <!-- 收藏 -->
      <div class="tool-wrapper">
        <div class="tool-list">
          <span class="count">0</span>
          <span class="list-name">收藏的店铺</span>
        </div>
        <div class="tool-list">
          <span class="count">0</span>
          <span class="list-name">收藏的店铺</span>
        </div>
        <div class="tool-list">
          <span class="count">0</span>
          <span class="list-name">收藏的店铺</span>
        </div>
        <div class="tool-list">
          <span class="count">0</span>
          <span class="list-name">收藏的店铺</span>
        </div>
      </div>
      <!-- 订单管理 -->
      <div class="order-wrapper">
        <div class="order-title">我的订单</div>
        <div class="order-content">
          <div class="order-list">
            <div class="icon iconfont icon-ziyuan"></div>
            <div class="order-text">待付款</div>
          </div>
          <div class="order-list">
            <div class="icon iconfont icon-daishouhuo"></div>
            <div class="order-text">待收货</div>
          </div>
          <div class="order-list">
            <div class="icon iconfont icon-icon"></div>
            <div class="order-text">退款/退货</div>
          </div>
          <div class="order-list">
            <div class="icon iconfont icon-quanbudingdanmb"></div>
            <div class="order-text">全部订单</div>
          </div>
        </div>
      </div>
      <div class="address">收货地址管理<span class="address-icon iconfont icon-you"></span></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orderList: ['待付款', '待收货', '退款/退货', '全部订单']
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'style.scss';
</style>
