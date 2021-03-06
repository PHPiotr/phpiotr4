import React from 'react';
import Button from 'material-ui/Button';
import {FormControl} from 'material-ui/Form';
import Input, {InputLabel, InputAdornment} from 'material-ui/Input';
import IconButton from 'material-ui/IconButton';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import {withStyles} from 'material-ui/styles';
import {formStyles as styles} from '../../utils/styles';

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
                        type={props.showRegistrationPassword ? 'text' : 'password'}
                        onChange={props.handleChange}
                        onFocus={props.handleFocus}
                        value={registration.password || ''}
                        error={!!passwordErrorMessage}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={props.handleClickTogglePassword}
                                >
                                    {props.showRegistrationPassword ? <VisibilityOff /> : <Visibility />}
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
                        type={props.showRegistrationRepeatPassword ? 'text' : 'password'}
                        onChange={props.handleChange}
                        onFocus={props.handleFocus}
                        value={registration.repeatPassword || ''}
                        error={!!repeatPasswordErrorMessage}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={props.handleClickToggleRepeatPassword}
                                >
                                    {props.showRegistrationRepeatPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl className={props.classes.formControl}>
                    <Button variant="raised" color="primary" type="submit">Sign up</Button>
                </FormControl>
            </FormControl>
        </form>
    );
};

export default withStyles(styles)(RegistrationForm);