import React, {Component} from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import {connect} from 'react-redux';
import {logoutIfNeeded, setToken, setIsLoggedIn} from '../../actions/login';
import cookie from 'cookie-monster';
import jwtDecode from 'jwt-decode';

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
            let token = tokenFromStore;
            if (!tokenFromStore) {
                const tokenFromCookie = cookie.getItem(process.env.TOKEN_KEY);
                if (!tokenFromCookie) {
                    return dispatch(logoutIfNeeded()).then(() => history.push('/login'));
                }
                dispatch(setToken(tokenFromCookie));
                token = tokenFromCookie;
            }
            const {exp} = jwtDecode(token);
            const expiration = exp * 1000;
            const now = (new Date()).getTime();
            if (expiration < now) {
                return dispatch(logoutIfNeeded()).then(() => history.push('/login'));
            }

            if (!isLoggedIn) {
                dispatch(setIsLoggedIn(true));
            }
        },
    });

    return connect(mapStateToProps, mapDispatchToProps)(Auth);
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default auth;

