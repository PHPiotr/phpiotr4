import React from 'react';
import Auth from './Auth.jsx';

class Logout extends Auth {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.callbacks.handleLogout();
    }

    render() {
        return null;
    };
}

export default Logout;

