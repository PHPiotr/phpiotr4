import React from 'react';
import Auth from '../hoc/Auth.jsx';
import getHeaders from '../../getHeaders';
import {connect} from 'react-redux';
import {fetchPlanesIfNeeded} from '../../actions';
import {withRouter} from 'react-router';
import Navigation from '../presentation/Navigation';
import Pagination from '../presentation/Pagination';
import PlanesTable from '../presentation/PlanesTable';

const Planes = (props) => (
    <div>
        <Navigation {...props} />
        <PlanesTable {...props} />
        <Pagination {...props} />
    </div>
);

const mapStateToProps = (state) => ({
    planes: state.planes,
    bookingsLabel: 'planes',
    bookingLabel: 'plane',
});
const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchBookings(type, page) {
        dispatch(fetchPlanesIfNeeded(type || 'current', page || 1, getHeaders()));
    },
});

export default Auth(withRouter(connect(mapStateToProps, mapDispatchToProps)(Planes)));