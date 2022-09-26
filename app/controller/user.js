'use strict';

const jwt = require('jsonwebtoken');
const Controller = require('egg').Controller;

class UserController extends Controller {
  async login() {
    const { ctx } = this;
    const user = await ctx.service.user.find({
      account: ctx.request.body.account,
      password: ctx.request.body.password,
    });
    if (Object.keys(user).length >= 1) {
      const token = jwt.sign({
        ...user,
      }, '123456')
      ctx.body = {
        code: 1,
        token,
        message: '登录成功'
      }
    } else {
      ctx.body = {
        code: 0,
        message: '账号密码错误'
      }
    }
  }

  async register() {
    const { ctx } = this;
    try {
      const user = await ctx.service.user.find({
        name: ctx.request.body.name,
        phone: ctx.request.body.phone,
      });
      if (Object.keys(user).length >= 1) {
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
