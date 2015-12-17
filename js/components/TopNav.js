import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class TopNav extends Component {
  render() {
    return (
      <nav className="navbar navbar-default navbar-static-top">
      <div className="container">
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav navbar-right">
            <li><a href="">Alerts</a></li>
            <li><a href="">Profile</a></li>
          </ul>
        </div>
      </div>
    </nav>
    );
  }
}

export default TopNav;
