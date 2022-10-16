const Service = require('egg').Service;

class CarService extends Service {
  async select(where) {
    const data = await this.app.mysql.select('car', {
      where
    })
    return data
  }

  async list(where) {
    const sql = `
    SELECT
      car.id,car.product_id,car.num,car.isActive,
      product.name,product.price,product.img
    FROM 
      car,product
    WHERE
      car.user_id = ${where.user_id}
    AND 
      car.product_id = product.id
    `
    const data = await this.app.mysql.query(sql)
    return data
  }

  async create(params) {
    console.log(params);
    const data = await this.app.mysql.insert('car', params)
    return data
  }

  async update(id,params) {
    if (typeof id === 'object') {
      const sql = `
        UPDATE car SET isActive = '${params.isActive}' WHERE id IN (${id.toString()})
      `;
      const data = await this.app.mysql.query(sql);
      return data
    }
    const data = await this.app.mysql.update('car', {
      id,
      ...params
    })
    return data
  }

  async detail(id) {
    const data = await this.app.mysql.get('car', id)
    return data
  }

  async remove(id) {
    const data = await this.app.mysql.remove('car', { id })
    return data
  }

}
module.exports = CarService;