import React from 'react';
import getHeaders from '../../getHeaders';
import {connect} from 'react-redux';
import {fetchBusesIfNeeded} from '../../actions/buses';
import {verifyIfNeeded, VERIFY_SUCCESS} from '../../actions/verify';
import {withRouter} from 'react-router';
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
const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchBookings(type, page) {
        dispatch(verifyIfNeeded(getHeaders())).then((json) => {
            if (json === undefined) {
                return ownProps.router.push('/login');
            }
            if (json.type === undefined) {
                return ownProps.router.push('/login');
            }
            if (json.type !== VERIFY_SUCCESS) {
                return ownProps.router.push('/login');
            }
            dispatch(fetchBusesIfNeeded(type || 'current', page || 1, getHeaders()));
        });
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Buses));