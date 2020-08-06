const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:5000' || 'https://react-tv-digital.herokuapp.com',
            // target: 'https://warm-garden-11318.herokuapp.com', 
            changeOrigin: true,
        })
    );
};