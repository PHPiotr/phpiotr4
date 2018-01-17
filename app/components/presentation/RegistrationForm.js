import React from 'react';
import Button from 'material-ui/Button';
import {FormControl} from 'material-ui/Form';
import TextField from 'material-ui/TextField';

const RegistrationForm = ({auth, handleFocus, handleChange, handleSubmit}) => {
    if (auth.isLoggedIn || auth.isRegistering || auth.isActivating) {
        return null;
    }

    const {registration, registrationErrors} = auth;
    const usernameErrorMessage = (registrationErrors.username && registrationErrors.username.message)
        ? registrationErrors.username.message : '';
    const emailErrorMessage = (registrationErrors.email && registrationErrors.email.message)
        ? registrationErrors.email.message : '';
    const passwordErrorMessage = (registrationErrors.password && registrationErrors.password.message)
        ? registrationErrors.password.message : '';
    const repeatPasswordErrorMessage = (registrationErrors.repeatPassword && registrationErrors.repeatPassword.message)
        ? registrationErrors.repeatPassword.message : '';

    return (
        <form style={{padding: '20px'}} onSubmit={handleSubmit} noValidate>
            <FormControl component="fieldset">
                <TextField
                    error={!!usernameErrorMessage}
                    helperText={`Login: ${usernameErrorMessage}`}
                    id={'username'}
                    type={'text'}
                    name={'username'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={registration.username || ''}
                />
                <TextField
                    error={!!emailErrorMessage}
                    helperText={`Email: ${emailErrorMessage}`}
                    id={'email'}
                    type={'email'}
                    name={'email'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={registration.email || ''}
                />
                <TextField
                    error={!!passwordErrorMessage}
                    helperText={`Password: ${passwordErrorMessage}`}
                    id={'password'}
                    type={'password'}
                    name={'password'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={registration.password || ''}
                />
                <TextField
                    error={!!repeatPasswordErrorMessage}
                    helperText={`Confirm password: ${repeatPasswordErrorMessage}`}
                    id={'repeat-password'}
                    type={'password'}
                    name={'repeatPassword'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={registration.repeatPassword || ''}
                />
                <Button style={{marginTop: '20px'}} raised color="primary" type="submit">Register</Button>
            </FormControl>
        </form>
    );
};

export default RegistrationForm;