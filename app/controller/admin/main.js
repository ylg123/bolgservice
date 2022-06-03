'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller{
  // 登录检查接口
  async checkLogin(){
    let userName = this.ctx.request.body.userName
    let password = this.ctx.request.body.password
    const sql = "SELECT userName FROM admin_user WHERE userName = '"+userName+"' AND password = '"+password+"'"
    const res = await this.app.mysql.query(sql)
    if(res.length>0){
      // 登录成功，进行session缓存
      let openID = new Date().getTime()
      this.ctx.session.openID = {'openID':openID}
      this.ctx.body = {data:'登录成功','openID':openID}
    }else{
      this.ctx.body = {data:'登录失败'}
    }
  }
  // 获取文章类型接口
  async getTypeInfo(){
    const resType = await this.app.mysql.select('type')
    this.ctx.body = {data:resType}
  }
  // 增加文章接口
  async addArticle(){
    let tmpArticle = this.ctx.request.body
    const result = await this.app.mysql.insert('article',tmpArticle)
    const insertSuccess = result.affectedRows===1
    const insertId = result.insertId
    this.ctx.body = {
      isSuccess:insertSuccess,
      insertId
    }
  }
  // 修改文章接口
  async updateArticle(){
    let tmpArticle = this.ctx.request.body
    const result = await this.app.mysql.update('article',tmpArticle)
    const updateSuccess = result.affectedRows===1
    this.ctx.body={
      isSuccess:updateSuccess
    }
  }
  // 获取文章列表接口
  async getArticleList(){
    let page = this.ctx.params.page
    let pageSize = this.ctx.params.pageSize
    let sql = 'SELECT article.id as id ,' + 
              'article.title as title ,' +
              'article.introduce as introduce ,' +
              "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime ," +
              'article.view_count as view_count ,' +
              'type.typeName as typeName ' +
              'FROM article LEFT JOIN type on article.type_id = type.Id ' +
              'ORDER BY article.id ASC'   
    const resList = await this.app.mysql.query(sql)
    const newList = resList.slice(((page-1)*pageSize),page*pageSize)
    this.ctx.body = {list:newList,total:resList.length}
  }
  // 删除文章的接口
  async deleteArticle(){
    let id = this.ctx.params.id
    const res = await this.app.mysql.delete('article',{'id':id})
    const deleteSuccess = res.affectedRows===1
    this.ctx.body={
      isSuccess:deleteSuccess
    }
  }
  // 修改文章的接口
  async updateArticleById(){
    let id = this.ctx.params.id

    let sql = 'SELECT article.id as id ,' + 
                'article.title as title ,' +
                'article.introduce as introduce ,' +
                'article.article_content as article_content ,' +
                "FROM_UNIXTIME(article.addTime,'%Y-%m-%d') as addTime ," +
                'article.view_count as view_count ,' +
                'type.typeName as typeName ,' +
                'type.id as typeId ' +
                'FROM article LEFT JOIN type on article.type_id = type.Id ' +
                'WHERE article.id =' + id
    const res = await this.app.mysql.query(sql)
    this.ctx.body = {
      data:res
    }
  }
}

module.exports = MainController