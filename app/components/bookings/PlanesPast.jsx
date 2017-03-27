import {Component} from 'react';
import Bookings from '../hoc/Bookings.jsx';

class PlanesPast extends Component {

    render() {
        return this.props.getContent();
    }
}

PlanesPast.displayName = 'PlanesPast';

export default Bookings(PlanesPast, 'past');

