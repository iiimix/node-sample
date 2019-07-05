## http模块

### 作为服务端使用
http.createServer

#### request

#### response



### 作为客户端使用
1.发起get请求
```js
http.get({
    hostname: 'localhost',
    port: 8000,
    path: '/',
    agent: false
}, res => {
    // 响应数据

})
```
1.发起request请求
```js
var req = http.request('localhost:8000', {
    protocal: 'http',
    hostname: '',
    port: 80,
    method: 'get'
}, res => {

})
req.on('error', err => {
    console.error('请求出错')
})
req.write(postData)
req.end()
```
- http.request请求，必须始终调用req.end()来表示请求结束
- on.error时间可以捕获所有阶段的错误信息