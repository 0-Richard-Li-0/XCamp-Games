const http=require('http');
const fs=require('fs');
const path=require('path');

const mimeTypes={
    '.html':'text/html',
    '.js':'application/javascript',
    '.wasm':'application/wasm',
    '.br':'application/octet-stream',
    '.data':'application/octet-stream',
    '.png':'image/png',
    '.jpg':'image/jpeg',
    '.json':'application/json',
    '.css':'text/css'
};

const server=http.createServer((req,res)=>{
    let filePath='.'+req.url;
    if(filePath==='./')filePath='./index.html';

    const ext=path.extname(filePath);
    let mimeType=mimeTypes[ext]||'application/octet-stream';

    if(filePath.endsWith('.wasm.br')){
        mimeType='application/wasm';
        res.setHeader('Content-Encoding','br');
    }else if(filePath.endsWith('.js.br')){
        mimeType='application/javascript';
        res.setHeader('Content-Encoding','br');
    }else if(filePath.endsWith('.data.br')){
        mimeType='application/octet-stream';
        res.setHeader('Content-Encoding','br');
    }else if(filePath.endsWith('.br')){
        res.setHeader('Content-Encoding','br');
    }

    res.setHeader('Cache-Control','no-cache');

    fs.readFile(filePath,(err,content)=>{
        if(err){
            res.writeHead(404);
            res.end('Not Found');
        }else{
            res.writeHead(200,{'Content-Type':mimeType});
            res.end(content);
        }
    });
});

server.listen(8000,()=>{
    console.log('Server running at http://localhost:8000\nTo stop the server, press Ctrl+C\nhttp://localhost:8000');
});
