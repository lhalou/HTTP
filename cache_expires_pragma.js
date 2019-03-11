/* 
  缓存的第一种方案，Http1.0时的产物，Expires字段表示过期截止日期,Pragma表示不用缓存
  范例：
  Expires: Wed, 23 Jan 2019 07:33:51 GMT
  Pragma: no-cache
  如果同时设置，Pragma的优先级高于Expires
  
  访问 http://localhost:8080/picture.jpg */
const http = require('http')
const fs = require('fs')
const path = require('path')


http.createServer((req, res) => {
	let filePath = path.join(__dirname, req.url)
  	fs.readFile(filePath, (err, data) => {
  	if (err) {
  		res.writeHead(404, 'not found')
  		res.end('Oh, Not Found')
  	} else {

  		// example1设置响应的字段，把当前的时间和字段设置的时间进行比较
  		// new Date().toGMTString()
  		//res.setHeader('Expires', 'Mon, 11 Mar 2019 01:39:05 GMT')
  		

  		// example2
		res.setHeader('Pragma', 'no-cache')

		// example3
		//res.setHeader('Expires', 'Wed, 23 Jan 2019 07:40:51 GMT')
		//res.setHeader('Pragma', 'no-cache')

		// example4
		// 比较好的方法
		//let date = new Date(Date.now() + 1000*5).toGMTString()
		//res.setHeader('Expires', date)
		//	发送文件之间，setHeader修改响应报文的响应头
        res.writeHead(200, 'OK')
  	    res.end(data)
  	}
  })
}).listen(8080)
console.log('Visit http://localhost:8080' )