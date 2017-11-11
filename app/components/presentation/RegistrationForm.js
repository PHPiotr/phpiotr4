import React from 'react';
import InputGroup from '../helper/InputGroup.jsx';
import Button from 'material-ui/Button';

const RegistrationForm = (props) => {
    if (props.auth.isLoggedIn) {
        return null;
    }
    if (props.auth.isRegistering) {
        return null;
    }

    const auth = props.auth;
    const registrationErrorMessage = auth.registrationErrorMessage;
    let registrationError = null;
    if (registrationErrorMessage) {
        registrationError = (
            <div className="alert alert-danger" role="alert">{registrationErrorMessage}</div>
        );
    }

    const registrationSuccessMessage = auth.registrationSuccessMessage;
    let registrationSuccess = null;
    if (registrationSuccessMessage) {
        registrationSuccess = (
            <div className="alert alert-success" role="alert">{registrationSuccessMessage}</div>
        );
    }
    return (
        <div className="container-fluid">
            <form onSubmit={props.handleSubmit}>
                {registrationSuccess}
                {registrationError}
                <InputGroup inputWrapperClass="col-sm-12" labelClass="col-sm-12 col-form-label"
                    focusHandler={props.handleFocus}
                    value={auth.registration.username} handler={props.handleChange} name="username"/>
                <InputGroup inputWrapperClass="col-sm-12" labelClass="col-sm-12 col-form-label"
                    focusHandler={props.handleFocus}
                    value={auth.registration.email} handler={props.handleChange} name="email"/>
                <InputGroup inputWrapperClass="col-sm-12" labelClass="col-sm-12 col-form-label" type="password"
                    focusHandler={props.handleFocus}
                    value={auth.registration.password} handler={props.handleChange} name="password"/>
                <InputGroup label="Confirm password" inputWrapperClass="col-sm-12" labelClass="col-sm-12 col-form-label"
                    type="password" focusHandler={props.handleFocus}
                    value={auth.registration.repeatPassword} handler={props.handleChange}
                    name="repeatPassword"/>
                <Button type="submit">Register</Button>
            </form>
        </div>
    );
};

export default RegistrationForm;