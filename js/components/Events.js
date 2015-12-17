import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Events extends Component {
  render() {
    return (
      <h5>Events
      <span className="glyphicon glyphicon-cog pull-right" aria-hidden="true"></span>
      </h5>
    );
  }
}

export default Events;
