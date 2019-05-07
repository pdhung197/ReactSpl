import React, { Component } from 'react';
import './style/Rightside.scss';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import { updateThemeColor } from '../../App';
import classnames from 'classnames';

// eslint-disable-next-line
class ColorChecker extends Component {
    radioChange() {
        console.log('change');
    }
    render() {
        var stylecolor = {
            color: this.props.colorcode
        };
        var activethemeclass = (this.props.themecolor === this.props.colorname ? 'activetheme' : '');
        var colorcheck = this.props.themecolor === this.props.colorname;
        return (
            <li onClick={() => updateThemeColor('theme-' + this.props.colorname)} className={"rightnavtab__tabcolorcheckitem " + activethemeclass}>
                <div>
                    <i style={stylecolor} className="fas fa-square"></i>
                    <span>{this.props.colorname}</span>
                </div>
                <div>
                    <input onChange={this.radioChange} type="radio" name="colorcheck" id={"colorcheck" + this.props.indexid} checked={colorcheck} />
                    <i htmlFor={"colorcheck" + this.props.indexid} className={"fas fa-check checksymbol " + (activethemeclass)}></i>
                </div>
            </li>
        );
    }
}

class RightsideTab extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    render() {
        return (
            <>
                <Nav tabs className="rightnavtab">
                    <NavItem className="rightnavtab__navitem">
                        <NavLink className={classnames({ active: this.state.activeTab === '1' }) + " rightnavtab__navlink"} onClick={() => { this.toggle('1'); }}>
                            Skins
                        </NavLink>
                    </NavItem>
                    <NavItem className="rightnavtab__navitem">
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' }) + " rightnavtab__navlink"} onClick={() => { this.toggle('2'); }} >
                            Settings
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab} className="rightnavtab__tabcontent">
                    <TabPane tabId="1" className="rightnavtab__tabpane rightnavtab__tabcolorcheck">
                        <ul className="rightnavtab__tabcolorcheckcontent">
                            {
                                this.props.colorarr.map((obj, index) => {
                                    return (
                                        <ColorChecker indexid={index} key={index} colorname={obj.name} colorcode={obj.colorcode} themecolor={this.props.themecolor} />
                                    )
                                })
                            }
                        </ul>
                    </TabPane>
                    <TabPane tabId="2" className="rightnavtab__tabpane">
                        <Row>
                            <Col sm="12">
                                <h4>Tab 2 Contents</h4>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </>
        );
    }
}

export function setStateisOpentRightside() {
    this.setState({ isOpen: !this.state.isOpen })
}

class Rightside extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
        // eslint-disable-next-line
        setStateisOpentRightside = setStateisOpentRightside.bind(this)
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target) && this.state.isOpen) {
            if (event.target.parentNode.classList.contains('toggleBtn') || event.target.classList.contains('toggleBtn')) return;
            this.setState({
                isOpen: false
            });
        }
    }
    render() {
        const colorarr = [
            { name: 'red', colorcode: '#F44336' },
            { name: 'cyan', colorcode: '#00FFFF' },
            { name: 'blue', colorcode: '#0000FF' },
            { name: 'darkblue', colorcode: '#0000A0' },
            { name: 'lightblue', colorcode: '#ADD8E6' },
            { name: 'purple', colorcode: '#800080' },
            { name: 'yellow', colorcode: '#FFFF00' },
            { name: 'lime', colorcode: '#00FF00' },
            { name: 'magenta', colorcode: '#FF00FF' },
            { name: 'white', colorcode: '#FFFFFF' },
            { name: 'silver', colorcode: '#C0C0C0' },
            { name: 'gray or grey', colorcode: '#808080' },
            { name: 'black', colorcode: '#000000' },
            { name: 'orange', colorcode: '#FFA500' },
            { name: 'brown', colorcode: '#A52A2A' },
            { name: 'maroon', colorcode: '#800000' },
            { name: 'green', colorcode: '#008000' },
            { name: 'olive', colorcode: '#808000' }
        ];
        return (
            <aside ref={this.setWrapperRef} id="rightside" className={"rightside " + (this.state.isOpen ? "open" : "")}>
                <RightsideTab colorarr={colorarr} themecolor={this.props.themecolor} />
                {/* <button onClick={this.props.actiontheme.bind(null, 'theme-yellow')}>Button</button> */}
            </aside>
        );
    }
}

export default Rightside;