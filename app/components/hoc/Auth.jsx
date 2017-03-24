import React, {Component} from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

function auth(WrappedComponent) {
    class Auth extends Component {
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
    }

    Auth.displayName = `Auth(${getDisplayName(WrappedComponent)})`;
    hoistNonReactStatic(Auth, WrappedComponent);

    return Auth;
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default auth

