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
            login: {},
            loginErrorMessage: '',
            loginErrors: {},
            isLoggedIn: false,
            fromDateFieldType: 'text',
            toDateFieldType: 'text',
            isDateFilterEnabled: false,
            report: {
                total_cost: 0,
                buses: [],
                buses_avg: 0,
                buses_cost: 0,
                buses_singles_quantity: 0,
                planes: [],
                planes_avg: 0,
                planes_cost: 0,
                planes_singles_quantity: 0,
                trains: [],
                trains_avg: 0,
                trains_cost: 0,
                trains_singles_quantity: 0,
                hostels: [],
                hostels_avg: 0,
                hostels_cost: 0,
            },
        };
    }

    componentDidMount() {
        let that = this;
        let tokenCookie = cookie.getItem(config.token_key);
        if (undefined !== tokenCookie) {
            config.api_headers['Authorization'] = `Bearer ${tokenCookie}`;
            that.setState({
                isLoggedIn: true
            });
        }
        socket.on(config.event.token_received, function (token) {
            config.api_headers['Authorization'] = `Bearer ${token}`;
            let now = new Date();
            let time = now.getTime();
            let expireTime = time + 1000 * config.token_expires_in;
            now.setTime(expireTime);
            cookie.setItem(config.token_key, token, {expires: now.toGMTString()});
            that.setState({
                isLoggedIn: true,
            });
            that.context.router.push('/');
        });

        socket.on(config.event.auth_failed, function () {
            that.setState({
                isLoggedIn: false
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
        let oldReport = this.state.report;
        fetch(`${config.api_url}/report`, {headers: headers})
            .then((response) => response.json())
            .then((responseData) => {
                let newReport = update(oldReport, {
                    $merge: {
                        total_cost: responseData['total_cost'],
                        buses: responseData['buses'],
                        planes: responseData['planes'],
                        trains: responseData['trains'],
                        hostels: responseData['hostels'],
                        buses_avg: responseData['buses_avg'],
                        buses_cost: responseData['buses_cost'],
                        buses_singles_quantity: responseData['buses_singles_quantity'],
                        planes_avg: responseData['planes_avg'],
                        planes_cost: responseData['planes_cost'],
                        planes_singles_quantity: responseData['planes_singles_quantity'],
                        trains_avg: responseData['trains_avg'],
                        trains_cost: responseData['trains_cost'],
                        trains_singles_quantity: responseData['trains_singles_quantity'],
                        hostels_avg: responseData['hostels_avg'],
                        hostels_cost: responseData['hostels_cost'],
                    }
                });
                this.setState({report: newReport});
            })
            .catch((error) => {
                this.setState({report: oldReport});
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
        let booking = update(this.state[type], {[name]: {$set: value}});
        this.setState({
            [type]: booking
        });
    }

    handleFocus(event, type) {
        const name = event.target.name;
        const typeErrors = type + 'Errors';
        const typeErrorMessage = type + 'ErrorMessage';
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

    handleFocusDate(event) {
        let fieldType = `${event.target.name}DateFieldType`;
        if (this.state[fieldType] === 'text') {
            this.setState({
                [fieldType]: 'date'
            });
        }
    }

    handleSubmitDate(event) {
        console.log('isDateFilterEnabled:', this.state.isDateFilterEnabled);
        event.preventDefault();
    }

    handleResetDate(event) {
        event.preventDefault();
    }

    handleChangeDate(event) {
        console.log(event.target.value, event.target.name);
    }

    handleBlurDate(event) {
        let target, fieldType;

        target = event.target;

        if (target.value) {
            return;
        }

        fieldType = `${target.name}DateFieldType`;

        if (this.state[fieldType] === 'date') {
            this.setState({
                [fieldType]: 'text'
            });
        }
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

        if (this.state.isLoggedIn) {
            return this.context.router.push('/');
        }

        let login = this.state.login;

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
                    this.setState({
                        login: {},
                        loginErrors: {},
                        loginErrorMessage: '',
                        isLoggedIn: true,
                    });
                } else {
                    if (data.errors) {
                        this.setState({
                            loginErrorMessage: data.message,
                            loginErrors: data.errors,
                            isLoggedIn: false
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
        return this.state.isLoggedIn;
    }

    handleLogout() {
        this.setState({
            isLoggedIn: false,
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

    handleIsDateFilterEnabled(isDateFilterEnabled) {
        this.setState({
            isDateFilterEnabled: isDateFilterEnabled
        });
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
                    handleResetDate: this.handleResetDate.bind(this),
                },
                report: this.state.report,
                socket: socket,
                fromDateFieldType: this.state.fromDateFieldType,
                toDateFieldType: this.state.toDateFieldType,
                isDateFilterEnabled: this.state.isDateFilterEnabled,
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
                login: this.state.login,
                loginErrors: this.state.loginErrors,
                loginErrorMessage: this.state.loginErrorMessage,
            });
    }
}

AppWrapper.contextTypes = {
    router: PropTypes.object,
};

export default AppWrapper;

