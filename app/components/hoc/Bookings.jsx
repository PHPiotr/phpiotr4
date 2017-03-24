import React, {Component} from 'react';

function Bookings(WrappedComponent, type, active) {
    return class extends Component {
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
    };
}

export default Bookings

