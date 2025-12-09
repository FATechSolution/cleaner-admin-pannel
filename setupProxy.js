const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://35.182.1.229:6000',
      changeOrigin: true,
    })
  );
};

