import React, { Component } from 'react';
import TodoAdd from './TodoAdd';
import TodoTable from './TodoTable';
import './style/TodoList.scss';

const axios = require('axios');
const TodoContext = React.createContext();
export const TodoConsumer = TodoContext.Consumer;
const ConstTodoProvider = TodoContext.Provider;
/* export function updateTodoListValue(todolist, id, valueupdate) {
    for (let i in todolist) {
        if (todolist[i].id.toString() === id.toString()) {
            let todoobject = todolist[i];
            for (let j in valueupdate) {
                todoobject[valueupdate[j].key] = valueupdate[j].value;
            }
            break;
        }
    }
    return todolist;
} */

class TodoProvider extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            tododata: [],
            getTodoListData: () => {
                axios.get("http://localhost:3000/todo")
                    .then(response => {
                        this.setState({
                            isLoaded: true,
                            tododata: response.data
                        });
                    }, reject => {
                        this.setState({
                            isLoaded: true,
                            error: reject
                        });
                    });
            },
            updateTodoList: (e, id, valueupdate) => {
                e.preventDefault();
                const dataupdate = {};
                let keyname = valueupdate[0].key;
                let value = valueupdate[0].value;
                dataupdate[keyname] = value;
                axios.patch("http://localhost:3000/todo/" + id, dataupdate)
                    .then(response => {
                        this.state.getTodoListData();
                    }, reject => {
                        this.state.getTodoListData();
                    });
            },
            addNewtoTodoList: (e, todo) => {
                e.preventDefault();
                axios.post("http://localhost:3000/todo/", {
                    todo,
                    status: 0
                })
                    .then(response => {
                        this.state.getTodoListData();
                    }, reject => {
                        this.state.getTodoListData();
                    });
            },
            deleteTodoItem: (event, todoid) => {
                event.preventDefault();
                let todoitemid = todoid.replace('todoitem', '');
                axios.delete("http://localhost:3000/todo/" + todoitemid)
                    .then(response => {
                        this.state.getTodoListData();
                    }, reject => {
                        this.state.getTodoListData();
                    });
            }
        }
    }
    componentDidMount() {
        this._isMounted = true;
        axios.get("http://localhost:3000/todo")
            .then(response => {
                if (this._isMounted)
                    this.setState({
                        isLoaded: true,
                        tododata: response.data
                    });
            }, reject => {
                if (this._isMounted)
                    this.setState({
                        isLoaded: true,
                        tododata: [
                            {
                                "id": 1,
                                "todo": "Việc 1",
                                "status": true
                            },
                            {
                                "id": 2,
                                "todo": "Việc 2",
                                "status": true
                            },
                            {
                                "id": 3,
                                "todo": "Việc 3",
                                "status": true
                            },
                            {
                                "todo": "Việc 4",
                                "status": true,
                                "id": 4
                            }
                        ]
                    });
            });
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {

        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ConstTodoProvider value={this.state}>
                    {this.props.children}
                </ConstTodoProvider>
            )
        }
    }
}

class TodoList extends Component {
    _isMounted = false;

    render() {
        return (
            <TodoProvider>
                <TodoConsumer>
                    {() => {
                        return (
                            <>
                                <TodoAdd />
                                <TodoTable />
                            </>
                        )
                    }}
                </TodoConsumer>
            </TodoProvider>
        );
    }
}

export default TodoList;