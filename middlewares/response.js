module.exports = async (ctx, next) => {
    try {
        await next();
        ctx.body = ctx.body ? ctx.body : {
            code: ctx.state.code ? ctx.state.code : 200,
            message: ctx.state.message ? ctx.state.message : 'success',
            data: ctx.state.data ? ctx.state.data : null
        }
    } catch (err) {
        console.log(err);
        ctx.body = {
            code: -1,
            message: err && err.message ? err.message : err.toString()
        }
    }
};