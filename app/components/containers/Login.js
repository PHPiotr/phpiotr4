import React from 'react';
import {connect} from 'react-redux';
import {onChangeLoginField, onFocusLoginField, loginIfNeeded, setLoggedIn, setLoggedOut} from '../../actions';
import LoginForm from '../presentation/LoginForm';
import getHeaders from '../../getHeaders';
import config from '../../../config';
import cookie from 'cookie-monster';

const Login = (props) => {
    return (
        <LoginForm {...props} />
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    handleFocus(event) {
        dispatch(onFocusLoginField(event.target.name, event.target.value));
    },
    handleChange(event) {
        dispatch(onChangeLoginField(event.target.name, event.target.value));
    },
    handleSubmit(event) {
        event.preventDefault();
        dispatch(loginIfNeeded(event, ownProps.auth.login, getHeaders()))
            .then((json) => {
                if (json.data.ok) {
                    let token = json.data.token;
                    config.api_headers['Authorization'] = `Bearer ${token}`;
                    let now = new Date();
                    let time = now.getTime();
                    let expireTime = time + 1000 * config.token_expires_in;
                    now.setTime(expireTime);
                    cookie.setItem(config.token_key, token, {expires: now.toGMTString()});
                    dispatch(setLoggedIn());
                    ownProps.router.push('/');
                } else {
                    dispatch(setLoggedOut());
                    delete config.api_headers['Authorization'];
                    cookie.removeItem(config.token_key);
                    ownProps.router.push('/login');
                }
            });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

