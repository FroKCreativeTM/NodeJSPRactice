function logRunningTask() {
    console.log('작업 끝');
}

console.log('시작');
// 논 블로킹 방식이라, 제일 마지막에 끝난다.
// 사용처는 IO나 오래 걸릴 코드들을 설정하는데 사용하는 방식이다.
// setTimeout(callback function, ms)
setTimeout(logRunningTask, 3000);   
console.log('끝');