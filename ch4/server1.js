const http = require('http');

/**
 * 여러 포트에서 실행하는 방법
 */
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8'});
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
}).listen(8080, () => {
    // 서버 연결
    console.log('ready on port 8080');
});

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8'});
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
}).listen(8081, () => {
    // 서버 연결
    console.log('ready on port 8081');
});