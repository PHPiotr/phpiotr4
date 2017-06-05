import React, {Component} from 'react';
import {connect} from 'react-redux';
import {api_headers} from '../../../config';
import cookie from 'cookie-monster';
import {logout} from '../../actions/login';

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
        if (!ownProps.auth.isLoggedIn) {
            return false;
        }
        dispatch(logout());
        delete api_headers['Authorization'];
        cookie.removeItem(process.env.TOKEN_KEY);
        ownProps.router.push('/login');
    }
});

export default connect(null, mapDispatchToProps)(Logout);

