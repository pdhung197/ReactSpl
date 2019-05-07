import React, { Component } from 'react';
import { Badge } from 'reactstrap';
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    Progress
} from 'reactstrap';
import { difffromtime } from '../../CommonJS';

const datanotif = [
    {
        type: 'person_add',
        detail: '12 new members joined',
        datetime: new Date(new Date() - (Math.floor(Math.random() * 100) + 1) * 60000),
        user: ''
    },
    {
        type: 'add_shopping_cart',
        detail: '4 sales made',
        datetime: new Date(new Date() - (Math.floor(Math.random() * 100) + 1) * 60000),
        user: ''
    },
    {
        type: 'delete_forever',
        detail: 'Nancy Doe deleted account',
        datetime: new Date(new Date() - (Math.floor(Math.random() * 100) + 1) * 60000),
        user: 'Nancy Doe'
    },
    {
        type: 'mode_edit',
        detail: 'Nancy changed name',
        datetime: new Date(new Date() - (Math.floor(Math.random() * 100) + 1) * 60000),
        user: 'Nancy'
    },
    {
        type: 'comment',
        detail: 'John commented your post',
        datetime: new Date(new Date() - (Math.floor(Math.random() * 100) + 1) * 60000),
        user: 'John'
    },
    {
        type: 'cached',
        detail: 'John updated status',
        datetime: new Date(new Date() - (Math.floor(Math.random() * 100) + 1) * 60000),
        user: 'John'
    },
    {
        type: 'settings',
        detail: 'Settings updated',
        datetime: new Date(new Date() - (Math.floor(Math.random() * 100) + 1) * 60000),
        user: ''
    }
];
const datatask = [
    {
        taskname: 'Footer display issue',
        completed: 32,
        typeoftask: 'issue'
    },
    {
        taskname: 'Make new buttons',
        completed: 45,
        typeoftask: 'create'
    },
    {
        taskname: 'Create new dashboard',
        completed: 54,
        typeoftask: 'create'
    },
    {
        taskname: 'Solve transition issue',
        completed: 65,
        typeoftask: 'issue'
    },
    {
        taskname: 'Answer GitHub questions',
        completed: 92,
        typeoftask: 'info'
    }
];

class MainnavbarItemDropdown extends Component {
    constructor(props) {
        super(props);
        this.setBadgeCount = this.setBadgeCount.bind(this);
        this.state = {
            notificationcount: 7,
            taskcount: 9,
            isOpen: false
        }
    }
    setBadgeCount() {
        var objcount = arguments[0];
        switch (objcount) {
            case "notif":
                this.setState((prevState) => {
                    return {
                        notificationcount: ++prevState.notificationcount
                    }
                });
                break;
            case "task":
                this.setState((prevState) => {
                    return {
                        taskcount: ++prevState.taskcount
                    }
                });
                break;
            default:
                break;
        }
    }

    toggleDropdown() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav className={"dropdowntoggle " + this.props.classnamelist.join(" ")}>
                    <i className={this.props.icon}></i>
                    <span>
                        <Badge color="dark">{this.state[this.props.dropdowntype]}</Badge>
                    </span>
                </DropdownToggle>
                <DropdownMenu className="rounded-0 dropdown-menu dropdown-menu__popup" right={this.props.position === "right" ? true : false}>
                    <AddDropdownbyType dropdowntype={this.props.dropdowntype} />
                </DropdownMenu>
            </UncontrolledDropdown>
        )
    }
}

function AddDropdownbyType(dropdownmenuitem) {
    switch (dropdownmenuitem.dropdowntype) {
        case 'notificationcount':
            return <DropdownMenuPopup typeofpopup="Notif" />;
        case 'taskcount':
            return <DropdownMenuPopup typeofpopup="Task" />
        default:
            return ""
    }
}

