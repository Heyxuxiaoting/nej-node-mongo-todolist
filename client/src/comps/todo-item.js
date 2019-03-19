import React, { Component } from 'react';
import {Input, Modal, Form, Checkbox} from 'antd';
import deleteIcon from '../images/delete.png';
import editIcon from '../images/edit.png';
import { ms2str } from '../util/time';

class TodoItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showDel: false,
            modal: {
                visible: false,
                todo: ''
            }

        };
    }

    handleDelete() {
        const id = this.props.id;
        this.props.onDeleteItem(id);
    }

    handleUpdate() {
        const { modal } = this.state;
        const { getFieldsValue } = this.props.form;
        const values = getFieldsValue();
        const id = this.props.id;
        const content = values.todo;
        this.props.onUpdateItem(id, content);
        modal.visible = false;
        this.setState({
            modal,
        });
    }

    handleModal(data) {
        const { modal } = this.state;
        modal.visible = data.visible;
        modal.data = this.props.content;
        this.setState({
            modal,
        });
    }

    handleChange(e) {
        const status = e.target.checked == true ? 1 : 0;
        this.props.onUpdateStatus(status, this.props.id);
    }

    render() {
        const {modal} = this.state;
        const {getFieldDecorator} = this.props.form;
        let checkedStatus = this.props.status == 1 ? true : false;
        return (
            <div className="todoItem">
                <p>
                    <Checkbox checked={checkedStatus} onChange={(e) => this.handleChange(e)}/>
                    {checkedStatus == true ? <span className="itemCont inactive">{this.props.content}</span> :
                        <span className="itemCont">{this.props.content}</span>}
                    <span className="itemTime">{ms2str(this.props.date)}</span>
                    <button className="editBtn" onClick={() => this.handleModal({visible: true})}>
                        <img className="editIcon" src={editIcon}/>
                    </button>
                    <button className="delBtn" onClick={this.handleDelete.bind(this)}>
                        <img className="delIcon" src={deleteIcon}/>
                    </button>
                </p>
                <Modal
                    title='Updata item'
                    visible={modal.visible}
                    width='400px'
                    okText='OK'
                    cancelText='Cancel'
                    onOk={this.handleUpdate.bind(this)}
                    onCancel={() => this.handleModal({visible: false})}
                >
                    {getFieldDecorator('todo', {
                        initialValue: modal.data,
                    })(
                        <Input/>
                    )}
                </Modal>
            </div>
        );
    }
}

TodoItem = Form.create()(TodoItem);
export default TodoItem;
