import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import * as registrationActions from '../../actions/registration/registrationActions';
import * as activationActions from '../../actions/activation/activationActions';
import RegistrationForm from '../presentation/RegistrationForm';
import MessageBar from '../presentation/MessageBar';
import {LinearProgress} from 'material-ui/Progress';
import NoAuth from './NoAuth';
import {setAppBarTitle} from '../../actions/app/appActions';

class Registration extends Component {
    onClose = () => {
        if (this.props.registrationErrorMessage) {
            this.props.onCloseErrorMessageBar();
        }
        if (this.props.registrationSuccessMessage) {
            this.props.onCloseSuccessMessageBar();
        }
    };
    componentDidMount() {
        this.props.activateUserIfNeeded();
        this.props.dispatch(setAppBarTitle('Sign up'));
    }
    render() {
        if (this.props.isRegistering) {
            return <LinearProgress/>;
        }
        return (
            <Fragment>
                <RegistrationForm {...this.props} />
                <MessageBar
                    open={!!(this.props.registrationErrorMessage || this.props.registrationSuccessMessage)}
                    message={this.props.registrationErrorMessage || this.props.registrationSuccessMessage}
                    onClose={this.onClose}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({...state.auth, ...state.registration, ...state.activation});
const mapDispatchToProps = (dispatch, {match: {params}, history}) => ({
    activateUserIfNeeded() {
        const {bearerToken, userId} = params;
        if (bearerToken && userId) {
            dispatch(activationActions.activateIfNeeded(userId, bearerToken))
                .then(() => history.replace('/login'));
        } else {
            dispatch(activationActions.setActivationData());
        }
    },
    handleFocus(event) {
        const {name, value} = event.target;
        dispatch(registrationActions.focus(name, value));
    },
    handleChange(event) {
        const {name, value} = event.target;
        dispatch(registrationActions.change(name, value));
    },
    handleSubmit(event) {
        event.preventDefault();
        dispatch(registrationActions.registerIfNeeded());
    },
    onCloseErrorMessageBar() {
        dispatch(registrationActions.setRegistrationErrorMessage(''));
    },
    onCloseSuccessMessageBar() {
        dispatch(registrationActions.setRegistrationSuccessMessage(''));
    },
    handleClickTogglePassword() {
        dispatch(registrationActions.toggleRegistrationPasswordVisibility());
    },
    handleClickToggleRepeatPassword() {
        dispatch(registrationActions.toggleRegistrationRepeatPasswordVisibility());
    },
});

export default NoAuth(connect(mapStateToProps, mapDispatchToProps)(Registration));

