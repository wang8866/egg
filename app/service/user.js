'use strict';
const Service = require('egg').Service;

class UserController extends Service {
  async register(data) {
    const res = await this.app.mysql.insert('user', data)
    return res
  }

  async find(where) {
    const res = await this.app.mysql.get('user', where)
    return res
  }
}
module.exports = UserController;