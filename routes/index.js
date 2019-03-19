const Router = require('koa-router');
const { todo } = require('../controllers');

let router = new Router({
    prefix: '/todo'
});

router.get('/', async (ctx, next) => {
    let title = 'Koa Todolist';
    await ctx.render('index', {
        title,
    })
});

/* get all todolist */
router.get('/gettodolist', todo.getTodolist);

/* add todoitem */
router.post('/additem', todo.addItem);

/* remove todoitem */
router.post('/removeitem', todo.removeItem);

/* update todoitem */
router.post('/updateitem', todo.updateItem);

/* update status */
router.post('/updatestatus', todo.updateStatus);

module.exports = router;