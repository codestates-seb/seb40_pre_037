const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    ['/members', '/post', '/answers'],
    createProxyMiddleware({
      target:
      'http://ec2-13-125-134-162.ap-northeast-2.compute.amazonaws.com:8080',
      changeOrigin: true,
    }),
  );
};
