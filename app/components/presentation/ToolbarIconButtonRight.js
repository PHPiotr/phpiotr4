import React from 'react';
import {IconButton} from 'material-ui';
import DeleteIcon from 'material-ui-icons/Delete';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {deleteBookingIfNeeded} from '../../actions/booking/bookingActions';

const ToolbarIconButtonRight = ({showArrowBack, deleteBooking}) => {
    if (showArrowBack) {
        return (
            <IconButton onClick={deleteBooking}>
                <DeleteIcon style={{color: 'white'}} />
            </IconButton>
        );
    }
    return null;
};

const mapStateToProps = ({bookings: {bus, plane, train, hostel}}) => ({
    showArrowBack: bus.isAdd || plane.isAdd || train.isAdd || hostel.isAdd,
});
const mapDispatchToProps = (dispatch, {labelPlural, history}) => ({
    deleteBooking() {
        dispatch(deleteBookingIfNeeded()).then(() => history.replace(`/bookings/${labelPlural}`));
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolbarIconButtonRight));