const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/members', // proxy가 필요한 path prameter를 입력합니다.
    createProxyMiddleware({
      target: 'https://dbee-49-172-251-241.jp.ngrok.io',
      changeOrigin: true, // 대상 서버 구성에 따라 호스트 헤더가 변경되도록 설정하는 부분입니다.
    }),
  );
};
