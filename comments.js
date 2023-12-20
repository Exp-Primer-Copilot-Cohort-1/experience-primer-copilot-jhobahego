// create web server
// 1. load modules
import { createServer } from 'http';
import { readFile } from 'fs';
import { parse } from 'url';

// 2. create web server object
var server = createServer(function(request,response){
    // 2.1 get url
    var parsedUrl = parse(request.url);
    var resource = parsedUrl.pathname;

    // 2.2 remove first slash
    if(resource == '/'){
        resource = '/index.html';
    }

    // 2.3 read file from web server
    var filename = './public' + resource;
    console.log(filename);
    readFile(filename, 'utf8', function(err, data){
        if(err){
            response.writeHead(500, {'Content-Type':'text/html'});
            response.end('500 Internal Server '+err);
        }else{
            response.writeHead(200, {'Content-Type':'text/html'});
            response.end(data);
        }
    });
});

// 3. start web server
server.listen(8080, function(){
    console.log('Server running at http://localhost:8080');
});