import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class LeftNav extends Component {
  render() {
    return (
      <ul className="nav nav-pills nav-stacked">
        <li role="presentation"><a href="#">Overview</a></li>
        <li role="presentation"><a href="#">Local</a></li>
        <li role="presentation"><a href="#">Remote</a></li>
        <li role="presentation"><a href="#">Monitoring</a></li>
      </ul>
    );
  }
}

export default LeftNav;
