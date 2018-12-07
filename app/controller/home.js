const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        this.ctx.body = "Hello World";
    }
    async direct() {
        // 转发请求
        let ctx = this.ctx;
        const serverUrl = this.config.serverUrl;
        console.log(ctx.path);
        console.log(ctx.passparams);
        console.log(ctx.query);
        console.log(ctx.headers);
        console.log(ctx.request.body);

        // 对于不存在于apilist中的接口进行转发
        if (JSON.stringify(ctx.passparams) === JSON.stringify({})) {
            console.log(`${serverUrl}${ctx.path}`);
            // TODO: 进行转发操作
            const res = await ctx.service.newService.api(ctx.path, {
                method: ctx.request.method,
                data: ctx.request.body,
                headers: ctx.headers,
                dataType: ctx.request.acceptJSON ? 'json' : undefined,
            });
            ctx.body = res;
            return;
        }

        let isValidate = await ctx.service.newService.validateParams(ctx.request, ctx.passparams);
        let validateBool = isValidate.every((value,index)=>{
            return value;
        });
        if (!validateBool) {
            ctx.body = 'invalidate params!';
            ctx.status = 400;
            return;
        }
        // TODO: 对于多余参数的判断与处理

        console.log(ctx.request.header['content-type']);

        // TODO: 目前仅支持json，后续考虑文件上传等接口
        const res = await ctx.service.newService.api(ctx.path, {
            method: ctx.passparams.method,
            data: ctx.request.body,
            contentType: 'json',
            dataType: 'json'
        });
        
        if (res.status !== 200) {
            // TODO: 转发后请求失败则转至mock数据，并写日志
            const res = await ctx.service.newService.mockapi(ctx.path, ctx.passparams);
        } else {
            // TODO: 转发后比对对应请求返回数据是否正确。
            console.log(res);
            isValidate = await ctx.service.newService.validateResponse(res.data, ctx.passparams);
            validateBool = isValidate.every((value,index)=>{
                return value;
            });
            if(!validateBool) {
                ctx.body = 'invalidate response!';
                ctx.status = 400;
                return;
            }
        }
        

        ctx.body = res;
    }
    async mock() {
        // TODO: 模拟数据进行返回。
        let ctx = this.ctx;
    }
}

module.exports = HomeController;