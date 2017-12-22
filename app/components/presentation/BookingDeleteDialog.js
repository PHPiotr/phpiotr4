import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {DialogActions, DialogTitle, withMobileDialog} from 'material-ui/Dialog';
import {connect} from 'react-redux';
import {toggleIsBookingDeleteDialogOpen} from '../../actions/app/appActions';
import {deleteBookingIfNeeded} from '../../actions/booking/bookingActions';

const BookingDeleteDialog = (props) => {

    const handleDelete = () => props.handleDelete(props.labelPlural);

    return (
        <Dialog open={props.isOpen} onClose={props.handleCancel} aria-labelledby="responsive-dialog-title">
            <DialogTitle id="responsive-dialog-title">Delete this booking?</DialogTitle>
            <DialogActions>
                <Button onClick={props.handleCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleDelete} color="primary" autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const mapStateToProps = ({app}) => ({
    isOpen: app.isBookingDeleteDialogOpen,
    labelPlural: app.currentBooking.labelPlural,
});

const mapDispatchToProps = (dispatch, {history}) => ({
    toggleDialog() {
        dispatch(toggleIsBookingDeleteDialogOpen());
    },
    handleCancel() {
        dispatch(toggleIsBookingDeleteDialogOpen());
    },
    handleDelete(labelPlural) {
        dispatch(toggleIsBookingDeleteDialogOpen());
        dispatch(deleteBookingIfNeeded());
        history.replace(`/bookings/${labelPlural}`);
    },
});

export default withMobileDialog()(connect(mapStateToProps, mapDispatchToProps)(BookingDeleteDialog));