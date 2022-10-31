const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    ['/members', '/post'],
    createProxyMiddleware({
      target: 'https://2e13-2001-e60-3123-c0be-151a-2467-b53d-c3a5.jp.ngrok.io',
      changeOrigin: true,
    }),
  );
};
