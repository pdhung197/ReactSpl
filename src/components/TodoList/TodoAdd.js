import React, { Component } from 'react';
import { TodoConsumer } from './TodoList';

export function focusToUpdate(text, idupdate) {
    this.setState({
        activity: 'update',
        inputtext: text,
        idtoupdate: idupdate
    });
    this.textInput.current.focus();
}

class TodoAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activity: 'addnew',
            inputtext: '',
            idtoupdate: null
        };
        this.typeOnInput = this.typeOnInput.bind(this);
        this.addNewtoTodoList = this.addNewtoTodoList.bind(this);
        // eslint-disable-next-line
        focusToUpdate = focusToUpdate.bind(this);
        this.cancelAddorUpdate = this.cancelAddorUpdate.bind(this);
        this.textInput = React.createRef();
        this.focus = this.focus.bind(this);
        this.updateTotoListData = this.updateTotoListData.bind(this);
    }
    focus() {
        this.textInput.current.focus();
    }
    typeOnInput(text) {
        this.setState({
            inputtext: text
        });
    }
    addNewtoTodoList(e, contextadd) {
        contextadd(e, this.state.inputtext);
        this.setState({
            inputtext: ''
        });
    }
    cancelAddorUpdate() {
        this.setState({
            activity: 'addnew',
            inputtext: '',
            idtoupdate: null
        });
    }
    updateTotoListData(e, contextupdate) {
        let id = this.state.idtoupdate;
        let value = [{
            key: 'todo',
            value: this.state.inputtext
        }];
        contextupdate(e, id, value);
        this.cancelAddorUpdate();
    }
    componentDidMount() {
        console.log(this.textInput.current);
    }
    render() {
        return (
            <TodoConsumer>
                {
                    context => {
                        return (
                            <div className="card rounded-0 todolist__add todolist__card pagecard">
                                <div className="card-header">
                                    <h5 className="todolist__headtext pagecard__headtext">Tạo mới/Cập nhật Todo List</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row todolist__addpanel">
                                        <div className="col-sm-6 col-12">
                                            <input
                                                type="text" name="" id="todolist__input"
                                                className="todolist__input form-control d-inline-block rounded-0"
                                                placeholder="Nhập việc cần làm"
                                                onChange={(e) => this.typeOnInput(e.target.value)}
                                                value={this.state.inputtext}
                                                ref={this.textInput}
                                            />
                                        </div>
                                        <div className={"col-sm-3 col-6 " + (this.state.activity === 'addnew' ? '' : 'd-none')}>
                                            <button
                                                id="todolist__addbtn"
                                                disabled={!this.state.inputtext.length}
                                                className="btn btn-success rounded-0 w-100"
                                                onClick={(e) => this.addNewtoTodoList(e, context.addNewtoTodoList)}
                                            >Thêm</button>
                                        </div>
                                        <div className={"col-sm-3 col-6 " + (this.state.activity === 'update' ? '' : 'd-none')}>
                                            <button
                                                id="todolist_updatebtn"
                                                disabled={!this.state.inputtext.length}
                                                className="btn btn-warning rounded-0 w-100"
                                                onClick={(e) => this.updateTotoListData(e, context.updateTodoList)}
                                            >Cập nhật</button>
                                        </div>
                                        <div className="col-sm-3 col-6">
                                            <button
                                                id="todolist__cancelbtn"
                                                disabled={!this.state.inputtext.length}
                                                className="btn btn-danger rounded-0 w-100"
                                                onClick={this.cancelAddorUpdate}
                                            >Hủy</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )
                    }
                }
            </TodoConsumer>
        )
    }
}

export default TodoAdd;