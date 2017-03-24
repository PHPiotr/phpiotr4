import React, {Component} from 'react';
import Bookings from '../hoc/Bookings.jsx';

class TrainsPast extends Component {

    render() {
        return this.props.getContent();
    }
}

TrainsPast.displayName = 'TrainsPast'

export default Bookings(TrainsPast, 'past')

