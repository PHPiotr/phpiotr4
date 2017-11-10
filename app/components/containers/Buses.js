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
            <BusesTable {...props.buses.data} />
            <Pagination {...props} />
        </div>
    );
};

const mapStateToProps = ({buses, auth: {isLoggedIn}}) => {
    return {
        buses,
        isLoggedIn,
        bookingsLabel: 'buses',
        bookingLabel: 'bus',
    };
};
const mapDispatchToProps = dispatch => ({
    fetchBookings(type, page) {
        dispatch(fetchBusesIfNeeded(type || 'current', page || 1));
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Buses));