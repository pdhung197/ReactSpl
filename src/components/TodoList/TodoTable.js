import React, { Component } from 'react';
import { focusToUpdate } from './TodoAdd';
import { TodoConsumer } from './TodoList';

class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tododata: this.props.tododata,
            statechanged: false
        };
        this.onChangeInput = this.onChangeInput.bind(this);
    }
    onChangeInput(e, contextupdate) {
        contextupdate(e, e.target.id.replace('todoitemfail', ''), [{
            key: 'status',
            value: e.target.checked
        }]);
    }
    render() {
        const data = this.props.tododata;
        const checked = data.status;
        return (
            <TodoConsumer>
                {
                    context => {
                        return (
                            <li>
                                <label className="container">
                                    <input id={"todoitemfail" + data.id} onChange={(e) => this.onChangeInput(e, context.updateTodoList)} type="checkbox" checked={checked} />
                                    <span className="checkmark">
                                        <i className="fas fa-check"></i>
                                    </span>
                                    <span className="checktext">{data.todo}</span>
                                </label>
                                <div className="button-group todolist_btngroup">
                                    <button data-todoid={"todoitem" + data.id} className="btn btn-warning rounded-0 mr-3 todolist_btngroupupdate" onClick={(e) => focusToUpdate(data.todo, data.id)}>Sửa</button>
                                    <button data-todoid={"todoitem" + data.id} className="btn btn-danger rounded-0 todolist_btngroupdelete" onClick={(e) => context.deleteTodoItem(e, "todoitem" + data.id)}>Xóa</button>
                                </div>
                            </li>
                        )
                    }
                }
            </TodoConsumer>
        )
    }
}

class TodoTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tododata: this.props.tododata,
            statechanged: false
        };
    }
    render() {
        return (
            <TodoConsumer>
                {
                    context => {
                        return (
                            <div className="card rounded-0 todolist__table todolist__card mt-4 pagecard">
                                <div className="card-header">
                                    <h5 className="todolist__headtext pagecard__headtext">Danh sách Todo list</h5>
                                </div>
                                <div className="card-body">
                                    <ul className="todolist__tablepanel">
                                        {
                                            context.tododata.map((data, index) => {
                                                return (
                                                    <TodoItem key={index} deleteTodoItem={this.props.deleteTodoItem} tododata={data} />
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        )
                    }
                }
            </TodoConsumer>
        )
    }
}
export default TodoTable;