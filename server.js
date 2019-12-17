const http = require('http')

const data = JSON.stringify({
  todo: 'Buy the milk'
})

http.createServer(function (req, res) {
    var body = "";
    req.on('data', function (chunk) {
      body += chunk;
    });
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', true);
    // res.setHeader("Set-Cookie", "SameSite=Strict;Path=/;Domain=http://localhost:3000;");
    // res.setHeader('Set-Cookie', ['type=ninjassadas; Path=/', 'language=javascript'].join(';'), '/');
    res.setHeader('Set-Cookie', 'type=ninjassadas; Path=/; Domain=http://localhost; Expires=Wed, 13-Jan-2021 22:23:01 GMT');
    req.on('end', function () {
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf8'});
      res.write(data)
      res.end();
    });
  }).listen(8899);