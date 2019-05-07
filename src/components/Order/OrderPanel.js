import React, { Component } from 'react';
import { updateCartItem } from './Order';

class FoodItem extends Component {
    constructor(props) {
        super(props);
        this.inputCartChange = this.inputCartChange.bind(this);
        this.minutCart = this.minutCart.bind(this);
        this.addtoCart = this.addtoCart.bind(this);
        this.resetCart = this.resetCart.bind(this);
        this.updateCartbyItem = this.updateCartbyItem.bind(this);
    }
    minutCart() {
        if (this.props.foodcount === 0) return;
        let newcount = this.props.foodcount - 1;
        this.inputCartChange(newcount);
    }
    inputCartChange(value) {
        this.updateCartbyItem(value);
    }
    addtoCart() {
        let newcount = this.props.foodcount + 1;
        this.inputCartChange(newcount);
    }
    resetCart() {
        this.inputCartChange(0);
    }
    updateCartbyItem(count) {
        const id = this.props.ordertype + this.props.foodid;
        const name = this.props.foodname;
        const cost = this.props.foodcost;
        const image = '/lib/imgs/food/' + this.props.foodimg;

        const item = {
            id,
            name,
            cost,
            image,
            count
        };
        updateCartItem(item);
    }
    componentDidMount() {
        if (this.props.foodcount > 0) {
            const count = this.props.foodcount;
            this.updateCartbyItem(count);
        }
    }
    render() {
        const foodid = this.props.foodid;
        const foodname = this.props.foodname;
        const foodcost = this.props.foodcost;
        const foodimgpath = '/lib/imgs/food/' + this.props.foodimg;
        return (
            <div id={"food" + foodid} className="card rounded-0 food">
                <div className="card-body p-0">
                    <div className="food__img">
                        <img src={foodimgpath} alt="" className="m-0" />
                    </div>
                    <div className="food__info">
                        <h5>{foodname}</h5>
                        <p>{"$" + foodcost}</p>
                    </div>
                    <div className="food__input">
                        <button onClick={this.minutCart} disabled={this.props.foodcount <= 0} className={"btn rounded-0 " + (this.props.foodcount > 0 ? "btn-warning" : "")}><i className="fas fa-minus"></i></button>
                        <button onClick={this.resetCart} disabled={this.props.foodcount <= 0} className={"btn rounded-0 " + (this.props.foodcount > 0 ? "btn-danger" : "")}><i className="fas fa-sync-alt"></i></button>
                        <input onChange={(e) => this.inputCartChange(e.target.value)} className="bl-0 br-0 text-center" type="number" name="" min="0" value={this.props.foodcount} />
                        <button onClick={this.addtoCart} className="btn btn-success rounded-0"><i className="fas fa-plus"></i></button>
                    </div>
                </div>
            </div>
        )
    }
}

class OrderPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: []
        };
    }
    componentDidMount() {
        let datapath = getDataPath(this.props.ordertype);
        fetch(datapath)
            .then(res => res.json())
            .then(
                result => {
                    this.setState({
                        isLoaded: true,
                        data: result
                    });
                },
                error => {
                    this.setState({
                        isLoaded: false,
                        error
                    });
                }
            );
    }
    render() {
        const { error, isLoaded, data } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            const cartdata = this.props.cartdata;
            return (
                <div className="col-md-9 col-sm-12">
                    <div className="grid-container">
                        {
                            data.map((food, index) => {
                                let foodid = this.props.ordertype + food.id;
                                let count = 0;
                                let indexoffood = cartdata.findIndex((cart) => { return cart.id === foodid });
                                if (indexoffood > -1) count = cartdata[indexoffood].count;
                                return (
                                    <FoodItem key={index} foodcount={count} foodid={food.id} foodname={food.name} foodcost={food.cost} foodimg={food.image} ordertype={this.props.ordertype} />
                                )
                            })
                        }
                    </div>
                </div>
            )
        }
    }
}

function getDataPath(typeofdata) {
    let defaultpath = '/lib/data/';
    switch (typeofdata) {
        case 'pizza':
            return defaultpath + 'pizzadata.json';
        case 'food':
            return defaultpath + 'fooddata.json';
        default:
            return null;
    }
}

export default OrderPanel;