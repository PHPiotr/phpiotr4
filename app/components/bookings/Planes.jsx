import React, { Component, PropTypes } from 'react';
import Nav from '../nav/Nav.jsx';
import Auth from '../hoc/Auth.jsx';

class Planes extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let propsChildren = this.props.children && React.cloneElement(this.props.children, {
            planes: this.props.planes,
            plane: this.props.plane,
            planeErrors: this.props.planeErrors,
            planeErrorMessage: this.props.planeErrorMessage,
            planeInserted: this.props.planeInserted,
            callbacks: this.props.callbacks,
            socket: this.props.socket
        });
        return(
            <div>
                <Nav booking="planes" />
                {propsChildren}
            </div>
        );
    };
}

Planes.propTypes = {
    planes: PropTypes.object,
    plane: PropTypes.object,
    planeErrors: PropTypes.object,
    planeInserted: PropTypes.object,
    planeErrorMessage: PropTypes.string,
};

export default Auth(Planes);

