import React from 'react';
import Auth from './Auth';
import getHeaders from '../../getHeaders';
import {connect} from 'react-redux';
import {fetchBusesIfNeeded} from '../../actions/buses';
import {withRouter} from 'react-router';
import Navigation from '../presentation/Navigation';
import Pagination from '../presentation/Pagination';
import BusesTable from '../presentation/BusesTable';

const Buses = (props) => (
    <div>
        <Navigation {...props} />
        <BusesTable {...props} />
        <Pagination {...props} />
    </div>
);

const mapStateToProps = (state, ownProps) => {
    return {
        buses: state.buses,
        bookingsLabel: 'buses',
        bookingLabel: 'bus',
    }
};
const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchBookings(type, page) {
        dispatch(fetchBusesIfNeeded(type || 'current', page || 1, getHeaders()));
    },
});

export default Auth(withRouter(connect(mapStateToProps, mapDispatchToProps)(Buses)));