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
import ProfileIcon from 'material-ui-icons/Person';
import BusIcon from 'material-ui-icons/DirectionsBus';
import PlaneIcon from 'material-ui-icons/Flight';
import TrainIcon from 'material-ui-icons/Train';
import HostelIcon from 'material-ui-icons/Hotel';
import SignInIcon from 'material-ui-icons/Input';
import SignUpIcon from 'material-ui-icons/PersonAdd';
import SignoutIcon from 'material-ui-icons/ExitToApp';
import {formStyles as styles} from '../../utils/styles';

const Navbar = (props) => {

    const {classes} = props;

    return (
        <AppBar position="sticky">
            <Toolbar>
                <ToolbarIconButtonLeft {...props}/>
                <Typography type="title" color="inherit">{props.appBarTitle}</Typography>
                <ToolbarIconButtonRight {...props}/>
            </Toolbar>
            <Drawer open={props.isDrawerOpen} onClose={props.toggleIsDrawerOpen}>
                <div className={classes.list} onClick={props.toggleIsDrawerOpen}>{
                    !props.isLoggedIn ? (
                        <List>
                            <ListItem button>
                                <ListItemIcon><SignInIcon/></ListItemIcon>
                                <Link className={classes.link} to={'/login'}>
                                    <Typography variant="subheading">Sign in</Typography>
                                </Link>
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon><SignUpIcon/></ListItemIcon>
                                <Link className={classes.link} to={'/register'}>
                                    <Typography variant="subheading">Sign up</Typography>
                                </Link>
                            </ListItem>
                        </List>
                    ) : (
                        <List>
                            <ListItem button>
                                <ListItemIcon><ReportIcon/></ListItemIcon>
                                <Link className={classes.link} to={'/'}>
                                    <Typography variant="subheading">Report</Typography>
                                </Link>
                            </ListItem>
                            <Divider/>
                            <ListItem button>
                                <ListItemIcon><ProfileIcon/></ListItemIcon>
                                <Link className={classes.link} to={'/profile'}>
                                    <Typography variant="subheading">Profile</Typography>
                                </Link>
                            </ListItem>
                            <Divider/>
                            <ListItem button>
                                <ListItemIcon><BusIcon/></ListItemIcon>
                                <Link className={classes.link} to={'/bookings/buses/current'}>
                                    <Typography variant="subheading">Buses</Typography>
                                </Link>
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon><PlaneIcon/></ListItemIcon>
                                <Link className={classes.link} to={'/bookings/planes/current'}>
                                    <Typography variant="subheading">Planes</Typography>
                                </Link>
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon><TrainIcon/></ListItemIcon>
                                <Link className={classes.link} to={'/bookings/trains/current'}>
                                    <Typography variant="subheading">Trains</Typography>
                                </Link>
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon><HostelIcon/></ListItemIcon>
                                <Link className={classes.link} to={'/bookings/hostels/current'}>
                                    <Typography variant="subheading">Hostels</Typography>
                                </Link>
                            </ListItem>
                            <Divider/>
                            <ListItem button>
                                <ListItemIcon><SignoutIcon/></ListItemIcon>
                                <Link className={classes.link} to={'/logout'}>
                                    <Typography variant="subheading">Sign out</Typography>
                                </Link>
                            </ListItem>
                        </List>
                    )
                }
                </div>
            </Drawer>
        </AppBar>
    );
};

const mapStateToProps = ({app: {isDrawerOpen, appBarTitle}, bookings: {currentBooking}, dateFilter, auth: {isLoggedIn}}) => ({
    isDrawerOpen,
    appBarTitle,
    isLoggedIn,
    dateFilter,
    labelPlural: (currentBooking && currentBooking.labelPlural) || '',
});

const mapDispatchToProps = (dispatch) => {
    return {
        toggleIsDrawerOpen() {
            dispatch(toggleIsDrawerOpen());
        },
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Navbar)));