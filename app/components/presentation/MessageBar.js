import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';

const MessageBar = (props) => {
    return (
        <Snackbar
            autoHideDuration={props.autohide}
            anchorOrigin={{vertical: props.vertical, horizontal: props.horizontal}}
            open={props.open}
            onClose={props.onClose}
            SnackbarContentProps={{'aria-describedby': 'message-id'}}
            message={<span id="message-id">{props.message}</span>}
        />
    );
};

MessageBar.propTypes = {
    autohide: PropTypes.number,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    message: PropTypes.string.isRequired,
    vertical: PropTypes.string,
    horizontal: PropTypes.string,
};

MessageBar.defaultProps = {
    autohide: 4000,
    open: false,
    onClose: null,
    vertical: 'bottom',
    horizontal: 'center',
};

export default MessageBar;
