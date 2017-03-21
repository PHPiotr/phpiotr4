import React, { Component } from 'react';

class Logout extends Component {

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

