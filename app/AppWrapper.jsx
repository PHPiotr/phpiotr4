import React, {Component, PropTypes} from 'react';
import update from 'react-addons-update';
import io from 'socket.io-client';
import 'whatwg-fetch';
import 'babel-polyfill';
import config from '../config';
import cookie from 'cookie-monster';

const socket = io.connect(config.api_url);

class AppWrapper extends Component {

    static contextTypes = {
        router: PropTypes.object,
    };

    constructor() {
        super(...arguments);
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
            token: '',
        };
    };

    componentDidMount() {

        let that = this;
        let tokenCookie = cookie.getItem(config.token_key);
        if (undefined !== tokenCookie) {
            that.setState({
                token: tokenCookie
            });
            config.api_headers['Authorization'] = `Bearer ${tokenCookie}`;
        }
        socket.on(config.event.token_received, function (token) {
            config.api_headers['Authorization'] = `Bearer ${token}`;
            let now = new Date();
            let time = now.getTime();
            let expireTime = time + config.token_expires_in;
            now.setTime(expireTime);
            cookie.setItem(config.token_key, token);
            that.context.router.push('/');
        });

        socket.on(config.event.auth_failed, function () {
            that.setState({
                token: ''
            });
            delete config.api_headers['Authorization'];
            cookie.removeItem(config.token_key);
            that.context.router.push('/login');
        });

    }

    componentWillUnmount() {
        this.props.socket.removeListener(config.event.auth_failed);
        this.props.socket.removeListener(config.event.token_received);
    }

    setHeaders() {
        let currentCookie = cookie.getItem(config.token_key);
        config.api_headers['Authorization'] = `Bearer ${currentCookie}`;

        return config.api_headers;
    }

    handleList(bookings, type, page) {
        let headers = this.setHeaders();
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

    handleAdd(event, type, types) {

        let bookings = this.state[types];
        let booking = this.state[type];
        let headers = this.setHeaders();

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

        this.setState({
            token: ''
        });

        let login = this.state.login;

        fetch(`${config.api_url}/users/authenticate`, {
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
                        token: data.token,
                    });
                } else {
                    if (data.errors) {
                        this.setState({
                            loginErrorMessage: data.message,
                            loginErrors: data.errors
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
        return !!this.state.token;
    }

    handleLogout() {
        this.setState({
            token: ''
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
                },
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
                login: this.state.login,
                loginErrors: this.state.loginErrors,
                loginErrorMessage: this.state.loginErrorMessage,
                token: this.state.token,
            });
    }
}

export default AppWrapper;

