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
  // try{}catch(err){} 捕获代码块错误信息,发生错误时，不会影响后面代码的执行；还产生块级作用域
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

# 小程序原生input的使用
```js
<input focus @confirm="handleClickSearch" confirm-type="search" 
type="text" placeholder="请输入你想要的商品" />
// focus 自动获取焦点
// @confirm=""  手机输入法点击搜索触发
// confirm-type="search"  手机输入法显示搜索按钮

```

# 小程序设置获取本地缓存
```js
// 设置本地缓存 同步
wx.setStorageSync('key',value)

// 获取本地缓存 同步
wx.getStorageSync('key')

// 清除本地缓存
wx.clearStorage('key')

```

# 数组处理方法
```js
// 在向数组的开头添加一个或更多元素，并返回新的长度。 
// unshift() 方法将把它的参数插入 arrayObject 的头部，并将已经存在的元素顺次地移到较高的下标处，以便留出空间。该方法的第一个参数将成为数组的新元素 0，如果还有第二个参数，它将成为新的元素 1，以此类推
array1.unshift(value)

// 向数组的末尾添加一个或多个元素，并返回新的长度。
// push() 方法可把它的参数顺序添加到 arrayObject 的尾部。它直接修改 arrayObject，而不是创建一个新的数组。
// push() 方法和 pop() 方法使用数组提供的先进后出栈的功能。
array1.push(value)

// 用于从当前数组中移除第一个元素，并返回移除的元素
// 如果数组是空的，那么 shift() 方法将不进行任何操作，返回 undefined 值。请注意，该方法不创建新数组，而是直接修改原有的 arrayObject。
array1.shift(value)

// 用于删除并返回数组的最后一个元素。 
// pop() 方法将删除 arrayObject 的最后一个元素，把数组长度减 1，并且返回它删除的元素的值。如果数组已经为空，则 pop() 不改变数组，并返回 undefined 值。
arrayObject.pop()

// 数组去除重复
// ES6提供了新的数据结构Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
// Set函数可以接受一个数组（或类似数组的对象）作为参数，用来初始化。
// 在Set内部，两个NaN是相等。两个对象总是不相等的。可以用length来检测
// Set 本身是一个构造函数，用来生成 Set 数据结构。
new Set()

// 例子
const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

for (let i of s) {
  console.log(i);
}
// 2 3 5 4

// 例一
const set = new Set([1, 2, 3, 4, 4]);
[...set]
// [1, 2, 3, 4]

// 例二
const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
items.size // 5

```

# 小程序实现跳转
```js

wx.navigateTo({
  url: `/pages/search_list/main?keyword=${list}`
})

```

# 小程序的生命周期
```js
// 页面加载时触发。一个页面只会调用一次，可以在 onLoad 的参数中获取打开当前页面路径中的参数。
// query	Object	打开当前页面路径中的参数
onLoad(Object query)

// 页面显示/切入前台时触发。
onShow()

// 页面初次渲染完成时触发。一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互。
注意：对界面内容进行设置的 API 如wx.setNavigationBarTitle，请在onReady之后进行。 详见生命周期
`https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F `
onReady() 

// 页面隐藏/切入后台时触发。 如 navigateTo 或底部 tab 切换到其他页面，小程序切入后台等。
onHide()

// 页面卸载时触发。如redirectTo或navigateBack到其他页面时。
onUnload()

```



