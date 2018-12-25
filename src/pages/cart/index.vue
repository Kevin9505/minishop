<template>
  <div class="cart">
    <div class="address-wrapper">
      <div class="consignee-user">
        <span class="user">收货人: </span>
        <div class="info-wrapper">
          <span class="name">苏</span>
          <span class="phone">
          13535239647
          <span class="more">></span>
          </span>
        </div>
      </div>
      <div class="consignee-address">
        收货地址: <span class="address">广东省广州市天河区珠吉路</span>
      </div>
    </div>
    <!-- 分割线 -->
    <div class="line"></div>
    <dd-splitter />
    <!-- 购物车商品内容 -->
    <div class="cart-wrapper">
      <div class="title">
        <span class=""></span>
        优购生活馆
      </div>
      <div class="cart-content">
        <div class="cart-list">
          <div class="select-icon iconfont icon-xuanze"></div>
          <div class="good-wrapper">
            <div class="good-img">
              <!-- <img src="" height="160" width="160" mode="aspectFill" alt=""> -->
            </div>
            <div class="good-info">
              <div class="good-name">初遇2017初遇2017初遇2017初遇2017初遇2017初遇2017初遇2017初遇2017初遇2017初遇2017</div>
              <div class="tool-wrapper">
                <div class="price-wrapper">
                  ￥ <span class="price">279.00</span>
                </div>
                <div class="tool">
                  <div class="reduce iconfont icon-wuuiconsuoxiao"></div>
                  <div class="count">11</div>
                  <div class="add iconfont icon-wuuiconxiangjifangda"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 支付款 -->
    <div class="pay-tool">
      <div class="tool-left">
        <div class="select-all">
          <div class="checked-icon iconfont icon-xuanze"></div>
          <div class="checked-text">全选</div>
        </div>
        <div class="all-price">
          <div class="count-wrapper">
            <span class="total">合计:</span>
            <span class="price-wrap">
              ￥<span class="count-price">14110.00</span>
            </span>
          </div>
          <div class="include-pay">包含运费</div>
        </div>
      </div>
      <div class="pay">结算(3)</div>
    </div>
  </div>
</template>

<script>
import splitter from '../../components/splitter.vue'
export default {
  data () {
    return {
      count: 0
    }
  },
  onLoad () {
    wx.login({
      success (res) {
      console.log(11)
      console.log(res)
      if (res.code) {
        //发起网络请求
        wx.request({
          url: 'https://itjustfun.cn/api/public/v1/users/wxlogin',
          data: {
            code: res.code
          }
        })
      } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    wx.getUserInfo({
      success: function(res) {
        console.log(res)
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
      }
    })
    wx.getSetting({
      success(res) {
        console.log(1221)
        console.log(res)
        console.log(res.authSetting)
        // res.authSetting = {
        //   "scope.userInfo": true,
        //   "scope.userLocation": true
        // }
      }
    })
  },
  components: {
    'dd-splitter': splitter
  }
}
</script>

<style lang="scss" scoped>
@import 'style.scss'
</style>

