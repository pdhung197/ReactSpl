import React, { Component } from 'react';
import Green from './Green';
import { AppConsumer } from './Context';

export default class Blue extends Component {
    render() {
        return (
            <div className="blue">
                <AppConsumer>
                    {context => (
                        <>
                            <button onClick={context.inc}>INC</button>
                            <button onClick={context.dec}>DEC</button>
                        </>
                    )}
                </AppConsumer>
                <Green />
            </div>
        )
    }
}