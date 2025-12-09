const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://35.182.1.229:6000',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api' // No rewrite needed, backend expects /api/admin paths
      },
      onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.writeHead(500, {
          'Content-Type': 'application/json',
        });
        res.end(JSON.stringify({ error: 'Proxy error', message: err.message }));
      }
    })
  );
};


