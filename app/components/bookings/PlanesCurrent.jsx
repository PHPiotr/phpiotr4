import {Component} from 'react';
import Bookings from '../hoc/Bookings.jsx';

class PlanesCurrent extends Component {

    render() {
        return this.props.getContent();
    }
}

PlanesCurrent.displayName = 'PlanesCurrent';

export default Bookings(PlanesCurrent, 'current');

