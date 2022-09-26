'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/api/home', controller.home.index)
  router.get('/api/product', controller.product.list)
  router.get('/api/product/category', controller.product.category)
  router.get('/api/product/:id', controller.product.detail)
  router.get('/api/search/tip', controller.product.searchTip)
  router.post('/api/user/register', controller.user.register)
  router.post('/api/user/login', controller.user.login)
};
