import React, {Fragment} from 'react';
import Button from 'material-ui/Button';
import {FormControl} from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import {Link} from 'react-router-dom';

const LoginForm = ({auth: {isLoggedIn, login, loginErrors}, handleFocus, handleChange, handleSubmit}) => {
    if (isLoggedIn) {
        return null;
    }

    const usernameErrorMessage = (loginErrors.username && loginErrors.username.message)
        ? loginErrors.username.message : '';
    const passwordErrorMessage = (loginErrors.password && loginErrors.password.message)
        ? loginErrors.password.message : '';

    return (
        <Fragment>
            <form style={{padding: '20px'}} onSubmit={handleSubmit}>
                <FormControl component="fieldset">
                    <TextField
                        error={!!usernameErrorMessage}
                        helperText={`Login: ${usernameErrorMessage}`}
                        id={'username'}
                        type={'text'}
                        name={'username'}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        value={login.username || ''}
                    />
                    <TextField
                        error={!!passwordErrorMessage}
                        helperText={`Password: ${passwordErrorMessage}`}
                        id={'password'}
                        type={'password'}
                        name={'password'}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        value={login.password || ''}
                    />
                    <Button raised color="primary" style={{marginTop: '20px'}} type="submit">Log in</Button>
                </FormControl>
            </form>
            <Button raised style={{marginLeft: '20px'}} component={Link} to="/account-recovery">
                Forgot password?
            </Button>
        </Fragment>
    );
};

export default LoginForm;