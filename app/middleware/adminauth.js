module.exports = options => {
  return async function adminauth(ctx,next){
    console.log(ctx.session.openID)
    if(ctx.session.openID){
      await next()
    }else{
      ctx.body = {data:'没有登录'}
    }
  } 
}