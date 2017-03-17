import React, {Component} from 'react';
import update from 'react-addons-update';
import io from 'socket.io-client';
import 'whatwg-fetch';
import 'babel-polyfill';

const API_URL = 'http://localhost:3000';
const API_HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer jwt'
};

const socket = io.connect(API_URL);

class AppWrapper extends Component {

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
        };
    };

    getPlanes(type, page = 1) {
        fetch(`${API_URL}/bookings/planes?type=${type}&page=${page}`, {headers: API_HEADERS})
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({planes: responseData});
            })
            .catch((error) => {
                console.log('Error fetching and parsing data', error);
            });
    };

    getBuses(type, page = 1) {
        fetch(`${API_URL}/bookings/buses?type=${type}&page=${page}`, {headers: API_HEADERS})
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({buses: responseData});
            })
            .catch((error) => {
                console.log('Error fetching and parsing data', error);
            });
    };

    addPlane(event) {
        let planes = this.state.planes;
        let plane = this.state.plane;

        fetch(`${API_URL}/bookings/planes`, {
            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify(plane)
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
                var that = this;
                if (data.ok) {
                    this.setState({
                        plane: {},
                        planeErrors: {},
                        planeErrorMessage: '',
                        planeInserted: data.plane
                    });
                    setTimeout(function() {
                        that.setState({
                            planeInserted: {}
                        });
                    }, 5000);
                } else {
                    if (data.err) {
                        this.setState({
                            planeErrorMessage: data.err.message,
                            planeErrors: data.err.errors
                        });
                    }
                }
            })
            .catch((error) => {

            });

        event.preventDefault();
    }

    addBus(event) {
        let buses = this.state.buses;
        let bus = this.state.bus;

        fetch(`${API_URL}/bookings/buses`, {
            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify(bus)
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
                var that = this;
                if (data.ok) {
                    this.setState({
                        bus: {},
                        busErrors: {},
                        busErrorMessage: '',
                        busInserted: data.bus
                    });
                    setTimeout(function() {
                        that.setState({
                            busInserted: {}
                        });
                    }, 5000);
                } else {
                    if (data.err) {
                        this.setState({
                            busErrorMessage: data.err.message,
                            busErrors: data.err.errors
                        });
                    }
                }
            })
            .catch((error) => {

            });

        event.preventDefault();
    }

    /**
     * @param {Object} event
     * @param {String} type  bus|plane|train|hostel
     * @returns {undefined}
     */
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

    render() {
        let App = this.props.children && React.cloneElement(this.props.children, {
                callbacks: {
                    handleChange: this.handleChange.bind(this),
                    handleFocus: this.handleFocus.bind(this)
                },
                socket: socket,
                planes: this.state.planes,
                plane: this.state.plane,
                planeErrors: this.state.planeErrors,
                planeErrorMessage: this.state.planeErrorMessage,
                planeInserted: this.state.planeInserted,
                planesCallbacks: {
                    getBookings: this.getPlanes.bind(this),
                    addBooking: this.addPlane.bind(this),
                },
                buses: this.state.buses,
                bus: this.state.bus,
                busErrors: this.state.busErrors,
                busErrorMessage: this.state.busErrorMessage,
                busInserted: this.state.busInserted,
                busesCallbacks: {
                    getBookings: this.getBuses.bind(this),
                    addBooking: this.addBus.bind(this),
                },
            });

        return App;
    }
}
;

export default AppWrapper;

