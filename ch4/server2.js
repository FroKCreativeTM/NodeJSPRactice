const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type' : 'text/html; charset:utf-8'});
    res.write('<h1>Hello world!</h1>');
    res.write('<p>Hello Server!</p>');
});
server.listen(8000);

server.on('listening', () => {
    console.log('ready on port 8000');
});
server.on('error', (err) => {
    console.error(err);
})