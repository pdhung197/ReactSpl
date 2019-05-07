import React, { Component } from 'react';
import OrderPanel from './OrderPanel';
import CartPanel from './CartPanel';
import { Route, Switch } from 'react-router-dom';
import './style/Order.scss';
class Pizza extends Component {
    render() {
        return (
            <OrderPanel ordertype="pizza" cartdata={this.props.cartdata} />
        )
    }
}

class AnotherFood extends Component {
    render() {
        return (
            <OrderPanel ordertype="food" cartdata={this.props.cartdata} />
        )
    }
}

class OrderPanelContainer extends Component {
    render() {
        return (
            <Switch>
                <Route path="/order/antfood" render={(props) => (
                    <AnotherFood {...props} cartdata={this.props.cartdata} />
                )} />
                <Route path="/order/pizza" render={(props) => (
                    <Pizza {...props} cartdata={this.props.cartdata} />
                )} />
            </Switch>
        )
    }
}

export function updateCartItem(item) {
    let cartdata = this.state.cartdata;
    let indexofitem = cartdata.findIndex((cart) => { return cart.id === item.id });
    if (item.count > 0) {
        if (indexofitem > -1) {
            cartdata[indexofitem].count = item.count;
        }
        else cartdata.push(item);
    }
    else {
        cartdata.splice(indexofitem, 1);
    }
    this.setState({
        cartdata
    });
}

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartdata: []
        }
        // eslint-disable-next-line
        updateCartItem = updateCartItem.bind(this);
    }
    render() {
        return (
            <div className="row flex-md-row flex-sm-column-reverse flex-column-reverse">
                <OrderPanelContainer cartdata={this.state.cartdata} />
                <CartPanel cartdata={this.state.cartdata} />
            </div>
        )
    }
}
export default Order;                                                            