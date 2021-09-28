const {createServer} = require('http');
const {parse} = require('url');
const {readFileSync} = require('fs');
const next = require('next');

const port = 3000;
const production = process.env.NODE_ENV === 'production';
const app = next({production});
const handle = app.getRequestHandler();

// const httpsOptions = {
//     key: readFileSync('./certificates/key.pem'),
//     cert: readFileSync('./certificates/cert.pem')
// };

app.prepare()
    .then(() => {
        // createServer(httpsOptions, (req, res) => {
        //     const parsedUrl = parse(req.url, true);
        //     handle(req, res, parsedUrl);
        // }).listen(port, err => {
        //     if (err) throw err;
        //     console.log(`> Ready on https://localhost:${port}`);
        // })
        createServer((req, res) => {
            const parsedUrl = parse(req.url, true);
            handle(req, res, parsedUrl);
        }).listen(port, err => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${port}`);
        })
    });