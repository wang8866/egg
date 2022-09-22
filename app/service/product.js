const Service = require('egg').Service;

class ProductService extends Service {
  async select({page, page_size, ...where}) {
    const data = await this.app.mysql.select('product', {
      // where:{
      //   classId
      // },
      where,
      limit: page_size * 1,
      offset: (page-1) * page_size
    })
    return data
  }

  async category() {
    const data = await this.app.mysql.select('category')
    return data
  }

  async detail(id) {
    const data = await this.app.mysql.get('product', id)
    return data
  }
}
module.exports = ProductService;