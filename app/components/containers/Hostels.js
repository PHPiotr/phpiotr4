import React from 'react';
import {connect} from 'react-redux';
import {fetchHostelsIfNeeded} from '../../actions/hostels';
import {withRouter} from 'react-router-dom';
import Navigation from '../presentation/Navigation';
import Pagination from '../presentation/Pagination';
import HostelsTable from '../presentation/HostelsTable';
import Spinner from '../presentation/Spinner';

const Hostels = (props) => {
    if (!props.isLoggedIn) {
        return null;
    }
    return (
        <div>
            <Spinner isFetching={props.hostels.isFetching} />
            <Navigation {...props} />
            <HostelsTable {...props} />
            <Pagination {...props} />
        </div>
    );
};

const mapStateToProps = state => ({
    hostels: state.hostels,
    bookingsLabel: 'hostels',
    bookingLabel: 'hostel',
    isLoggedIn: state.auth.isLoggedIn,
});
const mapDispatchToProps = dispatch => ({
    fetchBookings(type, page) {
        dispatch(fetchHostelsIfNeeded(type || 'current', page || 1));
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Hostels));