import React from 'react';
import Auth from './Auth';
import getHeaders from '../../getHeaders';
import {connect} from 'react-redux';
import {fetchTrainsIfNeeded} from '../../actions/trains';
import {withRouter} from 'react-router';
import Navigation from '../presentation/Navigation';
import Pagination from '../presentation/Pagination';
import TrainsTable from '../presentation/TrainsTable';

const Trains = (props) => (
    <div>
        <Navigation {...props} />
        <TrainsTable {...props} />
        <Pagination {...props} />
    </div>
);

const mapStateToProps = (state) => ({
    trains: state.trains,
    bookingsLabel: 'trains',
    bookingLabel: 'train',
});
const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchBookings(type, page) {
        dispatch(fetchTrainsIfNeeded(type || 'current', page || 1, getHeaders()));
    },
});

export default Auth(withRouter(connect(mapStateToProps, mapDispatchToProps)(Trains)));