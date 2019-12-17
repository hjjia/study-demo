const express = require('express')
const app = express()
const port = 8899

//allow custom header and CORS
app.all('*',function (req, res, next) {
    // res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Origin', req.hostname);
    console.log(Object.keys(req))
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
    // res.cookie('name', 'hey', { domain: req.hostname, path: '/'});
    console.log(req.headers, 'header')
    res.cookie('name', 'hey', { domain: req.hostname, path: '/', sameSite: 'None'});
    // res.cookie('name', 'hey', { secure: true });
    res.send('Hello World!a')
})

app.get('/get/test', (req, res) => {
  // res.cookie('name', 'hey', { domain: req.hostname, path: '/'});
  console.log(req.headers, 'header')
  res.cookie('username', 'hahah', { domain: req.hostname, path: '/', sameSite: 'Lax'});
  // res.cookie('name', 'hey', { secure: true });
  res.send('Hello World!a')
})

app.get('/get', (req, res) => {
  res.set('Content-Type', 'text/html')
  console.log(req.headers, 'header')
  const html = `
  <div>
    <div>服务器同站点下的页面</div>
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

      fetchUrl('http://localhost:8899/get/test')
    </script>
  </div>
  `
  res.send(html)
})

app.post('/post', (req, res) => {
  console.log(req.headers, 'header')
    // res.cookie('name', 'hey', { secure: true });
    res.send('I am post')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))