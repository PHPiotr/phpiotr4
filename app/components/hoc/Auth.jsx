import React, {Component} from 'react';

function Auth(WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.props.callbacks.handleVerify();
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
}

export default Auth

