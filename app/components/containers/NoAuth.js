import React, {Component} from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import {connect} from 'react-redux';
import cookie from 'cookie-monster';
import jwtDecode from 'jwt-decode';

function noAuth(WrappedComponent) {
    class NoAuth extends Component {

        verify(token) {
            const {exp} = jwtDecode(token);
            const expiration = exp * 1000;
            const now = (new Date()).getTime();
            if (expiration > now) {
                throw Error;
            }
        }

        componentWillMount() {
            const {verify, props: {token}} = this;
            if (token) {
                return verify(token);
            }
            try {
                const tokenFromCookie = cookie.getItem(process.env.TOKEN_KEY);
                if (tokenFromCookie) {
                    verify(tokenFromCookie);
                    cookie.clear();
                }
            } catch (e) {
                this.props.history.replace('/');
            }
        }

        render() {
            if (this.props.isLoggedIn) {
                return null;
            }
            return <WrappedComponent {...this.props} />;
        }
    }

    NoAuth.displayName = `NoAuth(${getDisplayName(WrappedComponent)})`;
    hoistNonReactStatic(NoAuth, WrappedComponent);

    return connect(({auth: {isLoggedIn, token}}) => ({isLoggedIn, token}))(NoAuth);
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default noAuth;

