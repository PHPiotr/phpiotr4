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
            planes: {}
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
    
    addPlane() {
        
    }
    
    render() {
        let app = this.props.children && React.cloneElement(this.props.children, {
            planes: this.state.planes,
            planesCallbacks: {
                getBookings: this.getPlanes.bind(this),
                addBooking: this.addPlane.bind(this)
            }
        });

        return app;
    }
};

export default AppWrapper;

