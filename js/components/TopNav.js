import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class TopNav extends Component {
  render() {
    return (
      <nav className="navbar navbar-default navbar-static-top">
      <div className="container-fluid">
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav navbar-right">
            <li><a href=""><span className="glyphicon glyphicon-bell" aria-hidden="true"></span></a></li>
            <li><a href=""><span className="glyphicon glyphicon-user" aria-hidden="true"></span></a></li>
          </ul>
        </div>
      </div>
    </nav>
    );
  }
}

export default TopNav;
