const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');
const app = express();
const path = require('path');
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use('/relatedTracks', createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true
}));

app.use('/', createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true
}));

app.listen(port, () => console.log(`Listening on port ${port}`));