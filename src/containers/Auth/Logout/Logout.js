import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionCreators from '../../../store/actions/index';

class Logout extends Component {

    componentDidMount() {
        console.log('[Logout] component did mount');
        console.log(this.props);
        this.props.onLogout();
    }


    render() {
        console.log(this.props);
        return <Redirect to='/' />;
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => {
            return dispatch(actionCreators.authLogout());
        }
    }
};

export default connect(null, mapDispatchToProps)(Logout);
