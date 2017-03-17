import React, { Component, PropTypes } from 'react';
import Nav from '../nav/Nav.jsx';

class Trains extends Component {

    render() {
        let propsChildren = this.props.children && React.cloneElement(this.props.children, {
                trains: this.props.trains,
                train: this.props.train,
                trainErrors: this.props.trainErrors,
                trainErrorMessage: this.props.trainErrorMessage,
                trainInserted: this.props.trainInserted,
                callbacks: this.props.callbacks,
                trainsCallbacks: this.props.trainsCallbacks,
                socket: this.props.socket
            });
        return(
            <div>
                <Nav booking="trains" />
                {propsChildren}
            </div>
        );
    };
}

Trains.propTypes = {
    trains: PropTypes.object,
    train: PropTypes.object,
    trainErrors: PropTypes.object,
    trainInserted: PropTypes.object,
    trainErrorMessage: PropTypes.string,
    trainsCallbacks: PropTypes.object
};

export default Trains;

