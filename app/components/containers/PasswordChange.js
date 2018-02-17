import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Auth from './Auth';
import {setAppBarTitle} from '../../actions/app/appActions';
import MessageBar from '../presentation/MessageBar';
import * as passwordChangeActions from '../../actions/passwordChange/passwordChangeActions';
import {LinearProgress} from 'material-ui/Progress';
import PasswordChangeForm from '../presentation/PasswordChangeForm';
import jwtDecode from 'jwt-decode';

class PasswordChange extends Component {

    componentDidMount() {
        this.props.setAppBarTitle('Password change');
    }

    componentWillUnmount() {
        this.props.setAppBarTitle(null);
    }

    render() {
        if (!this.props.isLoggedIn) {
            return null;
        }
        if (this.props.isChangingPassword) {
            return <LinearProgress/>;
        }

        return (
            <Fragment>
                <PasswordChangeForm {...this.props}/>
                <MessageBar
                    open={this.props.isChangedPassword}
                    message="New password set successfully"
                    onClose={this.props.onSuccessClose}
                />
                <MessageBar
                    open={!!this.props.passwordChangeErrorMessage}
                    message={this.props.passwordChangeErrorMessage}
                    onClose={this.props.onErrorClose}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = ({auth: {isLoggedIn, token}, passwordChange}) => ({...passwordChange, isLoggedIn, token});
const mapDispatchToProps = (dispatch) => {
    return {
        handleSubmit(event, token) {
            event.preventDefault();
            const {sub} = jwtDecode(token);
            dispatch(passwordChangeActions.changePasswordIfNeeded(sub));
        },
        setAppBarTitle(title) {
            dispatch(setAppBarTitle(title));
        },
        onSuccessClose() {
            dispatch(passwordChangeActions.setIsChangePassword(false));
        },
        onErrorClose() {
            dispatch(passwordChangeActions.setChangePasswordErrorMessage(''));
        },
        handleClickToggleCurrentPassword() {
            dispatch(passwordChangeActions.togglePasswordChangeVisibility('showCurrentPassword'));
        },
        handleClickToggleNewPassword() {
            dispatch(passwordChangeActions.togglePasswordChangeVisibility('showPassword'));
        },
        handleClickToggleRepeatNewPassword() {
            dispatch(passwordChangeActions.togglePasswordChangeVisibility('showRepeatPassword'));
        },
        handleChange({target}) {
            const {name, value} = target;
            dispatch(passwordChangeActions.setChangePasswordInputValue({name, value}));
        },
        handleFocus(event) {
            dispatch(passwordChangeActions.onFocusPasswordChangeField(event.target.name));
        },
    };
};

export default Auth(withRouter(connect(mapStateToProps, mapDispatchToProps)(PasswordChange)));