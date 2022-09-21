'use strict';

const Controller = require('egg').Controller;

const arrToTree = arr => {
  const newArr = [];
  const arrJSON= {};
  arr.forEach(item => {
    arrJSON[item.categoryId] = item;
    if (item.parentId === 0) {
      newArr.push(item);
    }
  })

  arr.forEach(item => {
    if (item.parentId !== 0) {
      const parent = arrJSON[item.parentId]
      if (parent.children) {
        parent.children.push(item)
      } else {
        parent.children = [item]
      }
    }
  })
  return newArr
}

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

  async category() {
    const { ctx } = this;
    const data = await ctx.service.product.category();
    ctx.body = {
      code: 1,
      data: arrToTree(data)
    }
  }
}
console.log(123)
module.exports = ProductController;