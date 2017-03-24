import React, {Component} from 'react';
import Bookings from '../hoc/Bookings.jsx';

class HostelsPast extends Component {

    render() {
        return this.props.getContent();
    }
}

HostelsPast.displayName = 'HostelsPast'

export default Bookings(HostelsPast, 'past')

