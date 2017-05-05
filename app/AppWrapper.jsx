import React, {Component, PropTypes} from 'react';
import io from 'socket.io-client';
import fetch from 'isomorphic-fetch';
import 'babel-polyfill';
import config from '../config';
import cookie from 'cookie-monster';
import { connect } from 'react-redux';
import * as action from './actions';
import getHeaders from './getHeaders';

const socket = io.connect(config.api_url);

class AppWrapper extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let that = this;

        let tokenCookie = cookie.getItem(config.token_key);
        if (undefined !== tokenCookie) {
            config.api_headers['Authorization'] = `Bearer ${tokenCookie}`;
            that.props.dispatch(action.setLoggedIn());
        }
        socket.on(config.event.token_received, function (token) {
            config.api_headers['Authorization'] = `Bearer ${token}`;
            let now = new Date();
            let time = now.getTime();
            let expireTime = time + 1000 * config.token_expires_in;
            now.setTime(expireTime);
            cookie.setItem(config.token_key, token, {expires: now.toGMTString()});
            that.props.dispatch(action.setLoggedIn());
            that.props.router.push('/');
        });

        socket.on(config.event.auth_failed, function () {
            that.props.dispatch(action.setLoggedOut());
            delete config.api_headers['Authorization'];
            cookie.removeItem(config.token_key);
            that.props.router.push('/login');
        });
    }

    handleVerify() {
        let headers = getHeaders();
        fetch(`${config.api_url}/api/v1/auth/verify`, {
            headers: headers
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log('handleVerify: ', responseData);
            })
            .catch((error) => {
                console.log('Not verified', error);
            });
    }

    handleChange(event, bookingLabelSingular) {
        this.props.dispatch(action.handleChange(event, bookingLabelSingular))
    }

    handleFocus(event, bookingLabelSingular) {
        this.props.dispatch(action.handleFocus(event, bookingLabelSingular))
    }

    handleLogin(event) {

        if (this.props.auth.isLoggedIn) {
            return this.props.router.push('/');
        }

        const login = this.props.auth.login;

        fetch(`${config.api_url}/api/v1/auth/login`, {
            method: 'post',
            headers: config.api_headers,
            body: JSON.stringify(login)
        })
            .then((response) => {
                if (!response.ok) {
                    if (response.code != 406) {
                        throw new Error('Response was not ok');
                    }
                }
                return response.json();
            })
            .then((data) => {
                if (data.ok) {
                    this.props.dispatch(action.setLoggedIn());
                } else {
                    if (data.errors) {
                        this.props.dispatch(action.setLoginFailed(data.message, data.errors));
                    }
                }
            })
            .catch((error) => {
                socket.emit(config.event.auth_failed);
            });

        event.preventDefault();
    }

    handleIsLoggedIn() {
        return this.props.auth.isLoggedIn;
    }

    handleLogout() {
        this.props.dispatch(action.setLoggedOut());
        delete config.api_headers['Authorization'];
        cookie.removeItem(config.token_key);
        this.props.router.push('/login');
    }

    render() {
        return this.props.children && React.cloneElement(this.props.children, {
                callbacks: {
                    handleChange: this.handleChange.bind(this),
                    handleFocus: this.handleFocus.bind(this),
                    handleLogin: this.handleLogin.bind(this),
                    handleLogout: this.handleLogout.bind(this),
                    handleIsLoggedIn: this.handleIsLoggedIn.bind(this),
                    handleVerify: this.handleVerify.bind(this),
                },
                report: this.props.report,
                dateFilter: this.props.dateFilter,
                auth: this.props.auth,
                bookings: this.props.bookings,
                socket: socket,
            });
    }
}

AppWrapper.displayName = 'AppWrapper';

const mapStateToProps = (state) => ({
    report: state.report,
    dateFilter: state.dateFilter,
    auth: state.auth,
    bookings: state.bookings,
    auth: state.auth,
});

AppWrapper = connect(mapStateToProps)(AppWrapper);

export default AppWrapper;

