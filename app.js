const http = require('http');
const fs = require('fs'); // file system

const server = http.createServer(function(request,response){ 
    let url = request.url;
    console.log(url);
    if(url == '/'){
        fs.readFile('index.html', function(error, file) {
            if(error){
                response.writeHead(500, {'Content-Type':'text/html; charset=utf-8'});
                response.end('500 - 서버 내부 에러: '+error);
            }else{
                response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
                response.end(file);
            }
        });
    }else{
        response.writeHead(404, {'Content-Type':'text/html'});
        response.end('404 - 찾을 수 없음');
    }
});

server.listen(8080, function(){ 
    console.log('웹 서버 실행 중!');
});