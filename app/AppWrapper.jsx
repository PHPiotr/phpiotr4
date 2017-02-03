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

    getPlanes(type) {
            fetch(`${API_URL}/bookings/planes?type=${type}`, {headers: API_HEADERS})
                .then((response) => response.json())
                .then((responseData) => {
                    this.setState({planes: responseData});
                    console.log(responseData, 'trzoda słów');
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
                getPlanes: this.getPlanes.bind(this),
                addPlane: this.addPlane.bind(this)
            }
        });

        return app;
    }
};

export default AppWrapper;

