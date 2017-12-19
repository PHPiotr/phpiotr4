import React from 'react';
import {connect} from 'react-redux';
import {loginIfNeeded, change, focus} from '../../actions/auth/authActions';
import LoginForm from '../presentation/LoginForm';
import {LinearProgress} from 'material-ui/Progress';
import NoAuth from './NoAuth';
import {Cookies} from 'react-cookie';

const Login = props => props.auth.isLoggingIn ? <LinearProgress/> : <LoginForm {...props}/>;

const mapStateToProps = state => ({auth: state.auth});
const mapDispatchToProps = (dispatch, {history}) => ({
    handleFocus(event) {
        dispatch(focus(event.target.name, event.target.value));
    },
    handleChange(event) {
        dispatch(change(event.target.name, event.target.value));
    },
    handleSubmit(event) {
        event.preventDefault();
        dispatch(loginIfNeeded())
            .then(({payload}) => {
                const {token, expiresIn} = (payload || {});
                if (token && expiresIn) {
                    const now = new Date();
                    const expireTime = now.getTime() + 1000 * parseInt(expiresIn, 10);
                    now.setTime(expireTime);
                    const cookies = new Cookies();
                    cookies.set(process.env.TOKEN_KEY, token, {path: '/', expires: now});

                    history.push('/');
                }
            });
    },
});

export default NoAuth(connect(mapStateToProps, mapDispatchToProps)(Login));

