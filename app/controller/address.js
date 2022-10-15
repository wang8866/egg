'use strict';
const Controller = require('egg').Controller;

class AddressController extends Controller {
  async list() {
    const { ctx } = this;
    console.log(ctx.info.user_id);
    const data = await ctx.service.address.select(ctx.info.user_id)
    ctx.body = {
      code: 1,
      data,
    }
  }
  async create() {
    const { ctx } = this;
    const body = ctx.request.body
    try {
      await ctx.service.address.create({
        user_id: ctx.info.user_id,
        isDefault: '0',
        ...body
      })
      ctx.body = {
        code: 1,
        message: '添加成功'
      }
    } catch (e) {
      ctx.throw(422, {
        code: 0,
        message: '添加失败'
      })
    }
  }
  async update() {
    const { ctx } = this;
    const id = ctx.params.id
    const body = ctx.request.body
    try {
      if (body.isDefault) {
        const address = await ctx.service.address.select(ctx.info.user_id)
        const ids = address.map(item => item.id).filter(item => item.id * 1 !== id * 1)
        console.log(ids, 999);
        for (let i = 0; i < ids.length; i++) {
          await ctx.service.address.update(ids[i], {
            isDefault: '0'
          })
        }
        await ctx.service.address.update(id, {
          ...body
        })
      } else {
        await ctx.service.address.update(id, {
          ...body
        })
      }
      ctx.body = {
        code: 1,
        message: '更新成功'
      }
    } catch (e) {
      ctx.throw(422, {
        code: 0,
        message: '更新失败'
      })
    }
  }
}
module.exports = AddressController;
