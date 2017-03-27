import React, { Component, PropTypes } from 'react';
import InputGroup from './helper/InputGroup.jsx';
import ButtonGroup from './helper/ButtonGroup.jsx';

class Register extends Component {

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
        let loginErrorMessage = this.props.loginErrorMessage;
        let loginError = null;
        if (loginErrorMessage) {
            loginError = (
                <div className="alert alert-danger" role="alert">{loginErrorMessage}</div>
            );
        }
        return(
            <form onSubmit={this.handleSubmit} className="form-horizontal">
                {loginError}
                <InputGroup focusHandler={this.handleFocus} error={this.props.loginErrors.username} value={this.props.login.username} handler={this.handleChange} name="username" />
                <InputGroup focusHandler={this.handleFocus} error={this.props.loginErrors.password} value={this.props.login.password} handler={this.handleChange} name="password" />
                <ButtonGroup>Log in</ButtonGroup>
            </form>
        );
    }
}

Register.propTypes = {
    login: PropTypes.object,
    loginErrors: PropTypes.object,
    loginErrorMessage: PropTypes.string,
};

export default Register;

