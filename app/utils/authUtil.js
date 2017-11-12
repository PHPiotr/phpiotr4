import cookie from 'cookie-monster';
import {logoutIfNeeded, setToken, setIsLoggedIn} from '../actions/login';
import jwtDecode from 'jwt-decode';

export const ensureIsLoggedIn = (tokenFromStore, isLoggedIn, dispatch, history) => {
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
};

export const ensureIsNotLoggedIn = (tokenFromStore, history) => {
    if (tokenFromStore) {
        return history.replace('/');
    }
    if (cookie.getItem(process.env.TOKEN_KEY)) {
        return history.replace('/');
    }
};