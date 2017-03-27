import {Component} from 'react';
import Bookings from '../hoc/Bookings.jsx';

class TrainsCurrent extends Component {

    render() {
        return this.props.getContent();
    }
}

TrainsCurrent.displayName = 'TrainsCurrent';

export default Bookings(TrainsCurrent, 'current');