class DropdownMenuPopup extends Component {
    render() {
        let heardertext = this.props.typeofpopup === 'Notif' ? 'Notifications' : 'Tasks';
        let footertext = this.props.typeofpopup === 'Notif' ? 'Read all notification' : 'View all tasks';
        let datapopup = this.props.typeofpopup === 'Notif' ? datanotif.map((obj) => {
            return {
                type: obj.type,
                detail: obj.detail,
                datetime: obj.datetime,
                user: obj.user,
                icon: (function () {
                    switch (obj.type) {
                        case 'person_add':
                            return 'fas fa-user-plus';
                        case 'add_shopping_cart':
                            return 'fas fa-cart-plus';
                        case 'delete_forever':
                            return 'fas fa-trash-alt';
                        case 'mode_edit':
                            return 'fas fa-edit';
                        case 'comment':
                            return 'fas fa-comment-dots';
                        case 'cached':
                            return 'fas fa-sync-alt';
                        case 'settings':
                            return 'fas fa-cog';
                        default:
                            return 'fas fa-info';
                    }
                })(),
                iconbg: (function () {
                    switch (obj.type) {
                        case 'person_add':
                            return 'bg-success';
                        case 'add_shopping_cart':
                            return 'bg-primary';
                        case 'delete_forever':
                            return 'bg-danger';
                        case 'mode_edit':
                            return 'bg-success';
                        case 'comment':
                            return 'bg-warning';
                        case 'cached':
                            return 'bg-secondary';
                        case 'settings':
                            return 'bg-dark';
                        default:
                            return 'bg-info';
                    }
                })(),
                timming: (function () {
                    let startdate = new Date(obj.datetime);
                    let enddate = new Date();
                    return difffromtime(startdate, enddate);
                })()
            };
        }) : datatask.map((obj) => {
            return {
                taskname: obj.taskname,
                completed: obj.completed,
                typeoftask: obj.typeoftask,
                coloroftask: function () {
                    switch (obj.typeoftask) {
                        case 'issue':
                            return 'danger';
                        case 'create':
                            return 'success';
                        case 'update':
                            return 'primary';
                        case 'delete':
                            return 'warning'
                        default:
                            return 'info'
                    }
                }
            }
        });
        return (
            <ul className={"dropdown-menu__group dropdown-menu__" + this.props.typeofpopup}>
                <li className="dropdown-menu__header">
                    <h3>{heardertext}</h3>
                </li>
                <li className="dropdown-menu__body">
                    <div>
                        <ul>
                            {
                                datapopup.map((item, index) => {
                                    return (
                                        <DropdownPopupItem key={index} statedata={item} typeofpopup={this.props.typeofpopup} />
                                    )
                                })
                            }
                        </ul>
                    </div>
                </li>
                <li className="dropdown-menu__footer">
                    <a className="navlink" href="#component"><small>{footertext}</small></a>
                </li>
            </ul>
        )
    }
}

class DropdownPopupItem extends Component {
    constructor(props) {
        super(props);
        this.updatetimming = this.updatetimming.bind(this);
        this.state = {
            datapopup: this.props.statedata
        }
    }
    updatetimming() {
        if (this.props.typeofpopup === 'Notif') {
            let startdate = new Date(this.state.datapopup.datetime);
            let enddate = new Date();
            let timediff = difffromtime(startdate, enddate);
            if (timediff === this.state.datapopup.timming) return;
            this.setState({
                timming: (function () {
                    return difffromtime(startdate, enddate);
                })()
            })
        }
    }
    render() {
        const itemstate = this.state.datapopup;
        if (this.props.typeofpopup === 'Notif') return (
            <li>
                <a className="navlink dropdown-menu__link" href="#component">
                    <div className="dropdown-menu__circleicon">
                        <span className={"text-white " + itemstate.iconbg}><i className={itemstate.icon}></i></span>
                    </div>
                    <div className="dropdown-menu__info">
                        <h4>{itemstate.detail}</h4>
                        <p><i className="fas fa-history"></i> {itemstate.timming}</p>
                    </div>
                </a>
            </li>
        );
        else return (
            <li>
                <a className="navlink dropdown-menu__link" href="#component">
                    <div className="dropdown-menu__info px-2">
                        <h4><span>{itemstate.taskname}</span><small>{itemstate.completed + "%"}</small></h4>
                        <div className="dropdown-menu__progressouter">
                            <Progress bar color={itemstate.coloroftask()} className="rounded-0 dropdown-menu__progress" value={itemstate.completed}>
                            </Progress>
                        </div>
                    </div>
                </a>

            </li>
        );
    }
}

export default MainnavbarItemDropdown;