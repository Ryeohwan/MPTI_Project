const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/opinion',
    createProxyMiddleware({
      target: 'http://i8a803.p.ssafy.io:8003',
      changeOrigin: true,
    })
  );
  app.use(
    '/api/auth',
    createProxyMiddleware({
      target: 'http://i8a803.p.ssafy.io:8003',
      changeOrigin: true,
    })
  );
  app.use(
    '/reservation',
    createProxyMiddleware({
      target: 'http://i8a803.p.ssafy.io:8003',
      changeOrigin: true,
    })
  );
  app.use(
    '/chat',
    createProxyMiddleware({
      target: 'http://i8a803.p.ssafy.io:8005',
      changeOrigin: true,
    })
  );
};
