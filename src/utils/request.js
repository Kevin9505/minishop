/**
 * 封装 Promise 用来请求 wx.request({})
 * @param {参数} url 请求接口的路径
 * @param {参数} methods 请求的类型
 */
function request(url, methods = "GET") {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      methods: methods,
      success: (res) => {
        resolve(res)
      }
    })
  }) 
}
// 暴露方法接口
export default request