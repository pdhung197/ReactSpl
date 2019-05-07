import React, { Component } from 'react';
import { AppConsumer } from './Context';

export default class Green extends Component {
    render() {
        return (
            <div className="green">
                <AppConsumer>{context => context.number}</AppConsumer>
            </div>
        );
    }
}