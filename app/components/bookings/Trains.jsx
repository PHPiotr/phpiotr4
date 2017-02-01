import React, { Component } from 'react';
import Nav from '../nav/Nav.jsx';

class Trains extends Component {
    render() {
        return(
            <div>
                <Nav booking="trains" />
                {this.props.children}
            </div>
        );
    }
};

export default Trains;


