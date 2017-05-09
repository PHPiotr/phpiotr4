import React from 'react';
import Auth from './Auth';
import getHeaders from '../../getHeaders';
import {connect} from 'react-redux';
import {fetchHostelsIfNeeded} from '../../actions/hostels';
import {withRouter} from 'react-router';
import Navigation from '../presentation/Navigation';
import Pagination from '../presentation/Pagination';
import HostelsTable from '../presentation/HostelsTable';

const Hostels = (props) => (
    <div>
        <Navigation {...props} />
        <HostelsTable {...props} />
        <Pagination {...props} />
    </div>
);

const mapStateToProps = (state) => ({
    hostels: state.hostels,
    bookingsLabel: 'hostels',
    bookingLabel: 'hostel',
});
const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchBookings(type, page) {
        dispatch(fetchHostelsIfNeeded(type || 'current', page || 1, getHeaders()));
    },
});

export default Auth(withRouter(connect(mapStateToProps, mapDispatchToProps)(Hostels)));