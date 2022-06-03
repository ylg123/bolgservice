'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/default/getArticleList/:page/:pageSize', controller.defalut.home.getArticleList)
  router.get('/default/getArticleById/:id', controller.defalut.home.getArticleById)
  router.get('/default/getTypeInfo', controller.defalut.home.getTypeInfo)
  router.get('/default/getListById/:typeId', controller.defalut.home.getListById)
};
