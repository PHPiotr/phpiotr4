import React, {Component, Fragment} from 'react';
import NoAuth from './NoAuth';

class PasswordReset extends Component {
    render() {
        return <Fragment>Hello world</Fragment>;
    }
}

export default NoAuth(PasswordReset);