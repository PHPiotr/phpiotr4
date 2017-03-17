import React, { Component, PropTypes } from 'react';
import Nav from '../nav/Nav.jsx';

class Buses extends Component {

    render() {
        let propsChildren = this.props.children && React.cloneElement(this.props.children, {
                buses: this.props.buses,
                bus: this.props.bus,
                busErrors: this.props.busErrors,
                busErrorMessage: this.props.busErrorMessage,
                busInserted: this.props.busInserted,
                callbacks: this.props.callbacks,
                busesCallbacks: this.props.busesCallbacks,
                socket: this.props.socket
            });
        return(
            <div>
                <Nav booking="buses" />
                {propsChildren}
            </div>
        );
    };
}

Buses.propTypes = {
    buses: PropTypes.object,
    bus: PropTypes.object,
    busErrors: PropTypes.object,
    busInserted: PropTypes.object,
    busErrorMessage: PropTypes.string,
    busesCallbacks: PropTypes.object
};

export default Buses;

