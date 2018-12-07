
module.exports = options => {
    // console.log(options);
    return async function (ctx, next) {
        ctx.passparams = options;
        await next();
    } 
}