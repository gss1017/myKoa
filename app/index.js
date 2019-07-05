const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
    ctx.body = 'hello world';
    console.log('ctx', ctx);
});

app.listen(3003, () => {
    console.log('3003 listened');
});
