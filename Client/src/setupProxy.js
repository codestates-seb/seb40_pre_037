const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    ['/members', '/post'],
    createProxyMiddleware({
      target: 'https://054a-49-172-251-241.jp.ngrok.io/',
      changeOrigin: true,
    }),
  );
};
