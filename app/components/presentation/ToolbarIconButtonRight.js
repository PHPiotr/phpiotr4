import React from 'react';
import {IconButton} from 'material-ui';
import {Menu, ArrowBack} from 'material-ui-icons';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

const ToolbarIconButtonRight = ({showArrowBack, history, toggleIsDrawerOpen}) => {
    if (showArrowBack) {
        return (
            <IconButton onClick={() => history.goBack()}>
                <ArrowBack style={{color: 'white'}} />
            </IconButton>
        );
    }
    return (
        <IconButton onClick={toggleIsDrawerOpen}>
            <Menu style={{color: 'white'}} />
        </IconButton>
    );
};

const mapStateToProps = ({bookings: {bus, plane, train, hostel}}) => ({
    showArrowBack: bus.isAdd || plane.isAdd || train.isAdd || hostel.isAdd,
});

export default withRouter(connect(mapStateToProps)(ToolbarIconButtonRight));