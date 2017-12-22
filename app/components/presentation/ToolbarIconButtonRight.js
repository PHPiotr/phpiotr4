import React from 'react';
import {IconButton} from 'material-ui';
import DeleteIcon from 'material-ui-icons/Delete';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {toggleIsBookingDeleteDialogOpen} from '../../actions/booking/bookingActions';

const ToolbarIconButtonRight = ({canDelete, deleteBooking}) => {
    if (canDelete) {
        return (
            <IconButton onClick={deleteBooking}>
                <DeleteIcon style={{color: 'white'}}/>
            </IconButton>
        );
    }
    return null;
};

const mapStateToProps = ({bookings: {currentBooking: {id}}}) => ({
    canDelete: id !== null,
});
const mapDispatchToProps = dispatch => ({
    deleteBooking() {
        dispatch(toggleIsBookingDeleteDialogOpen());
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolbarIconButtonRight));