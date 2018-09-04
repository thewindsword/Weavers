const asyncPost = (request,parse)=>{
    return async (ctx,next)=>{
        let data = await parse(ctx);
        if(!Array.isArray(request)){
            ctx.body = "ERROR Request api setting,Request should set as array";
            await next();
        }else{
            request.forEach(reqTemplate=>{
                // body匹配不为空
                if(JSON.stringify(reqTemplate.body) !== JSON.stringify({})){
                    let keys = Object.keys(reqTemplate.body);
                    if(keys.every(key=>(reqTemplate.body[key] === data[key]))){
                        // 请求匹配成功
                        if(reqTemplate.status){
                            ctx.status = reqTemplate.status;
                        }
                        ctx.set(reqTemplate.header);
                        ctx.body = reqTemplate.response;
                    }else{
                        // 不匹配
                    }
                }
            })
            await next();
        }
    }
}
module.exports = asyncPost;
exports = asyncPost;
