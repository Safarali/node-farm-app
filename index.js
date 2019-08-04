const http = require('http');
const url = require('url');
const fs = require('fs');


const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/data.json`, 'utf-8');
const dataObject = JSON.parse(data);

console.log(dataObject);
console.log(tempCard);

const fillOutTemplate = (template, product) => {
    let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    !product.organic && (output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic'));

    return output;
    
}

// Server
const server = http.createServer((req, res) => {
    console.log(req.url);

    const pathname = req.url;

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
        res.end('This is product');

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