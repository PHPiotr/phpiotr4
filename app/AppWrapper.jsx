import React, { Component } from 'react';
import update from 'react-addons-update';
import 'whatwg-fetch';
import 'babel-polyfill';

const API_URL = 'http://localhost:3000';
const API_HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer jwt'
};

class AppWrapper extends Component {

    constructor() {
        super(...arguments);
        this.state = {
            planes: {},
            plane: {
                confirmation_number: '',
                currency: '£',
                is_return: false
            }
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
    
    addPlane(event) {
        console.log('will add this bastard soon...', this.state.plane);
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

    render() {
        let app = this.props.children && React.cloneElement(this.props.children, {
            planes: this.state.planes,
            plane: this.state.plane,
            planesCallbacks: {
                getBookings: this.getPlanes.bind(this),
                addBooking: this.addPlane.bind(this),
                handleChange: this.handleChange.bind(this)
            },
            callbacks: {
                handleChange: this.handleChange.bind(this)
            }
        });

        return app;
    }
};

export default AppWrapper;

