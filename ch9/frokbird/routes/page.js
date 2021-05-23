const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = null;
    res.locals.followerCount = 0;
    res.locals.followingCount = 0;
    res.locals.followerIdList = [];
    next();
});

router.get('/profile', (req, res) => {
    res.render('profile', {title:'내 정보 - FrokBird'});
});

router.get('/join', (req, res) => {
    res.render('join', {'title' : '회원가입 - FrokBird'});
});

router.get('/', (req, res, next) => {
    const twits = [];
    res.render('main', {
        title : 'FrokBird',
        twits,
    });
});

module.exports = router;