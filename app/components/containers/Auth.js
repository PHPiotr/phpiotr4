import React, {Component} from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import {connect} from 'react-redux';

function auth(WrappedComponent) {
    class Auth extends Component {

        componentWillMount() {
            this.props.verify();
        }

        render() {
            if (!this.props.isLoggedIn) {
                return null;
            }
            return <WrappedComponent {...this.props} />;
        }
    }

    Auth.displayName = `Auth(${getDisplayName(WrappedComponent)})`;
    hoistNonReactStatic(Auth, WrappedComponent);

    const mapStateToProps = ({auth: {isLoggedIn, token}}) => ({
        isLoggedIn, token,
    });

    const mapDispatchToProps = () => ({
        verify() {
            // dispatch(verifyIfNeeded(getHeaders())).then((json) => {
            //     if (json === undefined) {
            //         return ownProps.history.push('/login');
            //     }
            //     if (json.type === undefined) {
            //         return ownProps.history.push('/login');
            //     }
            //     if (json.type !== VERIFY_SUCCESS) {
            //         return ownProps.history.push('/login');
            //     }
            // });
        },
    });

    return connect(mapStateToProps, mapDispatchToProps)(Auth);
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default auth;

