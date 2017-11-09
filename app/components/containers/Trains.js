import React from 'react';
import {connect} from 'react-redux';
import {fetchTrainsIfNeeded} from '../../actions/trains';
import {withRouter} from 'react-router-dom';
import Navigation from '../presentation/Navigation';
import Pagination from '../presentation/Pagination';
import TrainsTable from '../presentation/TrainsTable';
import Spinner from '../presentation/Spinner';

const Trains = (props) => {
    if (!props.isLoggedIn) {
        return null;
    }
    return (
        <div>
            <Spinner isFetching={props.trains.isFetching} />
            <Navigation {...props} />
            <TrainsTable {...props} />
            <Pagination {...props} />
        </div>
    );
};

const mapStateToProps = state => ({
    trains: state.trains,
    bookingsLabel: 'trains',
    bookingLabel: 'train',
    isLoggedIn: state.auth.isLoggedIn,
});
const mapDispatchToProps = dispatch => ({
    fetchBookings(type, page) {
        dispatch(fetchTrainsIfNeeded(type || 'current', page || 1));
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Trains));