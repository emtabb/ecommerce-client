require('dotenv').config({path : "./configuration/.env.local"})
const {createServer} = require('http');
const {parse} = require('url');
const {readFileSync} = require('fs');
const next = require('next');
const express = require("express");
const { createProxyMiddleware } = require('http-proxy-middleware');
const port = 3000;
const production = process.env.NODE_ENV === 'production';
const app = next({production});
const handle = app.getRequestHandler();

// const httpsOptions = {
//     key: readFileSync('./certificates/key.pem', "utf-8"),
//     cert: readFileSync('./certificates/cert.pem', "utf-8"),
//     ca : [readFileSync('./certificates/root-ca.crt', "ascii"), readFileSync('./certificates/ca_bundle.crt', "ascii"
//     )]
// };
const server = express();
const PROXY_API = process.env.PROXY_API;

app.prepare()
    .then(() => {
        server.use("/api", createProxyMiddleware({
            target: PROXY_API,
            changeOrigin: true
        }));
        server.use("/verify", createProxyMiddleware({
            target: PROXY_API,
            changeOrigin: true
        }));
        server.use("/blob", createProxyMiddleware({
            target: PROXY_API,
            changeOrigin: true
        }));
        server.all("*", async(req, res) => {
            return await handle(req, res)
        });

        createServer(server)
            .listen(port, err => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${port}`);
        })
    });