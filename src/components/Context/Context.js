import React, { Component } from "react";
import Blue from './Blue';
import "./style/Context.scss";

const AppContext = React.createContext();
export const AppConsumer = AppContext.Consumer;
const AppProvider = AppContext.Provider;

class Provider extends React.Component {
    state = {
        number: 10,
        inc: () => {
            this.setState({ number: this.state.number + 1 });
        },
        dec: () => {
            this.setState({ number: this.state.number - 1 });
        }
    };

    render() {
        return (
            <AppProvider value={this.state}>
                {this.props.children}
            </AppProvider>
        );
    }
}

class Red extends React.Component {
    render() {
        return (
            <div className="red">
                <AppConsumer>{context => context.number}</AppConsumer>
                <Blue />
            </div>
        );
    }
}

export default class Context extends Component {
    render() {
        return (
            <Provider>
                <Red />
            </Provider>
        )
    }
}