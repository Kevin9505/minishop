# minishop

> A Mpvue project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 一个微信小程序,同时只能有5个网络请求连接,所以要先等上一个请求响应数据回来后再发情第二个请求
```js
  // 传统方法,当一个页面请求很多时,嵌套会很恶心,而且代码冗余
  wx.request({
    url: 'https://itjustfun.cn/api/public/v1/home/swiperdata',
    success: (res) => {
      const {meta} = res.data
      if (meta.status === 200) {
        const {data} = res.data
        this.imgUrls = data
      }

      wx.request({
        url: 'https://itjustfun.cn/api/public/v1/home/catitems',
        success: (res) => {
          // console.log(res)
          const {meta} = res.data
          if (meta.status === 200) {
            const {data} = res.data
            this.menus = data
          }
        }
      })
    }
  })

  // 所以利用es6新语法promise封装请求方法
  // resolve, reject 分别表示异步操作执行成功后的回调函数和异步操作执行失败后的回调函数
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

  // 调用
  // async await
  // async 放置在一个函数前面,意味着这个函数总是返回一个promise,如果代码中有return <非promise>语句，JavaScript会自动把返回的这个value值包装成promise的resolved值。
  // await可以让JavaScript进行等待，直到一个promise执行并返回它的结果，JavaScript才会继续往下执行。
  // try{}catch(err){} 捕获代码块错误信息
  async getData () {
    try{
      let res = await request('https://itjustfun.cn/api/public/v1/home/swiperdata')
      const {meta} = res.data
      if (meta.status === 200) {
        const {data} = res.data
        this.imgUrls = data
      }
    }catch(err){
      console.log(err)
    }

    try{
      let res = await request('https://itjustfun.cn/api/public/v1/home/catitems')
      const {meta} = res.data
      if (meta.status === 200) {
        const {data} = res.data
        this.menus = data
      }
    }catch(err){
      console.log(err)
    }

    try{
      let res = await request('https://www.zhengzhicheng.cn/api/public/v1/home/floordata')
      const {meta} = res.data
      if (meta.status === 200) {
        const {message} = res.data
        this.floorData = message
      }
    }catch(err){
      console.log(err)
    }
    
  }
```
# 可视区域布局100%展示
```css

    position: fixed;
    top: 100rpx;
    bottom: 0rpx;
    left: 0rpx;
    right: 0rpx;

```

#