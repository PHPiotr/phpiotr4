import React, {Component} from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import {connect} from 'react-redux';
import {ensureIsLoggedIn} from '../../utils/authUtil';

function auth(WrappedComponent) {
    class Auth extends Component {

        componentWillMount() {
            const {verify, token, isLoggedIn} = this.props;
            verify(token, isLoggedIn);
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

    const mapStateToProps = ({auth: {isLoggedIn, token}}) => ({isLoggedIn, token});
    const mapDispatchToProps = (dispatch, {history}) => ({
        verify(tokenFromStore, isLoggedIn) {
            ensureIsLoggedIn(tokenFromStore, isLoggedIn, dispatch, history);
        },
    });

    return connect(mapStateToProps, mapDispatchToProps)(Auth);
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default auth;

