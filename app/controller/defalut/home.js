'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  // 获取文章列表
  async getArticleList(){
    let page = this.ctx.params.page
    let pageSize = this.ctx.params.pageSize
    let sql = 'SELECT article.id as id ,' + 
              'article.title as title ,' +
              'article.introduce as introduce ,' +
              "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime ," +
              'article.view_count as view_count ,' +
              'type.typeName as typeName ' +
              'FROM article LEFT JOIN type on article.type_id = type.Id '+
              'ORDER BY article.id ASC'
    const res = await this.app.mysql.query(sql)
    const newList = res.slice((page-1)*pageSize,page*pageSize)
    this.ctx.body = {data:newList,total:res.length}
  }
  // 通过id获取文章
  async getArticleById(){
    let id = this.ctx.params.id
    let sql = 'SELECT article.id as id ,' + 
              'article.title as title ,' +
              'article.introduce as introduce ,' +
              'article.article_content as article_content ,' +
              "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime ," +
              'article.view_count as view_count ,' +
              'type.typeName as typeName ,' +
              'type.id as typeId ' +
              'FROM article LEFT JOIN type ON article.type_id = type.Id '+
              'WHERE article.id='+id
    const res = await this.app.mysql.query(sql)
    this.ctx.body = {data:res[0]}
  }
  // 获取类型信息
  async getTypeInfo(){
    const res = await this.app.mysql.select('type')
    this.ctx.body = {data:res}
  }
  // 通过类型id获取文章列表
  async getListById(){
    let typeId = this.ctx.params.typeId
    let sql = 'SELECT article.id as id ,' + 
              'article.title as title ,' +
              'article.introduce as introduce ,' +
              "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime ," +
              'article.view_count as view_count ,' +
              'type.typeName as typeName ' +
              'FROM article LEFT JOIN type on article.type_id = type.Id '+
              'WHERE type_id='+typeId
    const res = await this.app.mysql.query(sql)
    this.ctx.body = {data:res}
  }
}

module.exports = HomeController;
