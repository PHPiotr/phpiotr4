import React, { Component } from 'react';
import Nav from '../nav/Nav.jsx';

class Hostels extends Component {
    render() {
        return(
            <div>
                <Nav booking="hostels" />
                {this.props.children}
            </div>
        );
    }
};

export default Hostels;


