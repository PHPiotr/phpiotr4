import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import NoAuth from './NoAuth';
import {setAppBarTitle} from '../../actions/app/appActions';
import MessageBar from '../presentation/MessageBar';
import * as passwordResetActions from '../../actions/passwordReset/passwordResetActions';
import {LinearProgress} from 'material-ui/Progress';
import PasswordResetForm from '../presentation/PasswordResetForm';

class PasswordReset extends Component {

    componentDidMount() {
        this.props.setAppBarTitle('Password reset');
    }

    componentWillUnmount() {
        this.props.setAppBarTitle(null);
    }

    render() {
        if (this.props.isLoggedIn) {
            return null;
        }
        if (this.props.isResetting) {
            return <LinearProgress/>;
        }

        return (
            <Fragment>
                <PasswordResetForm {...this.props}/>
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
        handleClickTogglePassword() {
            dispatch(passwordResetActions.togglePasswordVisibility('showPassword'));
        },
        handleClickToggleRepeatPassword() {
            dispatch(passwordResetActions.togglePasswordVisibility('showRepeatPassword'));
        },
        handleChange({target}) {
            const {name, value} = target;
            dispatch(passwordResetActions.setResetPasswordInputValue({name, value}));
        },
        handleFocus(event) {
            dispatch(passwordResetActions.onFocusPasswordResetField(event.target.name));
        },
    };
};

export default NoAuth(withRouter(connect(mapStateToProps, mapDispatchToProps)(PasswordReset)));