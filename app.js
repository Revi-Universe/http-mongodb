const http = require('http');

const server = http.createServer(function(request,response){ 

    response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
    response.end('안녕!');

});

server.listen(8080, function(){ 
    console.log('웹 서버 실행 중!');
});