'use strict';

const Controller = require('egg').Controller;

class ProductController extends Controller {
  async list() {
    const { ctx } = this;
    const {
      page = 1,
      page_size = 10,
      classId
    } = ctx.query;
    const data = await ctx.service.product.select({
      page,
      page_size,
      classId
    })
    ctx.body = {
      code: 1,
      data: data.map(item => {
        return {
          ...item,
          images: JSON.parse(item.images),
          promotionInfoList: JSON.parse(item.promotionInfoList)
        }
      })
    }
  }
}
console.log(123)
module.exports = ProductController;