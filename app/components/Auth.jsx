import React, {Component} from 'react';

class Auth extends Component {

    constructor(props) {
        super(props);
        this.props.callbacks.handleVerify();
    }

    render() {
        return null;
    };
}

export default Auth;

