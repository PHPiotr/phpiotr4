import React, {Fragment} from 'react';
import Button from 'material-ui/Button';
import {FormControl} from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import {Link} from 'react-router-dom';

const LoginForm = ({auth: {isLoggedIn, loginErrorMessage, login, activationSuccessMessage, activationErrorMessage}, handleFocus, handleChange, handleSubmit}) => {
    if (isLoggedIn) {
        return null;
    }

    return (
        <Fragment>
            <div>
                {activationSuccessMessage}
                {activationErrorMessage}
            </div>
            <form style={{padding: '20px'}} onSubmit={handleSubmit}>
                <FormControl component="fieldset">
                    {loginErrorMessage}
                    <TextField
                        helperText={'Login'}
                        id={'username'}
                        type={'text'}
                        name={'username'}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        value={login.username || ''}
                    />
                    <TextField
                        helperText={'Password'}
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
            <Link to="/users/account-recovery">Forgot password?</Link>
        </Fragment>
    );
};

export default LoginForm;