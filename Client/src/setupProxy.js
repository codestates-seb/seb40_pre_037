const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    ['/post', '/members', '/answers'],
    createProxyMiddleware({
      target:
        'http://ec2-15-164-93-71.ap-northeast-2.compute.amazonaws.com:8080',
      changeOrigin: true,
    }),
  );
};
