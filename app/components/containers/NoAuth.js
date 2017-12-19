import React, {Component} from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import {connect} from 'react-redux';
import jwtDecode from 'jwt-decode';
import {withCookies, Cookies} from 'react-cookie';

function noAuth(WrappedComponent) {
    class NoAuth extends Component {
        static displayName = `NoAuth(${getDisplayName(WrappedComponent)})`;
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
                try {
                    return verify(token);
                } catch (e) {
                    this.props.history.replace('/');
                }

            }
            try {
                const cookies = new Cookies();
                const tokenFromCookie = cookies.get(process.env.TOKEN_KEY) || '';
                if (tokenFromCookie) {
                    verify(tokenFromCookie);
                    cookies.remove(process.env.TOKEN_KEY, {path: '/'});
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

    hoistNonReactStatic(NoAuth, WrappedComponent);

    return withCookies(connect(({auth: {isLoggedIn, token}}) => ({isLoggedIn, token}))(NoAuth));
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default noAuth;

