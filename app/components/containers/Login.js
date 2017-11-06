import React from 'react';
import {connect} from 'react-redux';
import {loginIfNeeded, change, focus} from '../../actions/login';
import LoginForm from '../presentation/LoginForm';
import getHeaders from '../../getHeaders';
import cookie from 'cookie-monster';
import Spinner from '../presentation/Spinner';

const Login = (props) => {
    return (
        <div>
            <Spinner isFetching={props.auth.isLoggingIn}/>
            <LoginForm {...props} />
        </div>
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    handleFocus(event) {
        dispatch(focus(event.target.name, event.target.value));
    },
    handleChange(event) {
        dispatch(change(event.target.name, event.target.value));
    },
    handleSubmit(event) {
        event.preventDefault();
        dispatch(loginIfNeeded(event, getHeaders()))
            .then((json) => {
                if (json.token) {
                    let token = json.token;
                    let now = new Date();
                    let time = now.getTime();
                    let expireTime = time + 1000 * json.expiresIn;
                    now.setTime(expireTime);
                    cookie.setItem(process.env.TOKEN_KEY, token, {expires: now.toGMTString()});
                    ownProps.history.push('/');
                } else {
                    cookie.removeItem(process.env.TOKEN_KEY);
                    ownProps.history.push('/login');
                }
            });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

