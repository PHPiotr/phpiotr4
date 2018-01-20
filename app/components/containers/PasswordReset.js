import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import {FormControl} from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import NoAuth from './NoAuth';
import {setAppBarTitle} from '../../actions/app/appActions';
import MessageBar from '../presentation/MessageBar';
import * as passwordResetActions from '../../actions/passwordReset/passwordResetActions';
import * as passwordResetActionTypes from '../../actions/passwordReset/passwordResetActionTypes';
import {LinearProgress} from 'material-ui/Progress';

class PasswordReset extends Component {

    componentDidMount() {
        this.props.setAppBarTitle('Account recovery');
    }

    componentWillUnmount() {
        this.props.setAppBarTitle(null);
    }

    handleChange = (event) => {
        this.props.setResetPasswordInputValue(event.target.name, event.target.value);
    };

    handleFocus = event => this.props.dispatch({type: passwordResetActionTypes.ON_FOCUS_PASSWORD_RESET_FIELD, payload: event.target.name});

    render() {
        if (this.props.isLoggedIn) {
            return null;
        }
        if (this.props.isResetting) {
            return <LinearProgress/>;
        }
        return (
            <Fragment>
                <Typography style={{padding: '23px'}} type="headline">{this.props.passwordResetErrorMessage || 'Reset your password'}</Typography>
                <form style={{padding: '20px'}} onSubmit={this.props.handleSubmit}>
                    <FormControl component="fieldset">
                        <TextField
                            helperText={`New password: ${(this.props.passwordResetInputErrors.password && this.props.passwordResetInputErrors.password.message) || ''}`}
                            id={'new-password'}
                            type={'password'}
                            name={'password'}
                            onChange={this.handleChange}
                            onFocus={this.handleFocus}
                            value={this.props.password}
                            error={!!this.props.passwordResetErrorMessage}
                        />
                        <TextField
                            helperText={`Repeat new password: ${(this.props.passwordResetInputErrors.repeatPassword && this.props.passwordResetInputErrors.repeatPassword.message) || ''}`}
                            id={'new-password-repeat'}
                            type={'password'}
                            name={'repeatPassword'}
                            onChange={this.handleChange}
                            onFocus={this.handleFocus}
                            value={this.props.repeatPassword}
                            error={!!this.props.passwordResetErrorMessage}
                        />
                        <Button raised color="primary" style={{marginTop: '20px'}} type="submit">Reset password</Button>
                    </FormControl>
                </form>
                <MessageBar
                    open={this.props.isReset}
                    message="New password set successfully"
                    onClose={this.props.onClose}
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
        onClose() {
            dispatch(passwordResetActions.setIsResetPassword(false));
        },
    };
};

export default NoAuth(withRouter(connect(mapStateToProps, mapDispatchToProps)(PasswordReset)));