import React from 'react';
import {connect} from 'react-redux';
import {loginIfNeeded, change, focus} from '../../actions/login';
import LoginForm from '../presentation/LoginForm';
import cookie from 'cookie-monster';
import {LinearProgress} from 'material-ui/Progress';

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
            .then(({payload: {token, expiresIn}}) => {
                const now = new Date();
                const expireTime = now.getTime() + 1000 * parseInt(expiresIn, 10);
                now.setTime(expireTime);
                cookie.setItem(process.env.TOKEN_KEY, token, {expires: now.toGMTString()});
                history.push('/');
            })
            .catch(error => console.log(error));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

