import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Button from 'material-ui/Button';
import {FormControl} from 'material-ui/Form';
import NoAuth from './NoAuth';
import {setAppBarTitle} from '../../actions/app/appActions';
import MessageBar from '../presentation/MessageBar';
import * as passwordResetActions from '../../actions/passwordReset/passwordResetActions';
import * as passwordResetActionTypes from '../../actions/passwordReset/passwordResetActionTypes';
import {LinearProgress} from 'material-ui/Progress';
import Input, {InputLabel, InputAdornment} from 'material-ui/Input';
import IconButton from 'material-ui/IconButton';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import {withStyles} from 'material-ui/styles';
import {formStyles as styles} from '../../utils/styles';

class PasswordReset extends Component {

    componentDidMount() {
        this.props.setAppBarTitle('Password reset');
    }

    componentWillUnmount() {
        this.props.setAppBarTitle(null);
    }

    handleChange = (event) => {
        this.props.setResetPasswordInputValue(event.target.name, event.target.value);
    };

    handleFocus = event => this.props.dispatch({type: passwordResetActionTypes.ON_FOCUS_PASSWORD_RESET_FIELD, payload: event.target.name});

    handleClickTogglePassword = () => this.props.dispatch(passwordResetActions.togglePasswordVisibility('showPassword'));
    handleClickToggleRepeatPassword = () => this.props.dispatch(passwordResetActions.togglePasswordVisibility('showRepeatPassword'));

    render() {
        if (this.props.isLoggedIn) {
            return null;
        }
        if (this.props.isResetting) {
            return <LinearProgress/>;
        }
        const {classes} = this.props;

        return (
            <Fragment>
                <form className={classes.root} onSubmit={this.props.handleSubmit}>
                    <FormControl component="fieldset">
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="password">{`New password: ${(this.props.passwordResetInputErrors.password && this.props.passwordResetInputErrors.password.message) || ''}`}</InputLabel>
                            <Input
                                id="new-password"
                                name="password"
                                type={this.props.showPassword ? 'text' : 'password'}
                                onChange={this.handleChange}
                                onFocus={this.handleFocus}
                                value={this.props.password}
                                error={!!((this.props.passwordResetInputErrors.password && this.props.passwordResetInputErrors.password.message))}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={this.handleClickTogglePassword}
                                        >
                                            {this.props.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="password">{`Repeat new password: ${(this.props.passwordResetInputErrors.repeatPassword && this.props.passwordResetInputErrors.repeatPassword.message) || ''}`}</InputLabel>
                            <Input
                                id="new-password-repeat"
                                name="repeatPassword"
                                type={this.props.showRepeatPassword ? 'text' : 'password'}
                                onChange={this.handleChange}
                                onFocus={this.handleFocus}
                                value={this.props.repeatPassword}
                                error={!!((this.props.passwordResetInputErrors.repeatPassword && this.props.passwordResetInputErrors.repeatPassword.message))}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={this.handleClickToggleRepeatPassword}
                                        >
                                            {this.props.showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <Button color="primary" type="submit">Reset</Button>
                        </FormControl>
                    </FormControl>
                </form>
                <MessageBar
                    open={this.props.isReset}
                    message="New password set successfully"
                    onClose={this.props.onSuccessClose}
                />
                <MessageBar
                    open={!!this.props.passwordResetErrorMessage}
                    message={this.props.passwordResetErrorMessage}
                    onClose={this.props.onErrorClose}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = ({auth: {isLoggedIn}, passwordReset}) => ({...passwordReset, isLoggedIn});
const mapDispatchToProps = (dispatch, {match}) => {
    return {
        setResetPasswordInputValue(name, value) {
            dispatch(passwordResetActions.setResetPasswordInputValue({name, value}));
        },
        handleSubmit(event) {
            event.preventDefault();
            const {userId, token} = match.params;
            dispatch(passwordResetActions.resetPasswordIfNeeded(userId, token));
        },
        setAppBarTitle(title) {
            dispatch(setAppBarTitle(title));
        },
        onSuccessClose() {
            dispatch(passwordResetActions.setIsResetPassword(false));
        },
        onErrorClose() {
            dispatch(passwordResetActions.setResetPasswordErrorMessage(''));
        },
    };
};

export default withStyles(styles)(NoAuth(withRouter(connect(mapStateToProps, mapDispatchToProps)(PasswordReset))));