import React from 'react';
import Button from 'material-ui/Button';
import {FormControl} from 'material-ui/Form';
import {Link} from 'react-router-dom';
import Input, {InputLabel, InputAdornment} from 'material-ui/Input';
import IconButton from 'material-ui/IconButton';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import {withStyles} from 'material-ui/styles';
import {formStyles as styles} from '../../utils/styles';

const LoginForm = (props) => {
    if (props.isLoggedIn) {
        return null;
    }

    const usernameErrorMessage = (props.loginErrors.username && props.loginErrors.username.message)
        ? props.loginErrors.username.message : '';
    const passwordErrorMessage = (props.loginErrors.password && props.loginErrors.password.message)
        ? props.loginErrors.password.message : '';
    const handleSubmit = (event) => {
        props.handleSubmit(event, props.login.username, props.login.password);
    };

    return (
        <form className={props.classes.root} onSubmit={handleSubmit}>
            <FormControl component="fieldset">
                <FormControl className={props.classes.formControl}>
                    <InputLabel htmlFor="password">{`Login: ${usernameErrorMessage}`}</InputLabel>
                    <Input
                        id="username"
                        name="username"
                        type={'text'}
                        onChange={props.handleChange}
                        onFocus={props.handleFocus}
                        value={props.login.username || ''}
                        error={!!usernameErrorMessage}
                    />
                </FormControl>
                <FormControl className={props.classes.formControl}>
                    <InputLabel htmlFor="password">{`Password: ${passwordErrorMessage}`}</InputLabel>
                    <Input
                        id="password"
                        name="password"
                        type={props.showLoginPassword ? 'text' : 'password'}
                        onChange={props.handleChange}
                        onFocus={props.handleFocus}
                        value={props.login.password || ''}
                        error={!!passwordErrorMessage}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={props.handleClickTogglePassword}
                                >
                                    {props.showLoginPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl className={props.classes.formControl}>
                    <Button variant="raised" color="primary" type="submit">Sign in</Button>
                </FormControl>
                <FormControl className={props.classes.formControl}>
                    <Button variant="raised" component={Link} to="/account-recovery">Forgot password?</Button>
                </FormControl>
            </FormControl>
        </form>
    );
};

export default withStyles(styles)(LoginForm);