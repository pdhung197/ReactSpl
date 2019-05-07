import React, { Component } from 'react';
import {
    NavItem,
    NavLink
} from 'reactstrap';

export default class MainnavbarItem extends Component {
    render() {
        return (
            <NavItem className={this.props.classnamelist.join(" ")}>
                <NavLink href="#components">{this.props.text}<i className={this.props.icon}></i></NavLink>
            </NavItem>
        )
    }
}