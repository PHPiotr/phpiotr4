import React, {Component} from 'react';
import {connect} from 'react-redux';
import Auth from './Auth';
import config from '../../../config';
import cookie from 'cookie-monster';
import {setLoggedOut} from '../../actions';

class Logout extends Component {

    componentWillMount() {
        this.props.logout();
    }

    render() {
        return null;
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    logout() {
        dispatch(setLoggedOut())
        delete config.api_headers['Authorization'];
        cookie.removeItem(config.token_key);
        ownProps.router.push('/login');
    }
});

export default Auth(connect(null, mapDispatchToProps)(Logout));

