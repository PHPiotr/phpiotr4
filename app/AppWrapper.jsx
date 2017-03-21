import React, {Component, PropTypes} from 'react';
import update from 'react-addons-update';
import io from 'socket.io-client';
import 'whatwg-fetch';
import 'babel-polyfill';
import config from '../config';

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
        socket.on('auth_failed', function () {
            that.setState({
                token: ''
            });
            delete config.api_headers['Authorization'];
        });
        socket.on('token_received', function (token) {
            config.api_headers['Authorization'] = `Bearer ${token}`;
            that.context.router.push('/');
        });
    }

    componentWillUnmount() {
        this.props.socket.removeListener('auth_failed');
        this.props.socket.removeListener('token_received');
    }

    handleList(bookings, type, page) {
        fetch(`${config.api_url}/bookings/${bookings}?type=${type}&page=${page || 1}`, {headers: config.api_headers})
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

        const typeErrors = type + 'Errors';
        const typeErrorMessage = type + 'ErrorMessage';
        const typeInserted = type + 'Inserted';

        fetch(`${config.api_url}/bookings/${types}`, {
            method: 'post',
            headers: config.api_headers,
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
                socket.emit('auth_failed');
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

