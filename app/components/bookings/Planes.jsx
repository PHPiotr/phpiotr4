import React, { Component, PropTypes } from 'react';
import Nav from '../nav/Nav.jsx';

class Planes extends Component {

    render(){        
        return(
            <div>
                <Nav booking="planes" />
                {this.props.children}
            </div>
        );
    };
};

export default Planes;

