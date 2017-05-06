import React from 'react';
import InputGroup from '../helper/InputGroup.jsx';
import ButtonGroup from '../helper/ButtonGroup.jsx';

const LoginForm = (props) => {
    if (props.auth.isLoggedIn) {
        return null;
    }

    const auth = props.auth;
    const loginErrorMessage = auth.loginErrorMessage;
    let loginError = null;
    if (loginErrorMessage) {
        loginError = (
            <div className="alert alert-danger" role="alert">{loginErrorMessage}</div>
        );
    }
    return (
        <form onSubmit={props.handleSubmit} className="form-horizontal">
            {loginError}
            <InputGroup focusHandler={props.handleFocus} error={auth.loginErrors.username}
                        value={auth.login.username} handler={props.handleChange} name="username"/>
            <InputGroup type="password" focusHandler={props.handleFocus} error={auth.loginErrors.password}
                        value={auth.login.password} handler={props.handleChange} name="password"/>
            <ButtonGroup>Log in</ButtonGroup>
        </form>
    );
};

export default LoginForm;