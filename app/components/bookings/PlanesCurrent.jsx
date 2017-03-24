import React, {Component} from 'react';
import Pagination from '../nav/Pagination.jsx';
import moment from 'moment';
import Bookings from '../hoc/Bookings.jsx';

class PlanesCurrent extends Component {

    render() {
        return this.props.getContent();
    }
}

PlanesCurrent.displayName = 'PlanesCurrent'

export default Bookings(PlanesCurrent, 'current')

