import React, { Component, PropTypes } from 'react';
import Nav from '../nav/Nav.jsx';
import PlanesCurrent from '../bookings/PlanesCurrent.jsx';


class Planes extends Component {

    render() {
        let propsChildren = this.props.children && React.cloneElement(this.props.children, {
            planes: this.props.planes,
            plane: this.props.plane,
            callbacks: this.props.callbacks,
            planesCallbacks: this.props.planesCallbacks
        });
        return(
            <div>
                <Nav booking="planes" />
                {propsChildren}
            </div>
        );
    };
};

Planes.propTypes = {
    planes: PropTypes.object,
    plane: PropTypes.object,
    planesCallbacks: PropTypes.object
};

export default Planes;

