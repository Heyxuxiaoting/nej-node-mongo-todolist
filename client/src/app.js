import React, { Component } from 'react';
import TodoList from './comps/todo-list';
import { Checkbox } from 'antd';
import './style/style.less';
import Fetch from './util/fetch';

class Todo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            todoList: [], // only for show
            todoListData: [],
            active: [],
            showTooltip: false
        };
    }

    componentDidMount() {
        this._getTodoList();
    }

    _getTodoList() {
        const that = this;
        Fetch('/todo/gettodolist').then(res => {
            let { data } = res;
            let ac = [];
            data.map((item, index) => (
                item.status == 0 ? ac.push(item) : null
            ));
            that.setState({
                todoList: data,
                todoListData: data,
                active: ac,
            });
        }).catch(errno => {
            console.log('Fetch Error :-S', errno);
        });
    }

    _onNewItem(newItem) {
        Fetch('/todo/additem', {
            method: 'post',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(newItem)
        }).then(res => {
            this._getTodoList();
        }).catch(errno => {
            console.log('Fetch Error :-S', errno);
        });
    }

    _onDeleteItem(id) {
        const postData = {
            id
        };
        Fetch('/todo/removeitem', {
            method: 'post',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(postData)
        }).then(res => {
            this._getTodoList();
        }).catch(errno => {
            console.log('Fetch Error :-S', errno);
        });
    }

    _onDeleteClearCompleted() {
        const {todoListData} = this.state;
        todoListData.map((item, index) => {
            item.status == 1 ?
                Fetch('/todo/removeitem', {
                    method: 'post',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    },
                    body: JSON.stringify({id: item._id})
                }).then(res => {
                    this._getTodoList();
                }).catch(errno => {
                    console.log('Fetch Error :-S', errno);
                }) : null;
        });
    }

    _onUpdateItem(id, content) {
        const postData = {
            id,
            content
        };
        Fetch('/todo/updateitem', {
            method: 'post',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(postData)
        }).then(res => {
            this._getTodoList();
        }).catch(errno => {
            console.log('Fetch Error :-S', errno);
        });
    }

    _onUpdateStatus(status, id) {
        const postData = {
            id,
            status
        };
        Fetch('/todo/updatestatus', {
            method: 'post',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(postData)
        }).then(res => {
            this._getTodoList();
        }).catch(errno => {
            console.log('Fetch Error :-S', errno);
        });
    }

    // check all
    handleChange(e) {
        const {todoListData} = this.state;
        let value = e.target.checked == true ? 1 : 0;
        todoListData.map((item, index) => {
            Fetch('/todo/updatestatus', {
                method: 'post',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({
                    id: item._id,
                    status: value
                })
            }).then(res => {
                this._getTodoList();
            }).catch(errno => {
                console.log('Fetch Error :-S', errno);
            });
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.refs.content.value == '') {
            this.refs.content.focus();
            this.setState({
                showTooltip: true
            });
            return;
        }

        // 生成参数
        const newItem = {
            content: this.refs.content.value,
            date: Date.now(),
            status: 0
        };

        this._onNewItem(newItem);
        this.refs.todoForm.reset();
        this.setState({
            showTooltip: false,
        });
    }

    // switch All Active Completed
    handleClick(data) {
        const {todoList, todoListData} = this.state;
        let com = [], ac = [], a = todoListData;
        todoListData.map((item, index) => (
            item.status == 1 ? com.push(item) : ac.push(item)
        ));
        if (data.type == 'all') {
            this.setState({
                todoList: a,
            });
        } else if (data.type == 'active') {
            this.setState({
                todoList: ac,
            });
        } else if (data.type == 'completed') {
            this.setState({
                todoList: com,
            });
        }
    }


    render() {
        return (
            <div>
                <div className="container">
                    <div className="header">Todos</div>
                    <form className="todoForm" ref="todoForm" onSubmit={this.handleSubmit.bind(this)}>
                        <input ref="content" type="text" placeholder="What needs to be done?" className="todoContent"/>
                        {this.state.showTooltip &&
                        <span className="tooltip">Content is required !</span>
                        }
                    </form>
                    <Checkbox onChange={(e) => this.handleChange(e)}>Check all</Checkbox>
                    <TodoList todoList={this.state.todoList} onDeleteItem={this._onDeleteItem.bind(this)}
                              onUpdateItem={this._onUpdateItem.bind(this)}
                              onUpdateStatus={this._onUpdateStatus.bind(this)}/>
                    <div className="tailer">
                        {this.state.active.length}&nbsp;{this.state.active.length == 0 ? 'item left' : 'items left'}
                        <a onClick={() => this.handleClick({type: 'all'})}>All</a>
                        <a onClick={() => this.handleClick({type: 'active'})}>Active</a>
                        <a onClick={() => this.handleClick({type: 'completed'})}>Completed</a>
                        <a onClick={() => this._onDeleteClearCompleted()}>Clear Completed</a>
                    </div>
                </div>

            </div>
        );
    }
}

export default Todo;
