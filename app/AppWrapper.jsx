import React, {Component, PropTypes} from 'react';
import update from 'react-addons-update';
import io from 'socket.io-client';
import 'whatwg-fetch';
import 'babel-polyfill';
import config from '../config';
import cookie from 'cookie-monster';

const socket = io.connect(config.api_url);

class AppWrapper extends Component {

    constructor(props) {
        super(props);
        this.state = {
            planes: {},
            plane: {},
            planeErrorMessage: '',
            planeErrors: {},
            planeInserted: {},
            buses: {},
            bus: {},
            busErrorMessage: '',
            busErrors: {},
            busInserted: {},
            trains: {},
            train: {},
            trainErrorMessage: '',
            trainErrors: {},
            trainInserted: {},
            hostels: {},
            hostel: {},
            hostelErrorMessage: '',
            hostelInserted: {},
            hostelErrors: {},
        };
    }

    componentDidMount() {
        let that = this;
        let tokenCookie = cookie.getItem(config.token_key);
        if (undefined !== tokenCookie) {
            config.api_headers['Authorization'] = `Bearer ${tokenCookie}`;
            that.context.store.dispatch({
                type: 'SET_LOGGED_IN'
            });
        }
        socket.on(config.event.token_received, function (token) {
            config.api_headers['Authorization'] = `Bearer ${token}`;
            let now = new Date();
            let time = now.getTime();
            let expireTime = time + 1000 * config.token_expires_in;
            now.setTime(expireTime);
            cookie.setItem(config.token_key, token, {expires: now.toGMTString()});
            that.context.store.dispatch({
                type: 'SET_LOGGED_IN'
            });
            that.context.router.push('/');
        });

        socket.on(config.event.auth_failed, function () {
            that.context.store.dispatch({
                type: 'SET_LOGGED_OUT'
            });
            delete config.api_headers['Authorization'];
            cookie.removeItem(config.token_key);
            that.context.router.push('/login');
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
        fetch(`${config.api_url}/auth/verify`, {
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
        let oldReport = this.context.store.getState().report;
        fetch(`${config.api_url}/report?from=${this.context.store.getState().dateFilter.fromDate}&to=${this.context.store.getState().dateFilter.toDate}`, {headers: headers})
            .then((response) => response.json())
            .then((responseData) => {
                this.context.store.dispatch({
                    type: 'GET_REPORT',
                    data: responseData,
                });
            })
            .catch((error) => {
                this.context.store.dispatch({
                    type: 'GET_REPORT',
                    data: oldReport,
                });
            });
    }

    handleList(bookings, type, page) {
        let headers = this.getHeaders();
        fetch(`${config.api_url}/bookings/${bookings}?type=${type}&page=${page || 1}`, {headers: headers})
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({[bookings]: responseData});
            })
            .catch((error) => {
                console.log('Error fetching and parsing data', error);
            });
    }

    handleChange(event, type) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if (type == 'login') {
            this.context.store.dispatch({
                type: 'ON_CHANGE_LOGIN_FIELD',
                fieldName: name,
                fieldValue: value,
            });
            return;
        }
        let booking = update(this.state[type], {[name]: {$set: value}});
        this.setState({
            [type]: booking
        });
    }

    handleFocus(event, type) {
        const name = event.target.name;
        const typeErrors = type + 'Errors';
        const typeErrorMessage = type + 'ErrorMessage';

        if (type == 'login') {
            this.context.store.dispatch({
                type: 'ON_FOCUS_LOGIN_FIELD',
                fieldName: event.target.name
            });
            return;
        }
        if (this.state[typeErrorMessage]) {
            this.setState({
                [typeErrorMessage]: ''
            });
        }
        if (undefined === this.state[typeErrors][name]) {
            return;
        }
        let errors = Object.assign({}, this.state[typeErrors]);
        errors[name] = undefined;

        this.setState({
            [typeErrors]: errors
        });
    }

    handleIsDateFilterEnabled(isDateFilterEnabled) {
        this.context.store.dispatch({
            type: 'TOGGLE_DATE_FILTER_ENABLED',
            isDateFilterEnabled: isDateFilterEnabled,
        });
    }

    handleFocusDate(event) {
        const fieldType = `${event.target.name}DateFieldType`;
        if (this.context.store.getState().dateFilter[fieldType] === 'date') {
            return;
        }

        this.context.store.dispatch({
            type: 'SET_DATE_TYPE',
            dateTypeName: fieldType,
            dateTypeValue: 'date',
        });
    }

    handleSubmitDate(event) {
        if (!this.context.store.getState().dateFilter.isDateFilterEnabled) {
            return;
        }
        this.handleReport();
        event.preventDefault();
    }

    handleChangeDate(event) {
        this.context.store.dispatch({
            type: 'SET_DATE',
            dateFieldName: `${event.target.name}Date`,
            dateFieldValue: event.target.value,
        });
    }

    handleBlurDate(event) {
        const target = event.target;

        if (target.value) {
            return;
        }

        const fieldType = `${target.name}DateFieldType`;

        if (this.context.store.getState().dateFilter[fieldType] === 'text') {
            return;
        }

        this.context.store.dispatch({
            type: 'SET_DATE_TYPE',
            dateTypeName: fieldType,
            dateTypeValue: 'text',
        });
    }

    handleAdd(event, type, types) {

        let bookings = this.state[types];
        let booking = this.state[type];
        let headers = this.getHeaders();

        const typeErrors = type + 'Errors';
        const typeErrorMessage = type + 'ErrorMessage';
        const typeInserted = type + 'Inserted';

        fetch(`${config.api_url}/bookings/${types}`, {
            method: 'post',
            headers: headers,
            body: JSON.stringify(booking)
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
                let that = this;
                if (data.ok) {
                    this.setState({
                        [type]: {},
                        [typeErrors]: {},
                        [typeErrorMessage]: '',
                        [typeInserted]: data[type]
                    });
                    setTimeout(function () {
                        that.setState({
                            [typeInserted]: {}
                        });
                    }, 5000);
                } else {
                    if (data.err) {
                        this.setState({
                            [typeErrorMessage]: data.err.message,
                            [typeErrors]: data.err.errors
                        });
                    }
                }
            })
            .catch((error) => {

            });

        event.preventDefault();
    }

    handleLogin(event) {

        if (this.context.store.getState().auth.isLoggedIn) {
            return this.context.router.push('/');
        }

        const login = this.context.store.getState().auth.login;

        fetch(`${config.api_url}/auth/login`, {
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
                    this.context.store.dispatch({
                        type: 'SET_LOGGED_IN'
                    });
                } else {
                    if (data.errors) {
                        this.context.store.dispatch({
                            type: 'SET_LOGIN_FAILED',
                            loginErrorMessage: data.message,
                            loginErrors: data.errors,
                        });
                    }
                }
            })
            .catch((error) => {
                socket.emit(config.event.auth_failed);
            });

        event.preventDefault();
    }

