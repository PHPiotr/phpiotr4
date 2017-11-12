import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {AppBar, IconButton, Drawer, Typography, Toolbar} from 'material-ui';
import {Menu} from 'material-ui-icons';
import {toggleIsDrawerOpen} from '../../actions/appActions';
import List, {ListItem} from 'material-ui/List';
import {connect} from 'react-redux';
import {withStyles} from 'material-ui/styles';
import Divider from 'material-ui/Divider';

const styles = ({palette}) => ({
    list: {
        width: 250,
    },
    listFull: {
        width: 'auto',
    },
    link: {
        textDecoration: 'none',
        color: palette.primary,
    }
});

const Navbar = (props) => {

    const {classes} = props;

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
                    <div className={classes.list} onClick={props.toggleIsDrawerOpen}>{
                        !props.isLoggedIn ? (
                            <List>
                                <ListItem button><Link className={classes.link} to={'/login'}>Login</Link></ListItem>
                                <ListItem button><Link className={classes.link} to={'/register'}>Register</Link></ListItem>
                            </List>
                        ) : (
                            <List>
                                <ListItem button><Link className={classes.link} to={'/'}>Report</Link></ListItem>
                                <Divider/>
                                <ListItem button><Link className={classes.link} to={'/bookings/buses'}>Buses</Link></ListItem>
                                <ListItem button><Link className={classes.link} to={'/bookings/planes'}>Planes</Link></ListItem>
                                <ListItem button><Link className={classes.link} to={'/bookings/trains'}>Trains</Link></ListItem>
                                <ListItem button><Link className={classes.link} to={'/bookings/hostels'}>Hostels</Link></ListItem>
                                <Divider/>
                                <ListItem button><Link className={classes.link} to={'/logout'}>Logout</Link></ListItem>
                            </List>
                        )
                    }</div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Navbar)));