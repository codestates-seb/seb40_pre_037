const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/members',
    createProxyMiddleware({
      target: 'https://bce7-49-172-251-241.jp.ngrok.io',
      changeOrigin: true,
    }),
  );
};
