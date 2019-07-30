const Koa = require('koa');
const app = new Koa();
console.log(app);
// logger
app.use(async (ctx, next) => {
    console.log(1);
    await next();
    console.log('res', ctx.response);
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
    console.log(6, rt);
});

// x-response-time
app.use(async (ctx, next) => {
    console.log(2);
    const start = Date.now();
    await next();
    console.log(5);
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

// response
app.use(async ctx => {
    console.log(3);
    ctx.body = 'hello world';
    console.log(4);
    // console.log('ctx', ctx);
});

app.listen(3003, () => {
    console.log('3003 listened');
});
