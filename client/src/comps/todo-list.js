import React, { Component } from 'react';
import TodoItem from './todo-item';

class TodoList extends Component {

    render() {
        const todoList = this.props.todoList;
        const todoItems = todoList.map((item, index) => {
            return (
                <TodoItem
                    key={index}
                    content={item.content}
                    id={item._id}
                    date={item.date}
                    status={item.status}
                    onUpdateItem={this.props.onUpdateItem}
                    onUpdateStatus={this.props.onUpdateStatus}
                    onDeleteItem={this.props.onDeleteItem}
                />
            );
        });
        return (
            <div>
                {todoItems}
            </div>
        );
    }
}

export default TodoList;
