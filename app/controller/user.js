'use strict';

const jwt = require('jsonwebtoken');
const Controller = require('egg').Controller;

const random = (min, max) => {
  return Math.round(min + Math.random() * (max - min))
}
const randomNumber = (len = 6) => {
  let num = ''
  while (num.length < len) {
    num += random(0, 9)
  }
  return num
}

class UserController extends Controller {
  async sendCode() {
    const { ctx } = this;
    const { phone } = ctx.query
    if(phone && phone.length === 11) {
      ctx.session.messageCode = randomNumber(6)
      ctx.body = {
        code: 1,
        message: `验证码[${ctx.session.messageCode}]已经发送至手机用户${phone}`
      }
    } else {
      ctx.throw(422, {
        message: '请输入正确的手机号'
      })
    }
  }

  async login() {
    const { ctx } = this;
    const { phone, code } = ctx.request.body
    if (code !== ctx.session.messageCode) {
      ctx.throw(422, {
        code: 0,
        message: '验证码错误'
      })
    } else {
      const user = await ctx.service.user.find({
        phone
      });
      if (user) {
        const token = jwt.sign({
          ...user,
        }, '123456')
        ctx.body = {
          code: 1,
          token,
          message: '登录成功'
        }
      } else {
        ctx.throw(422, {
          code: 0,
          message: '用户未注册'
        })
      }
    }
  }

  async info() {
    const { ctx } = this;
    ctx.body = {
      code: 1,
      data: ctx.info
    }
  }

  async register() {
    const { ctx } = this;
    try {
      const user = await ctx.service.user.find({
        name: ctx.request.body.name,
        phone: ctx.request.body.phone,
      });
      if (user) {
        console.log(user)
        ctx.throw(422, {
          code: 0,
          message: '用户已存在'
        })
      } else {
        await ctx.service.user.register(ctx.request.body);
        ctx.body = {
          code: 1,
          message: '注册成功'
        }
      }
    } catch (e) {
      ctx.throw(422, {
        code: 0,
        message: e.message || '注册失败'
      })
    }
  }
}
module.exports = UserController;
