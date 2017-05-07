import React, {Component} from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import {connect} from 'react-redux';
import {verifyIfNeeded, VERIFY_SUCCESS, setLoggedIn, setLoggedOut} from '../../actions';
import getHeaders from '../../getHeaders';

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

    const mapStateToProps = (state) => ({
        isLoggedIn: state.auth.isLoggedIn
    });

    const mapDispatchToProps = (dispatch, ownProps) => ({
        verify() {
            dispatch(verifyIfNeeded(getHeaders())).then((json) => {
                if (json === undefined || json.type === undefined || json.type !== VERIFY_SUCCESS) {
                    dispatch(setLoggedOut());
                    return ownProps.router.push('/login');
                }
                if (!ownProps.auth.isLoggedIn) {
                    dispatch(setLoggedIn());
                }
            });
        }
    });

    return connect(mapStateToProps, mapDispatchToProps)(Auth);
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default auth;

