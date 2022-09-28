const jwt = require('jsonwebtoken');
const whiteList = [
  '/api/home',
  '/api/product',
  '/api/product/category',
  '/api/product/:id',
  '/api/search/tip',
  '/api/user/register',
  '/api/user/login',
  '/api/user/sendMessageCode'
]
const authority = async (ctx, next) => {
  const reg = /(\S{1,})\?{1}(\S{1,})/
  const url = ctx.req.url.replace(reg, '$1')
  console.log(url);
  if (whiteList.includes(url)) {
    await next()
  } else {
    const token = ctx.req.headers.token
    if (token) {
      try {
        const info = jwt.verify(token, '123456')
        console.log(info)
        ctx.info = info
        await next()
      } catch (e) {
        if (e.message === 'jwt malformed') {
          ctx.throw(401, {
            code: 0,
            message: '登录信息失效'
          })
        } else {
          ctx.throw(422, {
            code: 0,
            message: e.message
          })
        }
      }
    } else {
      ctx.throw(401, {
        code: 0,
        message: '请登录后再访问'
      })
    }
  }
}
module.exports = () => {
  return authority
}