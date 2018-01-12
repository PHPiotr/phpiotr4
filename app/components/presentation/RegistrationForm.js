import React from 'react';
import Button from 'material-ui/Button';
import {FormControl} from 'material-ui/Form';
import TextField from 'material-ui/TextField';

const RegistrationForm = ({auth, handleFocus, handleChange, handleSubmit}) => {
    if (auth.isLoggedIn || auth.isRegistering || auth.isActivating) {
        return null;
    }

    const {registration, registrationSuccessMessage, registrationErrorMessage} = auth;

    return (
        <div>
            <div>
                {registrationSuccessMessage}
                {registrationErrorMessage}
            </div>
            <form style={{padding: '20px'}} onSubmit={handleSubmit}>
                <FormControl component="fieldset">
                    <TextField
                        error={auth.registrationErrors.username && !!auth.registrationErrors.username.message}
                        helperText={'Login'}
                        id={'username'}
                        type={'text'}
                        name={'username'}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        value={registration.username || ''}
                    />
                    <TextField
                        error={auth.registrationErrors.email && !!auth.registrationErrors.email.message}
                        helperText={'Email'}
                        id={'email'}
                        type={'email'}
                        name={'email'}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        value={registration.email || ''}
                    />
                    <TextField
                        error={auth.registrationErrors.password && !!auth.registrationErrors.password.message}
                        helperText={'Password'}
                        id={'password'}
                        type={'password'}
                        name={'password'}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        value={registration.password || ''}
                    />
                    <TextField
                        error={auth.registrationErrors.repeatPassword && !!auth.registrationErrors.repeatPassword.message}
                        helperText={'Confirm password'}
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
        </div>
    );
};

export default RegistrationForm;