import React, { Component, PropTypes } from 'react';
import Nav from '../nav/Nav.jsx';
import Auth from '../Auth.jsx';

class Hostels extends Auth {

    render() {
        let propsChildren = this.props.children && React.cloneElement(this.props.children, {
                hostels: this.props.hostels,
                hostel: this.props.hostel,
                hostelErrors: this.props.hostelErrors,
                hostelErrorMessage: this.props.hostelErrorMessage,
                hostelInserted: this.props.hostelInserted,
                callbacks: this.props.callbacks,
                socket: this.props.socket
            });
        return(
            <div>
                <Nav booking="hostels" />
                {propsChildren}
            </div>
        );
    };
}

Hostels.propTypes = {
    hostels: PropTypes.object,
    hostel: PropTypes.object,
    hostelErrors: PropTypes.object,
    hostelInserted: PropTypes.object,
    hostelErrorMessage: PropTypes.string,
};

export default Hostels;

