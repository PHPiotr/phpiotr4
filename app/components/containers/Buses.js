import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getBookingsIfNeeded} from '../../actions/index';
import {withRouter} from 'react-router-dom';
import Navigation from '../presentation/Navigation';
import Pagination from '../presentation/Pagination';
import BusesTable from '../presentation/BusesTable';
import {LinearProgress} from 'material-ui/Progress';
import {setAppBarTitle} from '../../actions/app/appActions';
import {BUSES} from '../../constants';
import FloatingAddButton from '../presentation/FloatingAddButton';

class Buses extends Component {

    componentDidMount() {
        if (!this.props.isLoggedIn) {
            return null;
        }
        const {params} = this.props.match;
        this.props.fetchBookings(params.current, params.page);
        this.props.setAppBarTitle(BUSES);
    }

    render() {
        const items = [];
        items.push(<Navigation key={1} {...this.props}/>);
        if (this.props.bus.isFetching) {
            items.push(<LinearProgress key={2} />);
        } else {
            items.push(<BusesTable key={3} {...this.props.bus.data} />);
            items.push(<Pagination key={4} {...this.props} />);
            items.push(<FloatingAddButton href={'/bookings/bus/new'} key={5}/>);
        }

        return items;
    }
}

const mapStateToProps = ({bookings: {bus}, auth: {isLoggedIn}}) => {
    return {
        bus,
        isLoggedIn,
        isAdd: false,
        bookingsLabel: 'buses',
        bookingLabel: 'bus',
    };
};
const mapDispatchToProps = dispatch => ({
    fetchBookings(type, page) {
        dispatch(getBookingsIfNeeded('bus', 'buses', type || '', page || 1));
    },
    setAppBarTitle(appBarTitle) {
        dispatch(setAppBarTitle(appBarTitle));
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Buses));