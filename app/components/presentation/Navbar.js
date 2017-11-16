import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {AppBar, Drawer, Typography, Toolbar} from 'material-ui';
import {toggleIsDrawerOpen} from '../../actions/app/appActions';
import List, {ListItem} from 'material-ui/List';
import {connect} from 'react-redux';
import {withStyles} from 'material-ui/styles';
import Divider from 'material-ui/Divider';
import ToolbarIconButtonLeft from './ToolbarIconButtonLeft';

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
    },
});

const Navbar = (props) => {

    const {classes} = props;

    return (
        <AppBar>
            <Toolbar>
                <ToolbarIconButtonLeft {...props}/>
                <Typography type="title" color="inherit">{props.appBarTitle}</Typography>
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

const mapStateToProps = ({appReducer: {isDrawerOpen, appBarTitle}, dateFilter, auth: {isLoggedIn}}) => ({
    isDrawerOpen,
    appBarTitle,
    isLoggedIn,
    dateFilter,
});

const mapDispatchToProps = (dispatch) => {
    return {
        toggleIsDrawerOpen() {
            dispatch(toggleIsDrawerOpen());
        },
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Navbar)));