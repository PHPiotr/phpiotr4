import React, {Component} from 'react';
import {connect} from 'react-redux';
import {focus, change, registerIfNeeded, activateIfNeeded} from '../../actions/auth/authActions';
import {ON_FOCUS_REGISTRATION_FIELD, ON_CHANGE_REGISTRATION_FIELD} from '../../actions/auth/authActionTypes';
import RegistrationForm from '../presentation/RegistrationForm';
import {LinearProgress} from 'material-ui/Progress';

class Registration extends Component {
    componentDidMount() {
        this.props.activateUserIfNeeded();
    }
    render() {
        if (this.props.isRegistering) {
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
            activateIfNeeded(userId, bearerToken)
                .then(() => history.replace('/login'));
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

export default connect(mapStateToProps, mapDispatchToProps)(Registration);

