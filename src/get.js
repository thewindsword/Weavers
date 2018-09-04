const asyncGet = (response)=>{
    return async (ctx,next)=>{
        if(response.status){
            ctx.status = response.status;
        }
        ctx.set(response.header);
        ctx.body = response.body;
        await next();
    }
}
module.exports = asyncGet;
exports = asyncGet;
