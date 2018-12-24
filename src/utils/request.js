/**
 * 封装 Promise 用来请求 wx.request({})
 * @param {参数} url 请求接口的路径
 * @param {参数} methods 请求的类型
 * @param {参数} data 请求的参数
 */
function request(url, methods = "GET", data = {}) {
  return new Promise((resolve, reject) => {
    // 显示提示框
    wx.showLoading({
      title: '加载中',
      icon: 'loading'
    })
    wx.request({
      url: url,
      methods: methods,
      data,
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
// 暴露方法接口
export default request