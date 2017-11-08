import React from 'react';
import getHeaders from '../../getHeaders';
import {connect} from 'react-redux';
import {fetchPlanesIfNeeded} from '../../actions/planes';
import {verifyIfNeeded, VERIFY_SUCCESS} from '../../actions/verify';
import {withRouter} from 'react-router-dom';
import Navigation from '../presentation/Navigation';
import Pagination from '../presentation/Pagination';
import PlanesTable from '../presentation/PlanesTable';
import Spinner from '../presentation/Spinner';

const Planes = (props) => {
    if (!props.isLoggedIn) {
        return null;
    }
    return (
        <div>
            <Spinner isFetching={props.planes.isFetching} />
            <Navigation {...props} />
            <PlanesTable {...props} />
            <Pagination {...props} />
        </div>
    );
};

const mapStateToProps = state => ({
    planes: state.planes,
    bookingsLabel: 'planes',
    bookingLabel: 'plane',
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
            dispatch(fetchPlanesIfNeeded(type || 'current', page || 1, getHeaders()));
        });
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Planes));