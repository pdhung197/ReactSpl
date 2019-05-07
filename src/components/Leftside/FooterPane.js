import React, { Component } from 'react';

class FooterPane extends Component {
    render() {
        return (
            <div className="footerpane">
                <div className="copyright">
                    © 2019 <a href="#c"><strong className="color-multitheme">AdminBSB - ReactJS Cover</strong></a>.
                </div>
                <div className="version">
                    <b>Version: </b> 1.0.0
                </div>
            </div>
        )
    }
}
export default FooterPane;