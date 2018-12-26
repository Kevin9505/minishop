<template>
  <div class="cart">
    <!-- 地址 -->
    <div class="address-wrapper">
      <div class="addr" v-if="JSON.stringify(addressData)">
        <div class="consignee-user" @click="getUserAddress">
          <span class="user">收货人: </span>
          <div class="info-wrapper">
            <span class="name">{{addressData.userName}}</span>
            <span class="phone">
            {{addressData.telNumber}}
            <span class="more iconfont icon-you"></span>
            </span>
          </div>
        </div>
        <div class="consignee-address">
          收货地址: <span class="address">{{addressData.provinceName}}{{addressData.cityName}}{{addressData.countyName}}{{addressData.detailInfo}}</span>
        </div>
      </div>
      <button plain type="default" v-if="!JSON.stringify(addressData)" @click="getUserAddress" class="get-address">点击获取地址</button>
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
      <div class="tool-left" :class="{'checked-padding':!hasChecked}">
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
        <div class="delete-wrapper" v-if="hasChecked">删除</div> 
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
      count: 0,
      hasChecked: false,
      // 收货地址信息
      addressData: wx.getStorageSync('address') || {}
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
  methods: {
    getUserAddress () {
      wx.chooseAddress({
      success: (res) => {
        // console.log(res)
        this.addressData = res
        // console.log(this.addressData,11)
        wx.setStorageSync('address', this.addressData)
        // try {
        //   wx.setStorageSync('addressData', this.addressData)
        // } catch (e) { }
        // console.log(res.userName)
        // console.log(res.postalCode)
        // console.log(res.provinceName)
        // console.log(res.cityName)
        // console.log(res.countyName)
        // console.log(res.detailInfo)
        // console.log(res.nationalCode)
        // console.log(res.telNumber)
      }
    })
    }
  },
  components: {
    'dd-splitter': splitter
  }
}
</script>

<style lang="scss" scoped>
@import 'style.scss'
</style>

