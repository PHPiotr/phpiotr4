import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {AppBar, IconButton, Drawer, Typography, Toolbar} from 'material-ui';
import {Menu} from 'material-ui-icons';
import {toggleIsDrawerOpen} from '../../actions/appActions';
import List, {ListItem} from 'material-ui/List';
import {connect} from 'react-redux';

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
                <ListItem button><Link to={'/bookings/buses'}>Buses</Link></ListItem>
                <ListItem button><Link to={'/bookings/planes'}>Planes</Link></ListItem>
                <ListItem button><Link to={'/bookings/trains'}>Trains</Link></ListItem>
                <ListItem button><Link to={'/bookings/hostels'}>Hostels</Link></ListItem>
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
                <Typography type="title" color="inherit">
                    <Link style={{color: '#fff', textDecoration: 'none'}} to={'/'}>{props.appBarTitle}</Link>
                </Typography>
            </Toolbar>
            <Drawer open={props.isDrawerOpen} onRequestClose={props.toggleIsDrawerOpen}>
                <Typography type="subheading" color="inherit">
                    <div onClick={props.toggleIsDrawerOpen}>{navItems}</div>
                    <div onClick={props.toggleIsDrawerOpen}>{navLoginItems}</div>
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

const mapDispatchToProps = (dispatch) => {
    return {
        toggleIsDrawerOpen() {
            dispatch(toggleIsDrawerOpen());
        },
    };
};
Navbar = withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));

export default Navbar;