import React, {Component} from 'react';
import {connect} from 'react-redux';
import {focus, change, registerIfNeeded, activateIfNeeded, setActivationData} from '../../actions/auth/authActions';
import {ON_FOCUS_REGISTRATION_FIELD, ON_CHANGE_REGISTRATION_FIELD} from '../../actions/auth/authActionTypes';
import RegistrationForm from '../presentation/RegistrationForm';
import {LinearProgress} from 'material-ui/Progress';
import NoAuth from './NoAuth';

class Registration extends Component {
    componentDidMount() {
        this.props.activateUserIfNeeded();
    }
    render() {
        if (this.props.auth.isRegistering) {
            return <LinearProgress/>;
        }
        return <RegistrationForm {...this.props} />;
    }
}

const mapStateToProps = state => ({auth: state.auth});
const mapDispatchToProps = (dispatch, {match: {params}, history}) => ({
    activateUserIfNeeded() {
        const {bearerToken, userId} = params;
        if (bearerToken && userId) {
            dispatch(activateIfNeeded(userId, bearerToken))
                .then(() => history.replace('/login'));
        } else {
            dispatch(setActivationData());
        }
    },
    handleFocus(event) {
        const {name, value} = event.target;
        dispatch(focus(name, value, ON_FOCUS_REGISTRATION_FIELD));
    },
    handleChange(event) {
        const {name, value} = event.target;
        dispatch(change(name, value, ON_CHANGE_REGISTRATION_FIELD));
    },
    handleSubmit(event) {
        event.preventDefault();
        dispatch(registerIfNeeded());
    },
});

export default NoAuth(connect(mapStateToProps, mapDispatchToProps)(Registration));

