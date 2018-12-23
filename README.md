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
  /**
   * 封装 Promise 用来请求 wx.request({})
   * @param {参数} url 请求接口的路径
   * @param {参数} methods 请求的类型
   * @param {参数} data 请求的参数
   */
  function request(url, methods = "GET", data = {}) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        methods: methods,
        data,
        success: (res) => {
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

# 解决 同一路由切换时,上一次的页面数据会保留 的问题
```js
  在页面onUnload的时候 执行:
  Object.assign(this, this.$options.data())
```

# 超出文本显示 ...
```css
  .good-name{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
```

# 合并数据  Array.concat(array)

# 微信小程序提示框
```js
  // 显示提示框
  wx.showLoading({
    title: '加载中',
    icon: 'loading'
  })
  // 隐藏提示框
  setTimeout(function(){
    wx.hideLoading()
  },1000)

  wx.showToast({ //期间为了显示效果可以添加一个过度的弹出框提示“加载中”  
    title: '到底啦!!!',
    icon: 'success',
    duration: 1000
  });
```

# 上拉加载
```js
  // 监听用户上拉触底事件
  onReachBottom () { 
    // dosomething
  },
  // 提示没有更多数据
  <div v-if="!hasMore" class="tips">我是有底线的男人...</div>

  // 监听用户下拉刷新事件。
  onPullDownRefresh () {
    // dosomething
  }

  // 监听用户滑动页面事件
  onPageScroll(Object)
  |   属性   |   类型   |   说明   |
  | ---- | ---- | ---- |
  |   scrollTop   |   Number   |   页面在垂直方向已滚动的距离（单位px）   |

  ` 注意：请只在需要的时候才在 page 中定义此方法，不要定义空方法。以减少不必要的事件派发对渲染层-逻辑层通信的影响。 注意：请避免在 onPageScroll 中过于频繁的执行 setData 等引起逻辑层-渲染层通信的操作。尤其是每次传输大量数据，会影响通信耗时。 `
```



