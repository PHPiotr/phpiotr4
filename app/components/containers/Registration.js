import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import * as authActions from '../../actions/auth/authActions';
import {ON_FOCUS_REGISTRATION_FIELD, ON_CHANGE_REGISTRATION_FIELD} from '../../actions/auth/authActionTypes';
import RegistrationForm from '../presentation/RegistrationForm';
import MessageBar from '../presentation/MessageBar';
import {LinearProgress} from 'material-ui/Progress';
import NoAuth from './NoAuth';

class Registration extends Component {
    onClose = () => {
        if (this.props.auth.registrationErrorMessage) {
            this.props.onCloseErrorMessageBar();
        }
        if (this.props.auth.registrationSuccessMessage) {
            this.props.onCloseSuccessMessageBar();
        }
    };
    componentDidMount() {
        this.props.activateUserIfNeeded();
    }
    render() {
        if (this.props.auth.isRegistering) {
            return <LinearProgress/>;
        }
        return (
            <Fragment>
                <RegistrationForm {...this.props} />
                <MessageBar
                    open={!!(this.props.auth.registrationErrorMessage || this.props.auth.registrationSuccessMessage)}
                    message={this.props.auth.registrationErrorMessage || this.props.auth.registrationSuccessMessage}
                    onClose={this.onClose}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({auth: state.auth});
const mapDispatchToProps = (dispatch, {match: {params}, history}) => ({
    activateUserIfNeeded() {
        const {bearerToken, userId} = params;
        if (bearerToken && userId) {
            dispatch(authActions.activateIfNeeded(userId, bearerToken))
                .then(() => history.replace('/login'));
        } else {
            dispatch(authActions.setActivationData());
        }
    },
    handleFocus(event) {
        const {name, value} = event.target;
        dispatch(authActions.focus(name, value, ON_FOCUS_REGISTRATION_FIELD));
    },
    handleChange(event) {
        const {name, value} = event.target;
        dispatch(authActions.change(name, value, ON_CHANGE_REGISTRATION_FIELD));
    },
    handleSubmit(event) {
        event.preventDefault();
        dispatch(authActions.registerIfNeeded());
    },
    onCloseErrorMessageBar() {
        authActions.setRegistrationErrorMessage('');
    },
    onCloseSuccessMessageBar() {
        authActions.setRegistrationSuccessMessage('');
    },
});

export default NoAuth(connect(mapStateToProps, mapDispatchToProps)(Registration));

