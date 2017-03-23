import React, {Component} from 'react';

function Auth(WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.props.callbacks.handleVerify();
        }

        render() {
            if (!this.props.callbacks.handleIsLoggedIn()) {
                return null;
            }
            return <WrappedComponent {...this.props} />;
        }
    };
}

export default Auth

