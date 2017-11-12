import React from 'react';
import {connect} from 'react-redux';
import {
    registerIfNeeded,
    change,
    focus,
    ON_CHANGE_REGISTRATION_FIELD,
    ON_FOCUS_REGISTRATION_FIELD,
} from '../../actions/login';
import RegistrationForm from '../presentation/RegistrationForm';
import {LinearProgress} from 'material-ui/Progress';

const Registration = props => props.auth.isRegistering ? <LinearProgress/> : <RegistrationForm {...props} />;

const mapStateToProps = state => ({auth: state.auth});
const mapDispatchToProps = dispatch => ({
    handleFocus(event) {
        dispatch(focus(event.target.name, event.target.value, ON_FOCUS_REGISTRATION_FIELD));
    },
    handleChange(event) {
        dispatch(change(event.target.name, event.target.value, ON_CHANGE_REGISTRATION_FIELD));
    },
    handleSubmit(event) {
        event.preventDefault();
        dispatch(registerIfNeeded());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);