    handleIsLoggedIn() {
        return this.context.store.getState().auth.isLoggedIn;
    }

    handleLogout() {
        this.context.store.dispatch({
            type: 'SET_LOGGED_OUT'
        });
        delete config.api_headers['Authorization'];
        cookie.removeItem(config.token_key);
        this.context.router.push('/login');
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
                report: this.context.store.getState().report,
                dateFilter: this.context.store.getState().dateFilter,
                auth: this.context.store.getState().auth,
                socket: socket,
                planes: this.state.planes,
                plane: this.state.plane,
                planeErrors: this.state.planeErrors,
                planeErrorMessage: this.state.planeErrorMessage,
                planeInserted: this.state.planeInserted,
                buses: this.state.buses,
                bus: this.state.bus,
                busErrors: this.state.busErrors,
                busErrorMessage: this.state.busErrorMessage,
                busInserted: this.state.busInserted,
                trains: this.state.trains,
                train: this.state.train,
                trainErrors: this.state.trainErrors,
                trainErrorMessage: this.state.trainErrorMessage,
                trainInserted: this.state.trainInserted,
                hostels: this.state.hostels,
                hostel: this.state.hostel,
                hostelErrors: this.state.hostelErrors,
                hostelInserted: this.state.hostelInserted,
                hostelErrorMessage: this.state.hostelErrorMessage,
            });
    }
}

AppWrapper.contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object,
};

AppWrapper.displayName = 'AppWrapper';

export default AppWrapper;

