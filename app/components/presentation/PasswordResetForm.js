import React from 'react';
import Button from 'material-ui/Button';
import {FormControl} from 'material-ui/Form';
import Input, {InputLabel, InputAdornment} from 'material-ui/Input';
import IconButton from 'material-ui/IconButton';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import {withStyles} from 'material-ui/styles';
import {formStyles as styles} from '../../utils/styles';

const PasswordResetForm = (props) => {
    return (
        <form className={props.classes.root} onSubmit={props.handleSubmit}>
            <FormControl component="fieldset">
                <FormControl className={props.classes.formControl}>
                    <InputLabel htmlFor="password">{`New password: ${(props.passwordResetInputErrors.password && props.passwordResetInputErrors.password.message) || ''}`}</InputLabel>
                    <Input
                        id="new-password"
                        name="password"
                        type={props.showPassword ? 'text' : 'password'}
                        onChange={props.handleChange}
                        onFocus={props.handleFocus}
                        value={props.password}
                        error={!!((props.passwordResetInputErrors.password && props.passwordResetInputErrors.password.message))}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={props.handleClickTogglePassword}>
                                    {props.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl className={props.classes.formControl}>
                    <InputLabel htmlFor="password">{`Repeat new password: ${(props.passwordResetInputErrors.repeatPassword && props.passwordResetInputErrors.repeatPassword.message) || ''}`}</InputLabel>
                    <Input
                        id="new-password-repeat"
                        name="repeatPassword"
                        type={props.showRepeatPassword ? 'text' : 'password'}
                        onChange={props.handleChange}
                        onFocus={props.handleFocus}
                        value={props.repeatPassword}
                        error={!!((props.passwordResetInputErrors.repeatPassword && props.passwordResetInputErrors.repeatPassword.message))}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={props.handleClickToggleRepeatPassword}>
                                    {props.showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl className={props.classes.formControl}>
                    <Button variant="raised" color="primary" type="submit">Reset</Button>
                </FormControl>
            </FormControl>
        </form>
    );
};

export default withStyles(styles)(PasswordResetForm);