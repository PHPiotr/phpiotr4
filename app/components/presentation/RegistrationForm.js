import React from 'react';
import Button from 'material-ui/Button';
import {FormControl} from 'material-ui/Form';
import TextField from 'material-ui/TextField';

const RegistrationForm = ({auth, handleFocus, handleChange, handleSubmit}) => {
    if (auth.isLoggedIn) {
        return null;
    }
    if (auth.isRegistering) {
        return null;
    }
    const {registration, registrationSuccessMessage, registrationErrorMessage} = auth;

    return (
        <form style={{padding: '20px'}} onSubmit={handleSubmit}>
            <FormControl component="fieldset">
                {registrationSuccessMessage}
                {registrationErrorMessage}
                <TextField
                    helperText={'Login'}
                    id={'username'}
                    type={'text'}
                    name={'username'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={registration.username || ''}
                />
                <TextField
                    helperText={'Email'}
                    id={'email'}
                    type={'email'}
                    name={'email'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={registration.email || ''}
                />
                <TextField
                    helperText={'Password'}
                    id={'password'}
                    type={'password'}
                    name={'password'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={registration.password || ''}
                />
                <TextField
                    helperText={'Confirm password'}
                    id={'repeat-password'}
                    type={'password'}
                    name={'repeatPassword'}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    value={registration.repeatPassword || ''}
                />
                <Button type="submit">Register</Button>
            </FormControl>
        </form>
    );
};

export default RegistrationForm;