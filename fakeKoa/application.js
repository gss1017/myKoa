const http = require('http');
let EventEmitter = require('events');
const context = require('./context');
const request = require('./request');
const response = require('./response');

class Application extends EventEmitter {
    constructor() {
        super();
        this.context = context;
        this.request = request;
        this.response = response;
        this.middlewares = [];
    }

    listen(port, cb = null) {
        const server = http.createServer(this.callback());
        server.listen(port, () => {
            cb && cb();
        })
    }

    use(fn) {
        fn && this.middlewares.push(fn);
    }

    createContext(req, res) {
        // 将 ctx 与 request 和 response 关联起来
        let ctx = Object.create(this.context);
        ctx.request = Object.create(this.request);
        ctx.response = Object.create(this.response);
        ctx.req = ctx.request.req = req;
        ctx.res = ctx.response.res = res;
        return ctx;
    }

    compose() {
        return async ctx => {
            function createNext(middleware, oldNext) {
                return async () => {
                    await middleware(ctx, oldNext);
                }
            }
            let len = this.middlewares.length;
            let next = async () => {
                return Promise.resolve();
            };
            for (let i = len - 1; i >= 0; i--) { // 从后往前 生成next
                let currentMiddleware = this.middlewares[i];
                next = createNext(currentMiddleware, next);
            }
            await next();
        };
    }

    callback() {
        return (req, res) => {
            let ctx = this.createContext(req, res);
            let respond = () => this.responseBody(ctx);
            let onerror = (err) => this.onerror(err, ctx);
            let fn = this.compose();
            return fn(ctx).then(respond).catch(onerror);
        };
    }

    responseBody(ctx) {
        console.log('ctx', ctx);
    }

    onerror(err, ctx) {
        console.log('插件的错误处理');
    }
}

module.exports = Application;
