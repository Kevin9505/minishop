/**
 * 封装 Promise 用来请求 wx.request({})
 * @param {参数} url 请求接口的路径
 * @param {参数} methods 请求的类型
 * @param {参数} data 请求的参数
 */
function request(url, methods = "GET", data = {}, header = {}) {
  return new Promise((resolve, reject) => {
    // 显示提示框
    wx.showLoading({
      title: '加载中',
      icon: 'loading',
      mask: true
    })
    wx.request({
      url: url,
      method: methods,
      data,
      header,
      success: (res) => {
        // 隐藏提示框
        wx.hideLoading()
        resolve(res)
      }
    })
  }) 
}
request.get = (url, data) => {
  return request(url, "GET", data)
}

request.post = (url, data) => {
  return request(url, "POST", data)
}

request.auth = (url, data) => {
  if (!wx.getStorageSync('userToken')) {
    wx.navigateTo({
      url: '/pages/auth/main'
    })
    return new Promise(() => {})
  }
  console.log(11)
  return request(url, "POST", data, {
    "Authorization" : wx.getStorageSync('userToken')
  })
}
// 暴露方法接口
export default request