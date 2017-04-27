import React, {Component, PropTypes} from 'react';
import io from 'socket.io-client';
import 'whatwg-fetch';
import 'babel-polyfill';
import config from '../config';
import cookie from 'cookie-monster';
import { connect } from 'react-redux';
import * as action from './actionCreators';

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

    getHeaders() {
        let currentCookie = cookie.getItem(config.token_key);
        if (!currentCookie) {
            delete config.api_headers['Authorization'];
        } else {
            config.api_headers['Authorization'] = `Bearer ${currentCookie}`;
        }
        return config.api_headers;
    }

    handleVerify() {
        let headers = this.getHeaders();
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

    handleReport() {
        let headers = this.getHeaders();
        let oldReport = this.props.report;
        fetch(`${config.api_url}/api/v1/report?from=${this.props.dateFilter.fromDate}&to=${this.props.dateFilter.toDate}`, {headers: headers})
            .then((response) => response.json())
            .then((responseData) => {
                this.props.dispatch(action.getReport(responseData));
            })
            .catch((error) => {
                this.props.dispatch(action.getReport(oldReport));
            });
    }

    handleList(bookings, type, page) {
        let headers = this.getHeaders();
        fetch(`${config.api_url}/api/v1/bookings/${bookings}?type=${type}&page=${page || 1}`, {headers: headers})
            .then((response) => response.json())
            .then((responseData) => {
                this.props.dispatch(action.setBookings(bookings, responseData));
            })
            .catch((error) => {
                console.log('Error fetching and parsing data', error);
            });
    }

    handleChange(event, bookingLabelSingular) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if (bookingLabelSingular == 'login') {
            this.props.dispatch(action.onChangeLoginField(name, value));
            return;
        }
        this.props.dispatch(action.setBooking(bookingLabelSingular, name, value));
    }

    handleFocus(event, bookingLabelSingular) {
        if (bookingLabelSingular == 'login') {
            this.props.dispatch(action.onFocusLoginField(event.target.name));
            return;
        }
        this.props.dispatch(action.setBookingErrorMessage(bookingLabelSingular, ''));
        this.props.dispatch(action.setBookingInputError(bookingLabelSingular, undefined, event.target.name));
    }

    handleAdd(event, bookingLabelSingular, bookingLabelPlural) {

        let headers = this.getHeaders();
        const that = this;

        fetch(`${config.api_url}/api/v1/bookings/${bookingLabelPlural}`, {
            method: 'post',
            headers: headers,
            body: JSON.stringify(that.props.bookings[bookingLabelSingular])
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
                    that.props.dispatch(action.setBookingInserted(bookingLabelSingular, data[bookingLabelSingular]));
                    setTimeout(function () {
                        that.props.dispatch(action.setBookingInserted(bookingLabelSingular, {}));
                    }, 5000);
                } else {
                    if (data.err) {
                        this.props.dispatch(action.setBookingErrorMessage(bookingLabelSingular, data.err.message));
                        this.props.dispatch(action.setBookingErrors(bookingLabelSingular, data.err.errors));
                    }
                }
            })
            .catch((error) => {

            });

        event.preventDefault();
    }

    handleIsDateFilterEnabled(isDateFilterEnabled) {
        this.props.dispatch(action.toggleDateFilterEnabled(isDateFilterEnabled));
    }

    handleFocusDate(event) {
        const fieldType = `${event.target.name}DateFieldType`;
        if (this.props.dateFilter[fieldType] === 'date') {
            return;
        }

        this.props.dispatch(action.setDateType(fieldType, 'date'));
    }

    handleSubmitDate(event) {
        if (!this.props.dateFilter.isDateFilterEnabled) {
            return;
        }
        this.handleReport();
        event.preventDefault();
    }

    handleChangeDate(event) {
        this.props.dispatch(action.setDate(`${event.target.name}Date`, event.target.value));
    }

    handleBlurDate(event) {
        const target = event.target;

        if (target.value) {
            return;
        }

        const fieldType = `${target.name}DateFieldType`;

        if (this.props.dateFilter[fieldType] === 'text') {
            return;
        }

        this.props.dispatch(action.setDateType(fieldType, 'text'));
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

    formatPrice(input) {
        let stringInput = '' + input;
        let dotIndex = stringInput.indexOf('.');
        if (-1 === dotIndex) {
            return stringInput + '.00';
        }
        let afterDot = stringInput.substring(dotIndex + 1);
        let afterDotLength = afterDot.length;
        if (1 === afterDotLength) {
            return stringInput + '0';
        }
        return stringInput;
    }

    render() {
        return this.props.children && React.cloneElement(this.props.children, {
                callbacks: {
                    formatPrice: this.formatPrice.bind(this),
                    handleChange: this.handleChange.bind(this),
                    handleFocus: this.handleFocus.bind(this),
                    handleAdd: this.handleAdd.bind(this),
                    handleList: this.handleList.bind(this),
                    handleLogin: this.handleLogin.bind(this),
                    handleLogout: this.handleLogout.bind(this),
                    handleIsLoggedIn: this.handleIsLoggedIn.bind(this),
                    handleVerify: this.handleVerify.bind(this),
                    handleReport: this.handleReport.bind(this),
                    handleIsDateFilterEnabled: this.handleIsDateFilterEnabled.bind(this),
                    handleFocusDate: this.handleFocusDate.bind(this),
                    handleChangeDate: this.handleChangeDate.bind(this),
                    handleSubmitDate: this.handleSubmitDate.bind(this),
                    handleBlurDate: this.handleBlurDate.bind(this),
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

