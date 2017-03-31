import React, { Component, PropTypes } from 'react';
import InputGroup from '../helper/InputGroup.jsx';
import ButtonGroup from '../helper/ButtonGroup.jsx';

class Register extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }

    handleSubmit(event) {
        this.props.callbacks.handleLogin(event);
    }

    handleChange(event) {
        this.props.callbacks.handleChange(event, 'login');
    }

    handleFocus(event) {
        this.props.callbacks.handleFocus(event, 'login');
    }

    render() {
        // TODO: Register user
        return null;
    }
}

export default Register;

