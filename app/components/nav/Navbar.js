import React from 'react';
import DateFilterForm from '../containers/DateFilter';
import {Link, withRouter} from 'react-router-dom';
import {AppBar, IconButton, Drawer, Typography, Toolbar} from 'material-ui';
import {Menu} from 'material-ui-icons';
import {toggleIsDrawerOpen} from '../../actions/appActions';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import {connect} from 'react-redux';
import {verifyIfNeeded, VERIFY_SUCCESS} from '../../actions/verify';
import getHeaders from '../../getHeaders';

let Navbar = (props) => {

    let navItems = null;
    let navLoginItems = (
        <List>
            <ListItem button><Link to={'/login'}>Login</Link></ListItem>
            <ListItem button><Link to={'/register'}>Register</Link></ListItem>
        </List>
    );
    if (props.isLoggedIn) {
        navItems = (
            <List>
                <ListItem button><Link onClick={props.verify} to={'/bookings/buses'}>Buses</Link></ListItem>
                <ListItem button><Link onClick={props.verify} to={'/bookings/planes'}>Planes</Link></ListItem>
                <ListItem button><Link onClick={props.verify} to={'/bookings/trains'}>Trains</Link></ListItem>
                <ListItem button><Link onClick={props.verify} to={'/bookings/hostels'}>Hostels</Link></ListItem>
            </List>
        );
        navLoginItems = (
            <List>
                <ListItem button><Link to={'/logout'}>Logout</Link></ListItem>
            </List>
        );
    }

    return (
        <AppBar>
            <Toolbar>
                <IconButton onClick={props.toggleIsDrawerOpen}><Menu style={{color: 'white'}} /></IconButton>
                <Typography type="title" color="inherit">{props.appBarTitle}</Typography>
            </Toolbar>
            <Drawer open={props.isDrawerOpen} onRequestClose={props.toggleIsDrawerOpen}>
                <Typography type="subheading" color="inherit">
                    {navItems}
                    <DateFilterForm {...props}/>
                    {navLoginItems}
                </Typography>
            </Drawer>
        </AppBar>
    );
};

const mapStateToProps = (state) => {
    const {appReducer: {isDrawerOpen, appBarTitle}, dateFilter, auth: {isLoggedIn}, bookings: {bus, plane, train, hostel}} = state;
    return {
        isDrawerOpen,
        appBarTitle,
        isLoggedIn,
        dateFilter,
        isBusBeingAdded: bus.isAdd,
        isPlaneBeingAdded: plane.isAdd,
        isTrainBeingAdded: train.isAdd,
        isHostelBeingAdded: hostel.isAdd,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        verify() {
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
            });
        },
        toggleIsDrawerOpen() {
            console.log(11111);
            dispatch(toggleIsDrawerOpen());
        },
    };
};
Navbar = withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));

export default Navbar;