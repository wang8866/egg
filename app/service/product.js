const Service = require('egg').Service;

class ProductService extends Service {
  async select({page, page_size, classId}) {
    const data = await this.app.mysql.select('product', {
      where:{
        classId
      },
      limit: page_size * 1,
      offset: (page-1) * page_size
    })
    return data
  }
}
module.exports = ProductService;