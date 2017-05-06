import React from 'react';
import {connect} from 'react-redux';
import {onChangeLoginField, onFocusLoginField, loginIfNeeded} from '../../actions';
import LoginForm from '../presentation/LoginForm';
import getHeaders from '../../getHeaders';

const Login = (props) => {
    return (
        <LoginForm {...props} />
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    socket: state.socket,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    handleFocus(event) {
        dispatch(onFocusLoginField(event.target.name, event.target.value));
    },
    handleChange(event) {
        dispatch(onChangeLoginField(event.target.name, event.target.value));
    },
    handleSubmit(event) {
        dispatch(loginIfNeeded(event, ownProps.socket, ownProps.auth.login, getHeaders()));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

