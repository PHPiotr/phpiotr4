import React from 'react';
import {connect} from 'react-redux';
import {fetchBusesIfNeeded} from '../../actions/buses';
import {withRouter} from 'react-router-dom';
import Navigation from '../presentation/Navigation';
import Pagination from '../presentation/Pagination';
import BusesTable from '../presentation/BusesTable';
import Spinner from '../presentation/Spinner';

const Buses = (props) => {
    if (!props.isLoggedIn) {
        return null;
    }
    return (
        <div>
            <Spinner isFetching={props.buses.isFetching} />
            <Navigation {...props} />
            <BusesTable {...props} />
            <Pagination {...props} />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        buses: state.buses,
        bookingsLabel: 'buses',
        bookingLabel: 'bus',
        isLoggedIn: state.auth.isLoggedIn,
    };
};
const mapDispatchToProps = dispatch => ({
    fetchBookings(type, page) {
        dispatch(fetchBusesIfNeeded(type || 'current', page || 1));
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Buses));