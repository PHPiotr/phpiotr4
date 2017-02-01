import React, { Component } from 'react';
import Nav from '../nav/Nav.jsx';

class Buses extends Component {
    render() {
        return(
            <div>
                <Nav booking="buses" />
                {this.props.children}
            </div>
        );
    }
};

export default Buses;

