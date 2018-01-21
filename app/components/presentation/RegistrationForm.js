import React from 'react';
import Button from 'material-ui/Button';
import {FormControl} from 'material-ui/Form';
import Input, {InputLabel, InputAdornment} from 'material-ui/Input';
import IconButton from 'material-ui/IconButton';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
    },
});

const RegistrationForm = (props) => {
    if (props.isLoggedIn || props.isRegistering || props.isActivating) {
        return null;
    }

    const {registration, registrationErrors} = props;
    const usernameErrorMessage = (registrationErrors.username && registrationErrors.username.message)
        ? registrationErrors.username.message : '';
    const emailErrorMessage = (registrationErrors.email && registrationErrors.email.message)
        ? registrationErrors.email.message : '';
    const passwordErrorMessage = (registrationErrors.password && registrationErrors.password.message)
        ? registrationErrors.password.message : '';
    const repeatPasswordErrorMessage = (registrationErrors.repeatPassword && registrationErrors.repeatPassword.message)
        ? registrationErrors.repeatPassword.message : '';

    return (
        <form className={props.classes.root} onSubmit={props.handleSubmit} noValidate>
            <FormControl component="fieldset">
                <FormControl className={props.classes.formControl}>
                    <InputLabel htmlFor="password">{`Login: ${usernameErrorMessage}`}</InputLabel>
                    <Input
                        id="username"
                        name="username"
                        type={'text'}
                        onChange={props.handleChange}
                        onFocus={props.handleFocus}
                        value={registration.username || ''}
                        error={!!usernameErrorMessage}
                    />
                </FormControl>
                <FormControl className={props.classes.formControl}>
                    <InputLabel htmlFor="password">{`Email: ${emailErrorMessage}`}</InputLabel>
                    <Input
                        id="email"
                        name="email"
                        type={'text'}
                        onChange={props.handleChange}
                        onFocus={props.handleFocus}
                        value={registration.email || ''}
                        error={!!emailErrorMessage}
                    />
                </FormControl>
                <FormControl className={props.classes.formControl}>
                    <InputLabel htmlFor="password">{`Password: ${passwordErrorMessage}`}</InputLabel>
                    <Input
                        id={'password'}
                        name="password"
                        type={props.showPassword ? 'text' : 'password'}
                        onChange={props.handleChange}
                        onFocus={props.handleFocus}
                        value={registration.password || ''}
                        error={!!passwordErrorMessage}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={props.handleClickTogglePassword}
                                    onMouseDown={props.handleMouseDownTogglePassword}
                                >
                                    {props.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl className={props.classes.formControl}>
                    <InputLabel htmlFor="password">{`Confirm password: ${repeatPasswordErrorMessage}`}</InputLabel>
                    <Input
                        id={'repeat-password'}
                        name="repeatPassword"
                        type={props.showRepeatPassword ? 'text' : 'password'}
                        onChange={props.handleChange}
                        onFocus={props.handleFocus}
                        value={registration.repeatPassword || ''}
                        error={!!repeatPasswordErrorMessage}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={props.handleClickToggleRepeatPassword}
                                    onMouseDown={props.handleMouseDownTogglePassword}
                                >
                                    {props.showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl className={props.classes.formControl}>
                    <Button raised color="primary" type="submit">Register</Button>
                </FormControl>
            </FormControl>
        </form>
    );
};

export default withStyles(styles)(RegistrationForm);