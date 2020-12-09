require('newrelic');
const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');
const app = express();
const path = require('path');
const port = 8880;
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.static('public'));

app.use('/songdata/', createProxyMiddleware({
  target: 'http://localhost:3005',
  changeOrigin: true
}));

app.use('/relatedTracks/', createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true
}))

app.use('/artistBio/', createProxyMiddleware({
  target: 'http://localhost:2000',
  changeOrigin: true
}))

app.use('/comments/', createProxyMiddleware({
  target: 'http://localhost:4000',
  changeOrigin: true
}))

app.use('/hashtags/', createProxyMiddleware({
  target: 'http://localhost:4001',
  changeOrigin: true
}))

app.use('/users/', createProxyMiddleware({
  target: 'http://localhost:4002/',
  changeOrigin: true
}))

app.use('/:current', (req, res) => {
  res.sendFile(path.join(__dirname,'/public/index.html'));
})

app.listen(port, () => console.log(`Listening on port ${port}`));
