const express = require('express')
const app = express()
const port = 9999

//allow custom header and CORS
app.all('*',function (req, res, next) {
    // res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Origin', req.hostname);
    console.log(req.headers.origin)
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', true); // 很重要，允许跨域访问传输cookie
  
    if (req.method == 'OPTIONS') {
      res.send(200); /让options请求快速返回/
    }
    else {
      next();
    }
  });

app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html')
    console.log(req.headers, 'header')
    const html = `
    <div>
      <div>nihao</div>
      <img src="http://localhost:8899" />
      <a href="javascript: fetchUrl('http://localhost:8899/post', 'post');">你好，交个朋友吧</a>
      <script>
        function fetchUrl(url, method='get') {
          fetch(url, {
          method,
          mode: 'cors',
          credentials: 'include' //很重要，允许跨域访问传输cookie
        }).then((res) => {
          console.log(res)
        })

        }

        fetchUrl('http://localhost:8899/post', 'post')
      </script>
    </div>
    `
    res.send(html)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))