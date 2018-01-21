import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import * as authActions from '../../actions/auth/authActions';
import LoginForm from '../presentation/LoginForm';
import {LinearProgress} from 'material-ui/Progress';
import NoAuth from './NoAuth';
import {Cookies} from 'react-cookie';
import MessageBar from '../presentation/MessageBar';
import {setAppBarTitle} from '../../actions/app/appActions';

class Login extends Component {
    componentDidMount() {
        this.props.dispatch(setAppBarTitle('Sign in'));
    }
    onClose = () => {
        if (this.props.loginErrorMessage) {
            this.props.onCloseLoginErrorMessageBar();
        }
        if (this.props.activationErrorMessage) {
            this.props.onCloseActivationErrorMessageBar();
        }
        if (this.props.activationSuccessMessage) {
            this.props.onCloseSuccessMessageBar();
        }
    };
    render() {
        if (this.props.isLoggingIn) {
            return <LinearProgress/>;
        }
        return (
            <Fragment>
                <LoginForm {...this.props}/>
                <MessageBar
                    open={!!(this.props.loginErrorMessage || this.props.activationErrorMessage || this.props.activationSuccessMessage)}
                    message={this.props.loginErrorMessage || this.props.activationErrorMessage || this.props.activationSuccessMessage}
                    onClose={this.onClose}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({...state.auth});
const mapDispatchToProps = (dispatch, {history}) => ({
    handleFocus(event) {
        dispatch(authActions.focus(event.target.name, event.target.value));
    },
    handleChange(event) {
        dispatch(authActions.change(event.target.name, event.target.value));
    },
    handleSubmit(event) {
        event.preventDefault();
        dispatch(authActions.loginIfNeeded())
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
    onCloseLoginErrorMessageBar() {
        dispatch(authActions.setLoginErrorMessage(''));
    },
    onCloseActivationErrorMessageBar() {
        dispatch(authActions.setActivationErrorMessage(''));
    },
    onCloseSuccessMessageBar() {
        dispatch(authActions.setActivationSuccessMessage(''));
    },
    handleClickTogglePassword() {
        dispatch(authActions.toggleLoginPasswordVisibility());
    },
});

export default NoAuth(connect(mapStateToProps, mapDispatchToProps)(Login));

