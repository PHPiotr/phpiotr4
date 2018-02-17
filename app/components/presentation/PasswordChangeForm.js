import React from 'react';
import Button from 'material-ui/Button';
import {FormControl} from 'material-ui/Form';
import Input, {InputLabel, InputAdornment} from 'material-ui/Input';
import IconButton from 'material-ui/IconButton';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import {withStyles} from 'material-ui/styles';
import {formStyles as styles} from '../../utils/styles';

const PasswordChangeForm = (props) => {

    const handleSubmit = event => props.handleSubmit(event, props.token);

    return (
        <form className={props.classes.root} onSubmit={handleSubmit}>
            <FormControl component="fieldset">
                <FormControl className={props.classes.formControl}>
                    <InputLabel htmlFor="current-password">{`Current password: ${(props.passwordChangeInputErrors.currentPassword && props.passwordChangeInputErrors.currentPassword.message) || ''}`}</InputLabel>
                    <Input
                        id="current-password"
                        name="currentPassword"
                        type={props.showCurrentPassword ? 'text' : 'password'}
                        onChange={props.handleChange}
                        onFocus={props.handleFocus}
                        value={props.currentPassword}
                        error={!!((props.passwordChangeInputErrors.currentPassword && props.passwordChangeInputErrors.currentPassword.message))}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={props.handleClickToggleCurrentPassword}>
                                    {props.showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl className={props.classes.formControl}>
                    <InputLabel htmlFor="new-password">{`New password: ${(props.passwordChangeInputErrors.password && props.passwordChangeInputErrors.password.message) || ''}`}</InputLabel>
                    <Input
                        id="new-password"
                        name="password"
                        type={props.showPassword ? 'text' : 'password'}
                        onChange={props.handleChange}
                        onFocus={props.handleFocus}
                        value={props.password}
                        error={!!((props.passwordChangeInputErrors.password && props.passwordChangeInputErrors.password.message))}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={props.handleClickToggleNewPassword}>
                                    {props.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl className={props.classes.formControl}>
                    <InputLabel htmlFor="new-password-repeat">{`Repeat new password: ${(props.passwordChangeInputErrors.repeatPassword && props.passwordChangeInputErrors.repeatPassword.message) || ''}`}</InputLabel>
                    <Input
                        id="new-password-repeat"
                        name="repeatPassword"
                        type={props.showRepeatPassword ? 'text' : 'password'}
                        onChange={props.handleChange}
                        onFocus={props.handleFocus}
                        value={props.repeatPassword}
                        error={!!((props.passwordChangeInputErrors.repeatPassword && props.passwordChangeInputErrors.repeatPassword.message))}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={props.handleClickToggleRepeatNewPassword}>
                                    {props.showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl className={props.classes.formControl}>
                    <Button variant="raised" color="primary" type="submit">Change</Button>
                </FormControl>
            </FormControl>
        </form>
    );
};

export default withStyles(styles)(PasswordChangeForm);