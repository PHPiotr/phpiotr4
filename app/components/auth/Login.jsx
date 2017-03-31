import React, { Component, PropTypes } from 'react';
import InputGroup from '../helper/InputGroup.jsx';
import ButtonGroup from '../helper/ButtonGroup.jsx';

class Login extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }

    handleSubmit(event) {
        this.props.callbacks.handleLogin(event);
    }

    handleChange(event) {
        this.props.callbacks.handleChange(event, 'login');
    }

    handleFocus(event) {
        this.props.callbacks.handleFocus(event, 'login');
    }

    render() {
        if (this.props.callbacks.handleIsLoggedIn()) {
            return null;
        }

        const auth = this.props.auth;
        const loginErrorMessage = auth.loginErrorMessage;
        let loginError = null;
        if (loginErrorMessage) {
            loginError = (
                <div className="alert alert-danger" role="alert">{loginErrorMessage}</div>
            );
        }
        return(
            <form onSubmit={this.handleSubmit} className="form-horizontal">
                {loginError}
                <InputGroup focusHandler={this.handleFocus} error={auth.loginErrors.username} value={auth.login.username} handler={this.handleChange} name="username" />
                <InputGroup type="password" focusHandler={this.handleFocus} error={auth.loginErrors.password} value={auth.login.password} handler={this.handleChange} name="password" />
                <ButtonGroup>Log in</ButtonGroup>
            </form>
        );
    }
}

export default Login;

