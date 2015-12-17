import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TopNav from './TopNav';
//import * as HomeActions from '../actions/HomeActions';
//import styles from '../../css/app.css';

class Dashboard extends Component {
  render() {
    const {dispatch} = this.props;
    //const actions = bindActionCreators(HomeActions, dispatch);
    return (
      <div>
        <TopNav />

      </div>
    );
  }
}

export default connect(state => state)(Dashboard);
