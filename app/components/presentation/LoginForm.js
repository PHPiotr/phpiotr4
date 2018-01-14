import React, {Fragment} from 'react';
import Button from 'material-ui/Button';
import {FormControl} from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import {Link} from 'react-router-dom';
import Typography from 'material-ui/Typography';

const LoginForm = ({auth: {isLoggedIn, login}, handleFocus, handleChange, handleSubmit}) => {
    if (isLoggedIn) {
        return null;
    }

    return (
        <Fragment>
            <Typography style={{padding: '23px'}} type="headline">Sign in</Typography>
            <form style={{padding: '20px'}} onSubmit={handleSubmit}>
                <FormControl component="fieldset">
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
            <Button raised style={{marginLeft: '20px'}} component={Link} to="/account-recovery">
                Forgot password?
            </Button>
        </Fragment>
    );
};

export default LoginForm;