'use strict'
module.exports = app => {
  const { router, controller } = app;
  var adminauth = app.middleware.adminauth()
  router.post('/admin/checklogin', controller.admin.main.checkLogin)
  router.post('/admin/gettypeinfo', adminauth, controller.admin.main.getTypeInfo)
  router.post('/admin/addarticle',adminauth, controller.admin.main.addArticle)
  router.post('/admin/updatearticle',adminauth, controller.admin.main.updateArticle)
  router.get('/admin/getarticlelist/:page/:pageSize', controller.admin.main.getArticleList)
  router.get('/admin/deletearticle/:id',adminauth, controller.admin.main.deleteArticle)
  router.get('/admin/updatearticlebyid/:id',adminauth, controller.admin.main.updateArticleById)
}