import React, { Component } from 'react';
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu
} from 'reactstrap';

class UserInfoDropdownMenuItem extends Component {
    render() {
        return (
            <li>
                <a className="dropdown-menu__link" href={this.props.link}>
                    <i className={this.props.icon}></i><span>{this.props.name}</span>
                </a>
            </li>
        )
    }
}

class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    toggleDropdown() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div className="user-info">
                <div className="image">
                    <img src="/lib/imgs/user.png" alt="" />
                </div>
                <div className="info-container">
                    <div className="name" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Phan Hung</div>
                    <div>
                        <div className="email">pdhung.info@gmail.com</div>
                        <div className="btn-group user-helper-dropdown">
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav className={"dropdowntoggle "}>
                                    <i className="fas fa-chevron-down"></i>
                                </DropdownToggle>
                                <DropdownMenu className="rounded-0 dropdown-menu dropdown-menu__popup" right>
                                    <ul>
                                        <UserInfoDropdownMenuItem link="#l" icon="fas fa-user" name="Profile" />
                                        <hr />
                                        <UserInfoDropdownMenuItem link="#l" icon="fas fa-user-friends" name="Followers" />
                                        <UserInfoDropdownMenuItem link="#l" icon="fas fa-shopping-cart" name="Sales" />
                                        <UserInfoDropdownMenuItem link="#l" icon="fas fa-heart" name="Likes" />
                                        <hr />
                                        <UserInfoDropdownMenuItem link="#l" icon="fas fa-sign-out-alt" name="Sign Out" />
                                    </ul>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserInfo;