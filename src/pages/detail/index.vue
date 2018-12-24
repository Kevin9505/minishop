<template>
  <div class="detail" v-if="hasData">
    <scroll-view scroll-y class="detail-wrapper">
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
        <div class="server">
          <span class="iconfont icon-kefu"></span>
          <span class="server-text">联系客服</span>
        </div>
        <div class="cart">
          <span class="iconfont icon-gouwuche"></span>
          <div class="cart-text">购物车</div>
        </div>
      </div>
      <div class="shopcart-right">
        <div class="add-cart">加入购物车</div>
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
      goods_id: ''
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
      request.get('https://itjustfun.cn/api/public/v1/goods/detail', {goods_id: 57396})
        .then(res => {
          const {meta} = res.data
          if (meta.status === 200) {
            const {data} = res.data
            this.detailData = data
            this.hasData = true
          }
        })
    },
    handleChangeTab (index) {
      this.currentIndex = index
    }
  },
  mounted () {

  },
  components: {
    'dd-splitter': splitter
  }
}
</script>
<style lang="scss" scoped>
@import 'style.scss';
</style>

