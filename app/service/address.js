const Service = require('egg').Service;

class AddressService extends Service {
  async select({id}) {
    const data = await this.app.mysql.select('address', {
      user_id: id
    })
    return data
  }

  async create(params) {
    const data = await this.app.mysql.insert('address', params)
    return data
  }

  async update(id,params) {
    const data = await this.app.mysql.update('address', {
      id,
      ...params
    })
    return data
  }

  async detail(id) {
    const data = await this.app.mysql.get('address', id)
    return data
  }

  async remove(id) {
    const data = await this.app.mysql.remove('address', { id })
    return data
  }

}
module.exports = AddressService;