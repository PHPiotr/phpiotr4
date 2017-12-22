import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {AppBar, Drawer, Typography, Toolbar} from 'material-ui';
import {toggleIsDrawerOpen} from '../../actions/app/appActions';
import List, {ListItem, ListItemIcon} from 'material-ui/List';
import {connect} from 'react-redux';
import {withStyles} from 'material-ui/styles';
import Divider from 'material-ui/Divider';
import ToolbarIconButtonLeft from './ToolbarIconButtonLeft';
import ToolbarIconButtonRight from './ToolbarIconButtonRight';
import ReportIcon from 'material-ui-icons/Home';
import BusIcon from 'material-ui-icons/DirectionsBus';
import PlaneIcon from 'material-ui-icons/Flight';
import TrainIcon from 'material-ui-icons/Train';
import HostelIcon from 'material-ui-icons/Hotel';
import SignInIcon from 'material-ui-icons/Input';
import SignUpIcon from 'material-ui-icons/PersonAdd';
import SignoutIcon from 'material-ui-icons/ExitToApp';

const styles = ({palette}) => ({
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
                <ToolbarIconButtonRight {...props}/>
            </Toolbar>
            <Drawer open={props.isDrawerOpen} onClose={props.toggleIsDrawerOpen}>
                <Typography type="subheading" color="inherit">
                    <div className={classes.list} onClick={props.toggleIsDrawerOpen}>{
                        !props.isLoggedIn ? (
                            <List>
                                <ListItem button>
                                    <ListItemIcon><SignInIcon/></ListItemIcon>
                                    <Link className={classes.link} to={'/login'}>Sign in</Link>
                                </ListItem>
                                <ListItem button>
                                    <ListItemIcon><SignUpIcon/></ListItemIcon>
                                    <Link className={classes.link} to={'/register'}>Sign up</Link>
                                </ListItem>
                            </List>
                        ) : (
                            <List>
                                <ListItem button>
                                    <ListItemIcon><ReportIcon/></ListItemIcon>
                                    <Link className={classes.link} to={'/'}>Report</Link>
                                </ListItem>
                                <Divider/>
                                <ListItem button>
                                    <ListItemIcon><BusIcon/></ListItemIcon>
                                    <Link className={classes.link} to={'/bookings/buses'}>Buses</Link>
                                </ListItem>
                                <ListItem button>
                                    <ListItemIcon><PlaneIcon/></ListItemIcon>
                                    <Link className={classes.link} to={'/bookings/planes'}>Planes</Link>
                                </ListItem>
                                <ListItem button>
                                    <ListItemIcon><TrainIcon/></ListItemIcon>
                                    <Link className={classes.link} to={'/bookings/trains'}>Trains</Link>
                                </ListItem>
                                <ListItem button>
                                    <ListItemIcon><HostelIcon/></ListItemIcon>
                                    <Link className={classes.link} to={'/bookings/hostels'}>Hostels</Link>
                                </ListItem>
                                <Divider/>
                                <ListItem button>
                                    <ListItemIcon><SignoutIcon/></ListItemIcon>
                                    <Link className={classes.link} to={'/logout'}>Sign out</Link>
                                </ListItem>
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