function run() {
    console.log('3초 뒤 실행');
}

console.log('시작');
setTimeout(run, 3000);  // 제일 마지막에 실행됨
console.log('끝');