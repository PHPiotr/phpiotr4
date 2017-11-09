import React from 'react';
import {connect} from 'react-redux';
import {fetchPlanesIfNeeded} from '../../actions/planes';
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
const mapDispatchToProps = dispatch => ({
    fetchBookings(type, page) {
        dispatch(fetchPlanesIfNeeded(type || 'current', page || 1));
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Planes));