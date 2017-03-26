import React, {Component, PropTypes} from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

function bookings(WrappedComponent, active) {

    class Bookings extends Component {
        constructor(props) {
            super(props);
            this.getBookings = this.getBookings.bind(this);
        }

        componentDidMount() {
            this.props.callbacks.handleList(this.props.labelPlural, active);
            this.props.socket.on(`insert_${this.props.labelSingular}`, this.getBookings);
        };

        componentWillUnmount() {
            this.props.socket.removeListener(`insert_${this.props.labelSingular}`);
        };

        getBookings() {
            this.props.callbacks.handleList(this.props.labelPlural, active);
        };

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    Bookings.displayName = `Bookings(${getDisplayName(WrappedComponent)})`;
    hoistNonReactStatic(Bookings, WrappedComponent);

    return Bookings;
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default bookings

