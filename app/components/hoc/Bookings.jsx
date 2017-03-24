import React, {Component, PropTypes} from 'react';

function bookings(WrappedComponent, type, active) {
    class Bookings extends Component {
        constructor(props) {
            super(props);
            this.getBookings = this.getBookings.bind(this);
        }

        componentDidMount() {
            this.props.callbacks.handleList(type, active);
            this.props.socket.on('insert', this.getBookings);
        };

        componentWillUnmount() {
            this.props.socket.removeListener('insert', this.getBookings);
        };

        getBookings() {
            this.props.callbacks.handleList(type, active);
        };

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    Bookings.displayName = `Bookings(${getDisplayName(WrappedComponent)})`;
    Bookings.propTypes = {
        [type]: PropTypes.object,
    };

    return Bookings;
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default bookings

