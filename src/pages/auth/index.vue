<template>
  <div class="auth">
    <button plain class="auth-btn" open-type="getUserInfo" @getuserinfo="onGotUserInfo">点击授权</button>
  </div>
</template>
<script>
import request from '../../utils/request.js'
export default {
  methods: {
    // 授权用户
    onGotUserInfo (event) {
      console.log(event)
      wx.login({
        success(res) {
          if (res.code) {
            // 解构
            const {detail} = event.mp
            // 构造数据
            const tokenData = {
              code: res.code,
              encryptedData: detail.encryptedData,
              iv: detail.iv,
              rawData: detail.rawData,
              signature: detail.signature
            }
            // 发送请求
            request.post('https://itjustfun.cn/api/public/v1/users/wxlogin', tokenData)
              .then(res => {
                const {token} = res.data.data
                // 存储token
                wx.setStorageSync('userToken', token)
                wx.navigateBack()
              })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.auth{
  display: flex;
  justify-content: center;
  padding-top: 150rpx;
  .auth-btn{
    border: none;
    box-shadow: 0px 0px 1px 0px rgba(16, 21, 51, 0.384);
  }
}
</style>
