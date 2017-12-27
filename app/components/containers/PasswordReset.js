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
import {setResetPasswordInputValue, setResetPasswordErrorMessage, setIsResetPassword, resetPasswordIfNeeded} from '../../actions/auth/authActions';

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

    handleFocus = (event) => {
        const errorMessageKey = `${event.target.name}ErrorMessage`;
        if (this.props[errorMessageKey]) {
            this.props.setResetPasswordErrorMessage(errorMessageKey, '');
        }
    };

    render() {
        if (this.props.isLoggedIn) {
            return null;
        }
        return (
            <Fragment>
                <Typography style={{padding: '23px'}} type="headline">Reset your password</Typography>
                <form style={{padding: '20px'}} onSubmit={this.props.handleSubmit}>
                    <FormControl component="fieldset">
                        <TextField
                            helperText={this.props.newPasswordErrorMessage || 'New password'}
                            id={'new-password'}
                            type={'password'}
                            name={'newPassword'}
                            onChange={this.handleChange}
                            onFocus={this.handleFocus}
                            value={this.props.newPassword}
                            error={!!this.props.newPasswordErrorMessage}
                        />
                        <TextField
                            helperText={this.props.newPasswordRepeatErrorMessage || 'Confirm new password'}
                            id={'new-password-repeat'}
                            type={'password'}
                            name={'newPasswordRepeat'}
                            onChange={this.handleChange}
                            onFocus={this.handleFocus}
                            value={this.props.newPasswordRepeat}
                            error={!!this.props.newPasswordRepeatErrorMessage}
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

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        newPassword: state.auth.newPassword,
        newPasswordRepeat: state.auth.newPasswordRepeat,
        isReset: state.auth.isResetPassword,
        isResetting: state.auth.isResettingPassword,
        newPasswordErrorMessage: state.auth.newPasswordErrorMessage,
        newPasswordRepeatErrorMessage: state.auth.newPasswordRepeatErrorMessage,
    };
};

const mapDispatchToProps = (dispatch, {match}) => {
    return {
        setResetPasswordInputValue(name, value) {
            dispatch(setResetPasswordInputValue({name, value}));
        },
        handleSubmit(event) {
            event.preventDefault();
            const {userId, token} = match.params;
            dispatch(resetPasswordIfNeeded(userId, token));
        },
        setAppBarTitle(title) {
            dispatch(setAppBarTitle(title));
        },
        onClose() {
            dispatch(setIsResetPassword(false));
        },
        setResetPasswordErrorMessage(name, value) {
            dispatch(setResetPasswordErrorMessage({name, value}));
        },
    };
};

export default NoAuth(withRouter(connect(mapStateToProps, mapDispatchToProps)(PasswordReset)));