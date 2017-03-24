import React, {Component} from 'react';
import Bookings from '../hoc/Bookings.jsx';

class BusesPast extends Component {

    render() {
        return this.props.getContent();
    };
}

BusesPast.displayName = 'BusesPast'

export default Bookings(BusesPast, 'past');

