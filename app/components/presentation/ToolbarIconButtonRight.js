import React from 'react';
import {IconButton} from 'material-ui';
import DeleteIcon from 'material-ui-icons/Delete';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {toggleIsBookingDeleteDialogOpen} from '../../actions/app/appActions';

const ToolbarIconButtonRight = ({showArrowBack, deleteBooking}) => {
    if (showArrowBack) {
        return (
            <IconButton onClick={deleteBooking}>
                <DeleteIcon style={{color: 'white'}}/>
            </IconButton>
        );
    }
    return null;
};

const mapStateToProps = ({bookings: {bus, plane, train, hostel}}) => ({
    showArrowBack: bus.isAdd || plane.isAdd || train.isAdd || hostel.isAdd,
});
const mapDispatchToProps = dispatch => ({
    deleteBooking() {
        dispatch(toggleIsBookingDeleteDialogOpen());
    },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolbarIconButtonRight));