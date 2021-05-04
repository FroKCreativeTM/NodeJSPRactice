// 서버가 사용자의 정보를 관리하도록 하는 세션 방식
const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

// 쿠키는 mycookie=test와 같은 문자열인데, 이를 {mycookie : 'test'}로 변환해준다.
const parseCookies = (cookie = '') => 
    cookie.split(';').map(v => v.split('=')).reduce((acc, [k,v]) => {
        acc[k.trim()] = decodeURIComponent(v);
        return acc;
    }, {});

const session = {};

// 주소가 '/login'으로 시작할 때 url과 querystring 모듈로 각각 주소와 주소에 딸려오는 query를 분석한다.
http.createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie);

    // 주소가 /login으로 시작하는 경우
    if(req.url.startsWith('/login')) {
        const {query} = url.parse(req.url);
        const {name} = qs.parse(query);

        const expires = new Date();
        //쿠키 유효 시간을 현재 시간 + 5분으로 설정
        expires.setMinutes(expires.getMinutes() + 5);
        const uniqueInt = Date.now();

        session[uniqueInt] = {
            name,
            expires,
        };

        res.writeHead(302, {
            Location : '/',
            'Set-Cookie': `session=${uniqueInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();
    } else if(cookies.session && session[cookies.session].expires > new Date()) { // 세션 쿠키가 존재하고, 만료 기간이 지나지 않았다면
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end(`${session[cookies.session].name}님 안녕하세요`);
    } else {
        try {
            const data = await fs.readFile('./cookie2.html');
            res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
            res.end(data);
        } catch(err) {
            res.writeHead(500, {'Content-Type':'text/plain; charset=utf-8'});
            res.end(err.message);
        }
    }
}).listen(8085, () => {
    console.log('ready on port 8085');
})