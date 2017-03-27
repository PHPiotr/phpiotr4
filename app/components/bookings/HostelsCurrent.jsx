import {Component} from 'react';
import Bookings from '../hoc/Bookings.jsx';

class HostelsCurrent extends Component {

    render() {
        return this.props.getContent();
    }
}

HostelsCurrent.displayName = 'HostelsCurrent';

export default Bookings(HostelsCurrent, 'current');

