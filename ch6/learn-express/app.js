const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
// 여기서부터는 유용한 미들웨어
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

dotenv.config();
const app = express();
// 3000 번 포트에 매칭
app.set('port', process.env.PORT || 3000);

// 미들웨어 사용
app.use(morgan('env'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave : false,
    saveUninitialized : false, 
    secret : process.env.COOKIE_SECRET ,
    cookie : {
        httpOnly : true,
        secure : false,
    },
    name : 'session-cookie',
}));

// 미들웨어 사용
app.use((req, res, next) => {
    console.log('모든 요청에 다 실행됩니다.');
    next();
});

app.get('/', (req, res, next) => {
    console.log('GET / 요청에서만 실행됩니다.');
    next()
}, (req, res) => {
    throw new Error('에러는 에러 처리 미들웨어로 갑니다.');
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});