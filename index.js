const httpProxy = require('http-proxy');

let proxy = httpProxy.createProxyServer({ target: 'http://www.ad.siemens.isoftstone.com', changeOrigin: true }).listen(8800);

proxy.on('proxyRes', (proxyRes, req, res) => {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    if (req.method.toLowerCase() == 'options') {
        res.writeHead(200);
        res.end();
    }
});

proxy.on('error', function (err, req, res) {
    res.writeHead(500, {
        'content-type': 'text/plain'
    });
    console.log('代理服务器错误', err);
    res.end('代理服务器错误');
});