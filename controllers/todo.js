const Todo = require('../models/todo');
const ADDITEMERROR = 5001;
const ADDITEMERRORMSG = 'add item error';
const REMOVEITEMERROR = 5002;
const REMOVEITEMERRORMSG = 'remove item error';
const UPDATEITEMERROR = 5003;
const UPDATEITEMERRORMSG = 'update item error';
const UPDATESTATUSERROR = 5004;
const UPDATESTATUSERRORMSG = 'update status error';

const getTodolist = async (ctx, next) => {
    const todoList = await Todo.find({}).sort({'date': -1});
    ctx.state.data = todoList;
};

const addItem = async (ctx, next) => {
    const newItem = ctx.request.body;
    try {
        await Todo.create(newItem);
    } catch(err) {
        console.log(err);
        ctx.state.code = ADDITEMERROR;
        ctx.state.message = ADDITEMERRORMSG;
    } finally {
        const todoList = await Todo.find({}).sort({'date': -1});
        ctx.state.data = todoList;
    }
};

const removeItem = async (ctx, next) => {
    const { id } = ctx.request.body;
    try {
        if(!id) throw new Error();
        await Todo.remove({
            _id: id
        });
    } catch(err) {
        console.log(err);
        ctx.state.code = REMOVEITEMERROR;
        ctx.state.message = REMOVEITEMERRORMSG;
    } finally {
        const todoList = await Todo.find({}).sort({'date': -1});
        ctx.state.data = todoList;
    }
};

const updateItem = async (ctx, next) => {
    const { id, content } = ctx.request.body;
    try {
        await Todo.update({ _id: id }, { content });
    } catch(err) {
        console.log(err);
        ctx.state.code = UPDATEITEMERROR;
        ctx.state.message = UPDATEITEMERRORMSG;
    }
};

const updateStatus = async (ctx, next) => {
    const { id, status } = ctx.request.body;
    try {
        await Todo.update({ _id: id }, { status });
    } catch(err) {
        console.log(err);
        ctx.state.code = UPDATESTATUSERROR;
        ctx.state.message = UPDATESTATUSERRORMSG;
    }
};

module.exports = {
    getTodolist,
    addItem,
    removeItem,
    updateItem,
    updateStatus
};