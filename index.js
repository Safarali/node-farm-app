const http = require('http');
const url = require('url');
const fs = require('fs');
const fillOutTemplate = require('./utilities');


const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/data.json`, 'utf-8');
const dataObject = JSON.parse(data);




// Server
const server = http.createServer((req, res) => {

    const { query, pathname } = url.parse(req.url, true);

    // Overview page
    if(pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {'Content-type': 'text/html'})
        const cardsHtml = dataObject.map((product) => {
            return fillOutTemplate(tempCard, product);
        }).join('');

        const overviewHtml = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(overviewHtml);

    // Product page
    } else if(pathname === '/product') {
        res.writeHead(200, {'Content-type': 'text/html'})
        const product = dataObject[query.id];
        const productHtml = fillOutTemplate(tempProduct, product);
        res.end(productHtml);

    // API
    } else if (pathname === '/api') {
        res.writeHead(200, {'Content-type': 'application/json'})
        res.end(data);

    // Not found
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world',
            'Location': 'https://www.github.com/login'
        });
        res.end('<h1>Not found page</h1>')
    }
});

server.listen(8000, 'localhost', () => {
    console.log('Listening to requests on port 8000');
})