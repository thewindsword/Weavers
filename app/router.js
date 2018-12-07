module.exports = app => {
    const { router, controller } = app;

    const list = app.config.apilist.api || [];

    list.forEach(api => {
        let method = api.method.toLowerCase();
        router[method]('direct', api.url, app.middleware.passparams(api), controller.home.direct);
    });
    
    router.get('*', controller.home.direct);   
}