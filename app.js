const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if(url === '/') {
        res.setHeader('Content-Type', 'text/html')
        res.write('<html><head><title>My NodeJS Page</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></body>');
        res.write('</html>');
        return res.end();
    }

    if(url === '/message' && method === "POST") {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt', message);
        });
        //res.writeHead(302, {})
        res.statusCode = 302;
        res.setHeader("Location", "/")
        return res.end();
        
    }
    
    res.setHeader('Content-Type', 'text/html')
    res.write('<html><head><title>My NodeJS Page</title></head>');
    res.write('<body><h1>My First Page</h1></body>');
    res.write('</html>');
    res.end();

});

server.listen(3000);