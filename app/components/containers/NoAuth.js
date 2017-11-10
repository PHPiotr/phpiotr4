import React, {Component} from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import {connect} from 'react-redux';
import {ensureIsNotLoggedIn} from '../../utils/authUtil';

function noAuth(WrappedComponent) {
    class Auth extends Component {

        componentWillMount() {
            const {verify, token} = this.props;
            verify(token);
        }

        render() {
            if (this.props.isLoggedIn) {
                return null;
            }
            return <WrappedComponent {...this.props} />;
        }
    }

    Auth.displayName = `NoAuth(${getDisplayName(WrappedComponent)})`;
    hoistNonReactStatic(Auth, WrappedComponent);

    const mapStateToProps = ({auth: {isLoggedIn, token}}) => ({isLoggedIn, token});
    const mapDispatchToProps = (dispatch, {history}) => ({
        verify(tokenFromStore) {
            ensureIsNotLoggedIn(tokenFromStore, history);
        },
    });

    return connect(mapStateToProps, mapDispatchToProps)(Auth);
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default noAuth;

