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
        <div className="container-fluid">
            <form onSubmit={props.handleSubmit}>
                {loginError}
                <InputGroup inputWrapperClass="col-sm-12" labelClass="col-sm-12 col-form-label"
                            focusHandler={props.handleFocus}
                            value={auth.login.username} handler={props.handleChange} name="username"/>
                <InputGroup inputWrapperClass="col-sm-12" labelClass="col-sm-12 col-form-label" type="password"
                            focusHandler={props.handleFocus}
                            value={auth.login.password} handler={props.handleChange} name="password"/>
                <ButtonGroup buttonWrapperClass="">Log in</ButtonGroup>
            </form>
        </div>
    );
};

export default LoginForm;