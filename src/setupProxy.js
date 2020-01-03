const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(proxy('/api', { 
    target: process.env.REACT_APP_PROXY_URL,
    secure: false,
    changeOrigin: true,
    pathRewrite: {
     "^/api": process.env.REACT_APP_PROXY_URL
    },
   }))
};
