const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {

  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://i8a803.p.ssafy.io',
      changeOrigin: true,
    })
  );
}      