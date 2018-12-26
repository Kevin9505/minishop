<template>
  <div class="cart-wrapper">
    <div class="isempty" v-if="isEmpty">
      <img src="../../../static/images/cart_empty@2x.png" alt="提示背景" mode="aspectFill">
      <div class="tips">呀呀呀!!!还没有购买商品呢,快去</div>
    </div>
    <div class="cart" v-if="!isEmpty">
      <!-- 地址 -->
      <div class="address-wrapper">
        <div class="addr" v-if="hasAddress">
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
        <button plain type="default" @click="getUserAddress" v-if="!hasAddress" class="get-address">点击获取地址</button>
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
          <div class="cart-list" v-for="(list, key) in cartData" :key="key">
            <div class="select-icon iconfont icon-xuanze" @click="handleSelectGood(list)" :class="list.isSelected?'hasSelected':''"></div>
            <div class="good-wrapper">
              <navigator :url="'/pages/detail/main?goodsId='+list.goods_id" class="good-img">
                <img :src="list.goods_small_logo" mode="aspectFill" alt="">
              </navigator>
              <div class="good-info">
                <div class="good-name">{{list.goods_name}}</div>
                <div class="tool-wrapper">
                  <div class="price-wrapper">
                    ￥ <span class="price">{{list.goods_price}}</span>
                  </div>
                  <div class="tool">
                    <div class="reduce iconfont icon-wuuiconsuoxiao" @click="reducePayCount(list)"></div>
                    <div class="count">{{list.buyCount}}</div>
                    <div class="add iconfont icon-wuuiconxiangjifangda" @click="addPayCount(list)"></div>
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
            <div 
            class="checked-icon iconfont icon-xuanze" 
            @click="handleSelectAllGood" 
            :class="hasSelectedAll?'hasSelected':''"></div>
            <div class="checked-text">全选</div>
          </div>
          <div class="all-price">
            <div class="count-wrapper">
              <span class="total">合计:</span>
              <span class="price-wrap">
                ￥<span class="count-price">{{totalPrice}}</span>
              </span>
            </div>
            <div class="include-pay">包含运费</div>
          </div>
          <div class="delete-wrapper" @click="handleDeleteSelected" v-if="hasShowDelete">删除</div> 
        </div>
        <div class="pay">结算(3)</div>
      </div>
    </div>
  </div>
</template>

<script>
import splitter from '../../components/splitter.vue'
export default {
  data () {
    return {
      count: 0,
      // 收货地址信息
      addressData: wx.getStorageSync('address') || {},
      cartData: {}
    }
  },
  onShow () {
    // 获取本地存储的商品
    this.cartData = wx.getStorageSync('cartData')
  },
  methods: {
    // 获取地址
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
    },
    // 增加商品购买数量
    addPayCount (list) {
      // 拿到点击的对应商品id
      const goods_id = list.goods_id
      this.cartData[goods_id].buyCount++
      // 更新后存入本地
      wx.setStorageSync('cartData', this.cartData)
    },
    // 减少购买商品数量
    reducePayCount (list) {
      // 获取点击的商品的对应id
      const goods_id = list.goods_id
      // 当商品购买数量等于1时提示是否删除该商品
      if (this.cartData[goods_id].buyCount === 1) {
        // 弹出模态框
        wx.showModal({
          title: '温馨提醒',
          content: '是否删除该商品?',
          success: (res) => {
            if (res.confirm) {
              // 删除对象
              delete this.cartData[goods_id]
              // 存在本地缓存
              wx.setStorageSync('cartData', this.cartData)
              // 刷新data数据
              this.cartData = Object.assign({}, this.cartData)
            } else if (res.cancel) {
              // console.log('用户点击取消')
            }
          }
        })
        return
      }
      // 商品数量减 1
      this.cartData[goods_id].buyCount--
      // 更新后存入本地缓存
      wx.setStorageSync('cartData', this.cartData)
    },
    // 商品是否选中
    handleSelectGood (list) {
      this.cartData[list.goods_id].isSelected = !this.cartData[list.goods_id].isSelected
    },
    // 是否全选
    handleSelectAllGood () {
      Object.keys(this.cartData).forEach(value => {
        this.cartData[value].isSelected = !this.cartData[value].isSelected
      })
    },
    // 点击删除按钮
    handleDeleteSelected () {
      wx.showModal({
        title: '温馨提醒',
        content: '是否删除所选商品',
        success:(res) => {
          if (res.confirm) {
            Object.keys(this.cartData).forEach(value => {
              if (this.cartData[value].isSelected) {
                delete this.cartData[value]
                wx.setStorageSync('cartData', this.cartData)
                // 删除后重新赋值
                this.cartData = Object.assign({}, this.cartData)
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  computed: {
    // 判断是否存在本地地址
    hasAddress () {
      if (JSON.stringify(this.addressData) === '{}') {
        return false
      } if (JSON.stringify(this.addressData) !== '{}') {
        return true
      }
    },
    // 计算总价格
    totalPrice () {
      let price = 0
      // Object.keys(this.cartData)遍历对象返回数组
      Object.keys(this.cartData).forEach(value => {
        const item = this.cartData[value]
        if (this.cartData[value].isSelected) {
          price += item.buyCount * item.goods_price
        }
      })
      return price
    },
    // 判断是否全选
    hasSelectedAll () {
      let hasChecked = true
      Object.keys(this.cartData).forEach(value => {
        if (!this.cartData[value].isSelected) {
          hasChecked = false
          return hasChecked
        }
      })
      return hasChecked
    },
    // 是否显示删除按钮
    hasShowDelete () {
      // 声明变量存储是否显示
      let hasShowSeleteBtn = false
      Object.keys(this.cartData).forEach(value => {
        // 判断商品中isSelected属性
        if (this.cartData[value].isSelected) {
          hasShowSeleteBtn = true
          return this.hasShowSeleteBtn
        }
      })
      return hasShowSeleteBtn
    },
    // 判断购物车是否为空
    isEmpty () {
      if (Object.keys(this.cartData).length > 0) {
        return false
      }
      return true
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

