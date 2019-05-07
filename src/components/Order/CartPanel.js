import React, { Component } from 'react';

class CartItem extends Component {
    render() {
        return (
            <div className="cartpanel__item">
                <div className="cartpanel__itemimg">
                    <img src={this.props.cartimg} alt="" />
                </div>
                <div className="cartpanel__iteminfo">
                    <h5>{this.props.cartname}</h5>
                    <p><span>Count: {this.props.cartcount}</span> <span>Sum: ${(this.props.cartcount * this.props.cartcost).toFixed(2)}</span></p>
                </div>
            </div>
        )
    }
}

class CartPanel extends Component {
    render() {
        const cartdata = this.props.cartdata;
        const total = cartdata.reduce(((sum, cart) => {
            return sum = sum + cart.count * cart.cost;
        }), 0).toFixed(2);
        return (
            <div className="col-md-3 col-sm-12 cartpanel__container">
                <div className="cartpanel">
                    <div className="cartpanel__headtext">
                        <h5>Cart</h5>
                    </div>
                    <div className="cartpanel__list">
                        <div className="cartpanel__total">
                            <p><em>Total: $</em><span>{total}</span></p>
                        </div>
                        <div className="cartpanel__listbody">
                            {
                                cartdata.map((cart, index) => {
                                    return (<CartItem key={index} cartid={cart.id} cartname={cart.name} cartcost={cart.cost} cartcount={cart.count} cartimg={cart.image} />)
                                })
                            }

                        </div>
                        <div className="cartpanel_checkout">
                            <button className={"btn btn-danger rounded-0 cartpanel__paybtn " + ((!cartdata.length) ? "d-none" : "")}>Pay Now</button>
                        </div>
                    </div>
                </div>
            </div>        
        )        
    }        
}

export default CartPanel;