import React from 'react';
import getHeaders from '../../getHeaders';
import {connect} from 'react-redux';
import {fetchHostelsIfNeeded} from '../../actions/hostels';
import {verifyIfNeeded, VERIFY_SUCCESS} from '../../actions/verify';
import {withRouter} from 'react-router';
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
            dispatch(fetchHostelsIfNeeded(type || 'current', page || 1, getHeaders()));
        });
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Hostels));