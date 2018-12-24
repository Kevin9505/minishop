<template>
  <div class="detail" v-if="hasData">
    <div class="detail-wrapper">
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
            <icon type="success" size="16" />
            收藏
          </span>
        </div>
        <div class="delivery">快递: <span>免运费</span></div>
      </div>
      <dd-splitter />
    </div>
    <!-- 购物车 -->
    <div class="shopcart">
      <div class="shopcart-left">
        <div class="server">
          <icon type="success" size="16" />
          <span>联系客服</span>
        </div>
        <div class="cart">
          <icon type="success" size="16" />
          <span>购物车</span>
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
      hasData: false
    }
  },
  methods: {
    getDetailData () {
      // 显示提示框
      wx.showLoading({
        title: '加载中',
        icon: 'loading'
      })
      request.get('https://itjustfun.cn/api/public/v1/goods/detail', {goods_id: 5})
        .then(res => {
          // console.log(res)
          const {meta} = res.data
          if (meta.status === 200) {
            wx.hideLoading()
            const {data} = res.data
            this.detailData = data
            this.hasData = true
            console.log(this.detailData)
          }
        })
    }
  },
  mounted () {
    this.getDetailData()
  },
  components: {
    'dd-splitter': splitter
  }
}
</script>
<style lang="scss" scoped>
@import 'style.scss';
</style>

