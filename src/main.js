const Koa = require('koa');
const parse = require('co-body');
const session = require("koa-session");
const Router = require('koa-router');

const staticServer = require('koa-static');
const views = require('koa-views');

const app = new Koa();
const router = new Router();


const getMethod = require('./get');
const postMethod = require('./post');

router.use(session(app));
router.use(views(__dirname, {
    map: {
        html: 'ejs'
    }
}));

// 读取对应api.json文件
let apiObj = require("../test/api-config/api.json");
const apiList = Object.keys(apiObj);
apiList.forEach(apiName=>{
    let currentConfig = apiObj[apiName];
    let { method,url,response,request } = currentConfig
    method = method.toLowerCase();

    switch(method){
        case 'get':
            router[method](url,getMethod(response));
        break;
        case 'post':
        case 'put':
        case 'delete':
            router[method](url,postMethod(request,parse));
        break;
        default:
            router[method](url,getMethod(response));
        break;
    }

})



app.use(router.routes())
    .use(router.allowedMethods());

app.listen(process.argv[2]);