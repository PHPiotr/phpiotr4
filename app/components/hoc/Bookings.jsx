import React, {Component, PropTypes} from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

function bookings(WrappedComponent, type_plural, type_singular, active) {
    class Bookings extends Component {
        constructor(props) {
            super(props);
            this.getBookings = this.getBookings.bind(this);
        }

        componentDidMount() {
            this.props.callbacks.handleList(type_plural, active);
            this.props.socket.on(`insert_${type_singular}`, this.getBookings);
        };

        componentWillUnmount() {
            this.props.socket.removeListener(`insert_${type_singular}`, this.getBookings);
        };

        getBookings() {
            this.props.callbacks.handleList(type_plural, active);
        };

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    Bookings.displayName = `Bookings(${getDisplayName(WrappedComponent)})`;
    hoistNonReactStatic(Bookings, WrappedComponent);
    Bookings.propTypes = {
        [type_plural]: PropTypes.object,
    };

    return Bookings;
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default bookings

