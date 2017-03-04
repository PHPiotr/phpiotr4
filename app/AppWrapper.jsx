import React, { Component } from 'react';
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
            plane: {}
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
        let planes = this.state.planes;
        let plane = this.state.plane;
        
        fetch(`${API_URL}/bookings/planes`, {
            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify(this.state.plane)
        })
                .then((response) => {
                    if (!response.ok) {
                        console.log(response);
                        throw new Error('Response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log('responseData: ', data);
                    // When the server returns the definitive ID
                    // used for the new Task on the server, update it on React
                    //newTask.id = responseData.id
                    //this.setState({cards: nextState});
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({
                        planes: planes
                    });
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

    render() {
        let App = this.props.children && React.cloneElement(this.props.children, {
            planes: this.state.planes,
            plane: this.state.plane,
            planesCallbacks: {
                getBookings: this.getPlanes.bind(this),
                addBooking: this.addPlane.bind(this),
                handleChange: this.handleChange.bind(this)
            },
            callbacks: {
                handleChange: this.handleChange.bind(this)
            },
            socket: socket
        });

        return App;
    }
};

export default AppWrapper;

