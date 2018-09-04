const koa = require('koa');
const parse = require('co-body');
const session = require("koa-session");

var form = '<form action="/login" method="POST">\
<input name="username" type="text" value="username">\
<input name="password" type="password" placeholder="The password is \'password\'">\
<button type="submit">Submit</button>\
</form>';

const app = new koa();

app.keys = ['secret1','secret2','secret3'];
app.use(session(app));

app.use(async (ctx,next)=>{
    if(ctx.path === '/'){
        if(!ctx.session.islogin){
            ctx.throw(401);
        }else{
            ctx.body = "hello world";
        }
    }else{
        await next();
    }
});

app.use(async (ctx,next)=>{
    if(ctx.path === '/login'){
        if(!ctx.session.islogin && ctx.method === 'GET'){
            ctx.body = form;
        }else if(!ctx.session.islogin && ctx.method === 'POST'){
            let data = await parse(ctx);
            if(data.username === 'username' && data.password === 'password'){
                ctx.session.islogin = true;
                ctx.redirect('/')
            }else{
                ctx.throw(400);
            }
        }else{
            ctx.throw(400);
        }
    }else{
        await next();
    }
});

app.use(async (ctx,next)=>{
    if(ctx.path === '/logout'){
        ctx.session.islogin = false;
        ctx.redirect('/login')
    }else{
        await next();
    }
});

app.listen(process.argv[2]);