'use strict';
const Controller = require('egg').Controller;

class CarController extends Controller {
  async list() {
    const { ctx } = this;
    console.log(ctx.info.user_id);
    const data = await ctx.service.car.list({
      user_id: ctx.info.user_id
    })
    ctx.body = {
      code: 1,
      data,
    }
  }
  async create() {
    const { ctx } = this;
    const body = ctx.request.body
    try {
      const item = await ctx.service.car.select({
        user_id: ctx.info.user_id,
        product_id: body.product_id,
      })
      if (item[0]) {
        await ctx.service.car.update(item[0].id, {
          num: item[0].num + body.num
        })
      } else {
        await ctx.service.car.create({
          user_id: ctx.info.user_id,
          isActive: '1',
          ...body
        })
      }
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
      await ctx.service.car.update(id, {
        ...body
      })
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

  async updateAll() {
    const { ctx } = this;
    const body = ctx.request.body
    const id = body.id
    delete body.id
    try {
      await ctx.service.car.update(id, {
        ...body
      })
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

  async delete() {
    const { ctx } = this;
    const id = ctx.params.id
    try {
      await ctx.service.car.remove(id)
      ctx.body = {
        code: 1,
        message: '删除成功'
      }
    } catch (e) {
      ctx.throw(422, {
        code: 0,
        message: '删除失败'
      })
    }
  }
}
module.exports = CarController;
