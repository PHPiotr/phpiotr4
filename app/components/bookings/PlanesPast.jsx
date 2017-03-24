import React, {Component} from 'react';
import Pagination from '../nav/Pagination.jsx';
import moment from 'moment';
import Bookings from '../hoc/Bookings.jsx';

class PlanesPast extends Component {

    render() {
        return this.props.getContent();
    }
}

PlanesPast.displayName = 'PlanesPast'

export default Bookings(PlanesPast, 'past')

