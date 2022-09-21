'use strict';
// const fs = require('fs')
// const path = require('path')
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const { callback } = ctx.query;
    const banner = await ctx.service.home.banner();
    const mall_nav = await ctx.service.home.mall_nav();
    const hot_nav = await ctx.service.home.hot_nav();
    if (callback) {
      ctx.set('content-type', 'application/javascript; charset=UTF-8')
      ctx.body = callback + '('+ JSON.stringify({
        code: 1,
        data: {
          banner,
          mall_nav,
          hot_nav
        }
      }) +')';
    } else {
      ctx.body = {
        code: 1,
        data: {
          banner,
          mall_nav,
          hot_nav
        }
      }
    }
  }

  // async nav_test() {
  //   const content = fs.readFileSync(path.resolve(__dirname, '../public/nav.json'), 'utf-8')
  //   const navJSON = JSON.parse(content)
  //   for (let i = 0; i<navJSON.length; i++) {
  //     const item = navJSON[i]
  //     await this.app.mysql.insert('mall_nav', {
  //       icon: item.floorCellData.imgUrl,
  //       text: item.floorCellData.title
  //     })
  //   }
  //   this.ctx.body = {
  //     code: 1,
  //     message: '添加成功'
  //   }
  // }

}
console.log(111)
module.exports = HomeController;
