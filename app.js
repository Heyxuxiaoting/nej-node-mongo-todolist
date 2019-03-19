const path = require('path');
const Koa = require('koa');
const views = require('koa-views');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const staticFiles = require('koa-static');
const router = require('./routes');
const response = require('./middlewares/response');
const app = new Koa();

mongoose.connect('mongodb://localhost:27017/todo', {
    useNewUrlParser: true
});

app.use(staticFiles(path.resolve(__dirname, "./views")));

app.use(bodyParser());

// load template engine
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}));

/* response */
app.use(response);

/* logger */
app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('x-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

/* x-response-time */
app.use(async (ctx, next) => {
    const startTime = Date.now();
    await next();
    const rt = Date.now() - startTime;
    ctx.set('x-Response-Time', `${rt}ms`);
});

/* body */
app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(6612);