import React, { Component } from 'react';
import UserInfo from './UserInfo';
import FooterPane from './FooterPane';
import NaviLinkPane from './NaviLinkPane';
import '../Mainnavbar/style/Mainnavbar.scss';
import './style/Leftside.scss';

class Leftside extends Component {
    render() {

        return (
            <aside id="leftside" className="leftside">
                <UserInfo />
                <NaviLinkPane defaultactiveroute={this.props.defaultactiveroute} />
                <FooterPane />
            </aside>
        );
    }
}

export default Leftside;