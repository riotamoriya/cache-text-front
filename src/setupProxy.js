const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(createProxyMiddleware('/texts', {
    target: 'http://localhost:3100',
    secure: false,
    changeOrigin: true,
  }));
}
