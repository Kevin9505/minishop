<template>
  <div class="detail" v-if="hasData">
    <scroll-view scroll-y class="detail-wrapper">
      <!-- 轮播图 -->
      <div class="swiper">
        <!-- 轮播图 -->
        <swiper
          indicator-dots=true
          indicator-color="rgba(255,255,255,1)"
          indicator-active-color="#ff2d4a"
          autoplay=true
          interval=5000
          duration=500
          circular=true
          style="height:720rpx;"
        >
          <block
            v-for="(picList, index) in detailData.pics"
            :key="index">
            <swiper-item
            style="height:720rpx;">
              <image
                :src="picList.pics_big_url"
                class="slide-image"
                mode="aspectFill"
                style="height:720rpx;width:750rpx;"
              />
            </swiper-item>
          </block>
        </swiper>
      </div>
      <!-- 商品信息 -->
      <div class="information">
        <div class="price">￥<span>{{detailData.goods_price}}</span></div>
        <div class="describe">
          <span class="goog-name">
            {{detailData.goods_name}}
          </span>
          <span class="collect">
            <span class="iconfont icon-shoucang"></span>
            收藏
          </span>
        </div>
        <div class="delivery">快递: <span>免运费</span></div>
      </div>
      <!-- 分割线 -->
      <dd-splitter />
      <!-- tab栏 -->
      <div class="tab-wrapper">
        <div class="tab-list" @click="handleChangeTab(index)" :class="{'active-tab':currentIndex === index}" v-for="(tab, index) in tabList" :key="index">
          {{tab}}
        </div>
      </div>
      <div class="introduce" v-html="detailData.goods_introduce"></div>
    </scroll-view>
    <!-- 购物车 -->
    <div class="shopcart">
      <div class="shopcart-left">
        <button open-type="contact" class="change-searver">联系客服</button>
        <div class="server">
          <span class="iconfont icon-kefu"></span>
          <span class="server-text">联系客服</span>
        </div>
        <navigator url="/pages/cart/main" open-type="switchTab" hover-class="none" class="cart">
          <span class="iconfont icon-gouwuche"></span>
          <div class="cart-text">购物车</div>
        </navigator>
        <div class="tips" v-show="totalCount">{{totalCount}}</div>
      </div>
      <div class="shopcart-right">
        <div class="add-cart" @click="handleAddToCart(detailData.goods_id)">加入购物车</div>
        <div class="buy">立即购买</div>
      </div>
    </div>
  </div>
</template>
<script>
import request from '../../utils/request.js'
import splitter from '../../components/splitter.vue'
export default {
  data () {
    return　{
      detailData: {},
      hasData: false,
      tabList: ['商品介绍', '规格参数', '售后保障'],
      currentIndex: 0,
      goods_id: '',
      totalCount: ''
    }
  },
  onLoad (query) {
    // 获取传过来的数据
    this.goods_id = query.goodsId
  },
  onShow () {
    this.getDetailData()
  },
  onUnLoad () {
    Object.assign(this,this.$options.data())
  },
  methods: {
    // 获取商品详情数据
    getDetailData () {
      request.get('https://itjustfun.cn/api/public/v1/goods/detail', {goods_id: 57393})
        .then(res => {
          const {meta} = res.data
          if (meta.status === 200) {
            const {data} = res.data
            this.detailData = data
            this.hasData = true
          }
        })
    },
    // 切换tab栏
    handleChangeTab (index) {
      this.currentIndex = index
    },
    // 添加到购物车
    handleAddToCart (id) {
      // 判断本地缓存是否存在
      const buyGoods = wx.getStorageSync('cartData') || {}
      // 判断是否存在该商品
      if (!buyGoods[id]) { // 不存在
        buyGoods[id] = this.detailData
        buyGoods[id].isSelected = true
        buyGoods[id].buyCount = 1
      } else { // 存在时,数量增加
        buyGoods[id].buyCount++
      }
      this.totalCount = buyGoods[id].buyCount
      console.log(this.totalCount)
      // 存入本地
      wx.setStorageSync('cartData', buyGoods)
      // 提示框
      wx.showToast({
        title: '成功加入购物车',
        icon: 'success',
        duration: 2000
      })
    }
  },
  computed: {
    // totalCount () {
    //   return this.
    // }
  },
  components: {
    'dd-splitter': splitter
  }
}
</script>
<style lang="scss" scoped>
@import 'style.scss';
</style>

