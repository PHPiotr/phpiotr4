import React, {Component} from 'react';
import Bookings from '../hoc/Bookings.jsx';

class BusesCurrent extends Component {

    render() {
        return this.props.getContent();
    }
}

BusesCurrent.displayName = 'BusesCurrent'

export default Bookings(BusesCurrent, 'current')

