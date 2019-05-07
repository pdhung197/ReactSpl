import React, { Component } from 'react';

import Mainnavbar from './components/Mainnavbar/Mainnavbar';
import Leftside from './components/Leftside/Leftside';
import Rightside from './components/Rightside/Rightside';
import Mainside from './components/Mainside/Mainside';
import { BrowserRouter as Router } from 'react-router-dom';
/* import { withRouter } from 'react-router-dom'; */

import './style/reset.scss';
import './style/App.scss';

let defaultactiveroute = null;

export function updateThemeColor(themecolor) {
  if (themecolor === this.state.className) return;
  this.setState({
    className: themecolor
  })
}

export function updatePageName(pagename) {
  this.setState({
    pagename: pagename
  })
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      className: 'theme-red',
      pagename: 'Todo List'
    };
    // eslint-disable-next-line
    updateThemeColor = updateThemeColor.bind(this);
    // eslint-disable-next-line
    updatePageName = updatePageName.bind(this);
  }

  componentDidMount() {
    defaultactiveroute = window.location.href.split('/').pop();
  }

  render() {
    return (
      <Router>
        <div className={"mainbody " + this.state.className}>
          <Mainnavbar />
          <section className="sidebarsection">
            <Leftside defaultactiveroute={defaultactiveroute} />
            <Rightside actiontheme={updateThemeColor} themecolor={this.state.className.replace('theme-', '')} />
            <div className="overlay"></div>
          </section>
          <section className="bodysection">
            <h3 className="bodysection__pagetitle">{this.state.pagename}</h3>
            <Mainside />
          </section>
        </div>

      </Router>

    );
  }
}

export default App;

/* Mỗi sự kiện tạo ra Object Event để thao tác sự kiện. Trong react gọi là Synthetic Events
Synthetic Events là 1 object trong React
*/