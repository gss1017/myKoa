const Koa = require('../fakeKoa/application');
const app = new Koa();

app.use(async (ctx, next) => {
    console.log(1);
    await next();
    console.log(6);
});

app.use(async (ctx, next) => {
    console.log(2);
    await next();
    console.log(5);
});

app.use(async (ctx, next) => {
    console.log(3);
    ctx.body = "hello world";
    console.log(4);
});

app.listen(3332, () => {
    console.log('listening on 3332');
});

app.on('error', err => {
    // 框架层的错误处理
    console.log('error happends: ', err.stack);
});
