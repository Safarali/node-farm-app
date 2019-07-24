const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    console.log(req.url);

    const pathname = req.url;
    if(pathname === '/' || pathname === '/overview') {
        res.end('This is overview');
    } else if(pathname === '/product') {
        res.end('This is product');
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Not found page</h1>')
    }
});

server.listen(8000, 'localhost', () => {
    console.log('Listening to requests on port 8000');
})