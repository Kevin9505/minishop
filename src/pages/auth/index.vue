<template>
  <div class="auth">
    <button plain class="auth-btn" open-type="getUserInfo" @getuserinfo="onGotUserInfo">点击授权</button>
  </div>
</template>
<script>
import request from '../../utils/request.js'
export default {
  methods: {
    onGotUserInfo (event) {
      wx.login({
        success(res) {
          if (res.code) {
            const {detail} = event.mp
            const tokenData = {
              code: res.code,
              encryptedData: detail.encryptedData,
              iv: detail.iv,
              rawData: detail.rawData,
              signature: detail.signature
            }
            request.post('https://itjustfun.cn/api/public/v1/users/wxlogin', tokenData)
              .then(res => {
                const {token} = res.data.data
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
