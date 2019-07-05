
// 引入http模块
const http = require('http')


var server = http.createServer(function(req, res) {
    // 设置响应头，纯文本
    res.writeHead(200, {'content-type': 'text/plain'})
    // 需要调用end结束http相应连接，否则浏览器一直等待
    res.end('hello world')
})
// 重复监听端口会报错，使用全局变量process捕获异常，
// process是EvenEmitter的实例
process.on('uncaughtException', function(err){
    console.log('错误', err)
})

server.listen(8000, function(err){
    err && console.log('错误' + err)
    console.log('server启动成功，8000端口')
})

// 访问http://localhost:8000
