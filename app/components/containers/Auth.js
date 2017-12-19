import React, {Component} from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import {connect} from 'react-redux';
import {withCookies, Cookies} from 'react-cookie';
import jwtDecode from 'jwt-decode';
import {setToken, setIsLoggedIn} from '../../actions/auth/authActions';

function auth(WrappedComponent) {
    class Auth extends Component {
        static displayName = `Auth(${getDisplayName(WrappedComponent)})`;
        verify(token) {
            const {exp} = jwtDecode(token);
            if (!exp) {
                throw Error;
            }
            const expiration = exp * 1000;
            const now = (new Date()).getTime();
            if (expiration < now) {
                throw Error;
            }
            return true;
        }

        componentWillMount() {
            const {verify} = this;
            const {token, isLoggedIn, setToken, setLoggedIn} = this.props;
            try {
                if (token) {
                    return verify(token);
                }
                const cookies = new Cookies();
                const tokenFromCookie = cookies.get(process.env.TOKEN_KEY);
                if (!tokenFromCookie) {
                    throw Error;
                }
                verify(tokenFromCookie);
                setToken(tokenFromCookie);
                if (!isLoggedIn) {
                    setLoggedIn();
                }
            } catch (e) {
                this.props.history.replace('/logout');
            }
        }

        render() {
            if (!this.props.isLoggedIn) {
                return null;
            }
            return <WrappedComponent {...this.props} />;
        }
    }

    hoistNonReactStatic(Auth, WrappedComponent);

    const mapStateToProps = ({auth: {isLoggedIn, token}}) => ({isLoggedIn, token});
    const mapDispatchToProps = dispatch => ({
        setToken(token) {
            dispatch(setToken(token));
        },
        setLoggedIn() {
            dispatch(setIsLoggedIn(true));
        },
    });

    return withCookies(connect(mapStateToProps, mapDispatchToProps)(Auth));
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default auth;

