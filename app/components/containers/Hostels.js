import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getBookingsIfNeeded} from '../../actions/index';
import {withRouter} from 'react-router-dom';
import Navigation from '../presentation/Navigation';
import Pagination from '../presentation/Pagination';
import HostelsTable from '../presentation/HostelsTable';
import {LinearProgress} from 'material-ui/Progress';
import {setAppBarTitle} from '../../actions/app/appActions';
import {HOSTELS} from '../../constants';
import FloatingAddButton from '../presentation/FloatingAddButton';

class Hostels extends Component {

    componentDidMount() {
        if (!this.props.isLoggedIn) {
            return null;
        }
        const {params} = this.props.match;
        this.props.fetchBookings(params.current, params.page);
        this.props.setAppBarTitle(HOSTELS);
    }

    render() {
        const items = [];
        items.push(<Navigation key={1} {...this.props}/>);
        if (this.props.hostel.isFetching) {
            items.push(<LinearProgress key={2} />);
        } else {
            items.push(<HostelsTable key={3} {...this.props.hostel.data} />);
            items.push(<Pagination key={4} {...this.props} />);
            items.push(<FloatingAddButton href={'/bookings/hostel/new'} key={5}/>);
        }

        return items;
    }
}

const mapStateToProps = ({bookings: {hostel}, auth: {isLoggedIn}}) => ({
    hostel,
    isLoggedIn,
    isAdd: false,
    bookingsLabel: 'hostels',
    bookingLabel: 'hostel',
});
const mapDispatchToProps = dispatch => ({
    fetchBookings(type, page) {
        dispatch(getBookingsIfNeeded('hostel', 'hostels', type || '', page || 1));
    },
    setAppBarTitle(appBarTitle) {
        dispatch(setAppBarTitle(appBarTitle));
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Hostels));