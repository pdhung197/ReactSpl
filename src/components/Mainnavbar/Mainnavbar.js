import React, { Component } from 'react';
import MainnavbarItem from './MainnavbarItem';
import MainnavbarItemDropdown from './MainnavbarItemDropdown';
import { setStateisOpentRightside } from '../Rightside/Rightside';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    /* DropdownItem */
} from 'reactstrap';
import './style/Mainnavbar.scss';

class Mainnavbar extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <Navbar id="mainnavbar" className="bgcolor-multitheme mainnavbar" expand="md">
                    <NavbarBrand href="/">ADMINBSB - MATERIAL DESIGN</NavbarBrand>

                    <NavbarToggler onClick={this.toggle} className="bgcolor-multitheme navbar-dark" />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <MainnavbarItem classnamelist={["bgcolor-multitheme", "mainnavbaritem", "nav-search"]} text="" icon="fas fa-search" />

                            <MainnavbarItemDropdown classnamelist={["bgcolor-multitheme", "mainnavbaritem", "nav-notification"]} position="right" icon="fas fa-bell" dropdowntype="notificationcount" />

                            <MainnavbarItemDropdown classnamelist={["bgcolor-multitheme", "mainnavbaritem", "nav-task"]} position="right" icon="fab fa-font-awesome-flag" dropdowntype="taskcount" />
                            <button onClick={() => setStateisOpentRightside()} className="bgcolor-multitheme mainnavbaritem toggleBtn">
                                <i className="fas fa-ellipsis-v"></i>
                            </button>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Mainnavbar;