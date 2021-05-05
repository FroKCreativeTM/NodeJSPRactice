// http2는 SSL과 동시에 한 번의 응답에 2개 이상의 파일을 동시에 보낸다.
const http2 = require('http2');
const fs = require('fs');

http2.createSecureServer({
    cert : fs.readFileSync('도메인 인증서 경로'),
    key : fs.readFileSync('도메인 비밀키 경로'),
    ca : [
        fs.readFileSync('상위 인증서 경로'),
        fs.readFileSync('상위 인증서 경로'),
    ],
}, (req, res) => {
    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
    res.write('<h2>Hello world</h2>');
    res.end('<p>Hello NodeJS</p>');
}).listen(443, () => {
    console.log('ready on port 443');
});