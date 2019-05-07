import React, { Component } from 'react';
import TodoList from '../TodoList/TodoList';
import Order from '../Order/Order';
import Page404 from '../Page404/Page404';
import MusicPlayer from '../MusicPlayer/MusicPlayer';
import Context from '../Context/Context';
import { Route, Switch, Redirect } from 'react-router-dom'
import './style/Mainside.scss';

class Mainside extends Component {
    render() {

        return (
            <article id="mainside" className="mainside">
                <Switch>
                    <Route path="/order" component={Order} />
                    <Route path="/todolist" component={TodoList} />
                    <Route path="/music" component={MusicPlayer} />
                    <Route path="/context" component={Context} />
                    <Route path="/Page404" component={Page404} />
                    <Redirect from="/" to="/todolist" />
                </Switch>
            </article>
        );
    }
}

export default Mainside;