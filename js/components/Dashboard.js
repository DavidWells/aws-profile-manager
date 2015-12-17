import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TopNav from './TopNav';
import LeftNav from './LeftNav';
import Events from './Events';

class Dashboard extends Component {
  render() {
    const {dispatch} = this.props;
    //const actions = bindActionCreators(HomeActions, dispatch);
    return (
      <div className="fill-height">
        <TopNav />

        <div className="container-fluid fill-height">
          <div className="row fill-height">

            <div className="col-md-2 left-nav fill-height">
              <LeftNav />
            </div>

            <div className="col-md-8">
            </div>

            <div className="col-md-2 events fill-height">
              <Events />
            </div>

          </div>
        </div>


      </div>
    );
  }
}

export default connect(state => state)(Dashboard);
