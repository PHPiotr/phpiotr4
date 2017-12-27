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

    handleFocus = () => {
        if (this.props.passwordResetErrorMessage) {
            this.props.setResetPasswordErrorMessage('');
        }
    };

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
                            helperText={'New password'}
                            id={'new-password'}
                            type={'password'}
                            name={'newPassword'}
                            onChange={this.handleChange}
                            onFocus={this.handleFocus}
                            value={this.props.newPassword}
                            error={!!this.props.passwordResetErrorMessage}
                        />
                        <TextField
                            helperText={'Confirm new password'}
                            id={'new-password-repeat'}
                            type={'password'}
                            name={'newPasswordRepeat'}
                            onChange={this.handleChange}
                            onFocus={this.handleFocus}
                            value={this.props.newPasswordRepeat}
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
        setResetPasswordErrorMessage(value) {
            dispatch(passwordResetActions.setResetPasswordErrorMessage(value));
        },
    };
};

export default NoAuth(withRouter(connect(mapStateToProps, mapDispatchToProps)(PasswordReset)));