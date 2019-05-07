import React, { Component } from 'react';
import { updatePageName } from '../../App';
import {
    Collapse
} from 'reactstrap';
import { Link } from 'react-router-dom';

export function setPageName(pagename) {
    updatePageName(pagename);
}

class CollapseMenuNav extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isopen: this.props.active
        }
    }

    toggle(e) {
        this.props.switchActiveMenu(this.props.menuid, this.props.childof);
        if (!this.props.datachild || !this.props.datachild.length) {
            updatePageName(this.props.fullname);
        }
        if (this.props.active !== this.state.isopen) {
            this.setState({
                isOpen: this.props.active
            });
        }
        if (!(this.props.datachild === null || !this.props.datachild.length)) e.preventDefault();
    }

    render() {
        const datachild = this.props.datamenu.filter((menuitem) => { return menuitem.childof === this.props.menuid });
        const isopen = (!this.props.active || this.props.active === 0) ? false : true;
        const route = getRoutebyChild(this.props.datamenu, this.props.menuid, this.props.childof);
        return (
            <li className="menu-body">
                <Link to={route} href="#c"
                    onClick={(e) => { return this.toggle(e) }}
                    className={
                        ((this.props.datachild === null || !this.props.datachild.length) ? "" : "menu-toggle ") + (!isopen ? "" : "color-multitheme")
                    }
                >
                    <span>
                        {
                            this.props.icon === "0" ? (<></>) : (<i className={this.props.icon}></i>)
                        }
                        <span>{this.props.dataname}</span>
                    </span>
                    {
                        (this.props.datachild === null || !this.props.datachild.length) ? (<></>) :
                            (
                                isopen ? (<i className="fas fa-minus"></i>) : (<i className="fas fa-plus"></i>)
                            )
                    }
                </Link>
                {
                    (datachild === null || !datachild.length) ? <></> : (
                        datachild.map((data, index) => {
                            const active = (!data.active) ? 0 : data.active;
                            const datachildofchild = this.props.datamenu.filter((menuitem) => { return menuitem.childof === data.id });
                            return (
                                <Collapse tag="ul" key={index} isOpen={isopen} className="ml-menu">
                                    <CollapseMenuNav menuid={data.id} fullname={data.fullname} active={active} icon="0" dataname={data.name} datachild={datachildofchild} childof={data.childof} datamenu={this.props.datamenu} switchActiveMenu={this.props.switchActiveMenu} />
                                </Collapse>
                            )
                        })

                    )
                }
            </li>
        );
    }
}

class NaviLinkPane extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            datamenu: []
        }
        this.switchActiveMenu = this.switchActiveMenu.bind(this);
    }
    switchActiveMenu(menuid, childof) {
        const datamenuactive = setMenuActive(this.state.datamenu, menuid, childof);
        this.setState({
            datamenu: datamenuactive
        })
    }
    componentDidMount() {
        fetch('/lib/data/menudata.json')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        datamenu: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    render() {
        const { error, isLoaded, datamenu } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            const datalevel1 = datamenu.filter((menuitem) => { return menuitem.childof === null });
            return (
                <div className="navilinkpane">
                    <ul className="navilinkpane__area">
                        <li>
                            <h5>Main Navigation</h5>
                        </li>
                        {
                            datalevel1.map((data, index) => {
                                const iconclass = (!data.type) ? "0" : getIconClass(data.type);
                                const active = (!data.active) ? 0 : data.active;
                                const datachild = datamenu.filter((menuitem) => { return menuitem.childof === data.id });
                                return (
                                    <CollapseMenuNav menuid={data.id} fullname={data.fullname} datamenu={this.state.datamenu} active={active} key={index} icon={iconclass} route={data.route} childof={data.childof} dataname={data.name} datachild={datachild} switchActiveMenu={this.switchActiveMenu} />
                                )
                            })
                        }

                    </ul>
                    <ul className="navilinkpane__area">
                        <li>
                            <h5>Labels</h5>
                        </li>
                    </ul>
                </div>
            )
        }
    }
}

function getRoutebyChild(datamenu, menuid, childof) {
    const resultarray = getSetofMenubyChild(datamenu, menuid, childof, []).reverse();
    const route = resultarray.reduce(((route, indexmenuroute) => {
        const menuitem = datamenu.find(menu => menu.id === indexmenuroute);
        if (!menuitem) return null;
        return route = route + '/' + (menuitem.route ? menuitem.route : '');
    }), '');
    return route;
}

function getSetofMenubyChild(datamenu, menuid, childof, resultarray) {
    resultarray.push(menuid);
    if (childof !== null) {
        let indexofparent = datamenu.findIndex(menu => menu.id === childof);
        let parentchildof = datamenu[indexofparent].childof;
        getSetofMenubyChild(datamenu, childof, parentchildof, resultarray);
    }
    return resultarray;
}

function setMenuActive(datamenu, menuid, childof) {
    const resultarray = getSetofMenubyChild(datamenu, menuid, childof, []);

    return datamenu.map(menu => {
        if (resultarray.indexOf(menu.id) > -1) {
            if (menu.id === menuid && menu.active === 1 && datamenu.findIndex(menu => menu.childof === menuid) > -1)
                menu.active = 0;
            else menu.active = 1;
        }
        else menu.active = 0;
        return menu;
    });
}

function getIconClass(menutype) {
    switch (menutype) {
        case 'home':
            return 'fas fa-home';
        case 'text':
            return 'fas fa-text-height';
        case 'widget':
            return 'fas fa-window-restore';
        case 'help':
            return 'fas fa-layer-group';
        case 'cart':
            return 'fas fa-shopping-cart';
        case 'music':
            return 'fas fa-music';
        default:
            return '1';
    }

}
export default NaviLinkPane;