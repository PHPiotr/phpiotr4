import React from 'react';
import getHeaders from '../../getHeaders';
import {connect} from 'react-redux';
import {fetchTrainsIfNeeded} from '../../actions/trains';
import {verifyIfNeeded, VERIFY_SUCCESS} from '../../actions/verify';
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
const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchBookings(type, page) {
        dispatch(verifyIfNeeded(getHeaders())).then((json) => {
            if (json === undefined) {
                return ownProps.history.push('/login');
            }
            if (json.type === undefined) {
                return ownProps.history.push('/login');
            }
            if (json.type !== VERIFY_SUCCESS) {
                return ownProps.history.push('/login');
            }
            dispatch(fetchTrainsIfNeeded(type || 'current', page || 1, getHeaders()));
        });
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Trains));