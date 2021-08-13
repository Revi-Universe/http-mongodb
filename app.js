const http = require('http');
const fs = require('fs'); // file system
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

const server = http.createServer(function(request,response){ 
    let url = request.url;
    console.log(`url: ${url}`);
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
    }else if(url.indexOf('/api/') == 0){
        request.setEncoding('utf-8'); // 이걸 안해주면 data를 제대로 못읽음!!
        const api = url.slice(5);
        request.on('data',(data)=>{
            switch(api){
                case 'register':
                    console.log(data);
                    response.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
                    response.end('서버가 일을 안해용~');
                    break;
            }
        });
    }else{
        response.writeHead(404, {'Content-Type':'text/html; charset=utf-8'});
        response.end('404 - 찾을 수 없음');
    }
});

server.listen(8080, async () => { 
    console.log('웹 서버 실행 중!');

    await client.connect();
    await client.db('admin').command({ ping: 1 }); // 핑 - 퐁
    console.log('MongoDB 접속됨!');
});