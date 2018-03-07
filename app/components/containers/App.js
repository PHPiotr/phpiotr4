import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {withRouter, Route, Switch} from 'react-router-dom';
import Navbar from '../presentation/Navbar';
import {withCookies} from 'react-cookie';
import {Helmet} from 'react-helmet';
import universal from 'react-universal-component';
import {HOME} from '../../constants';
import Auth from './Auth';
const Report = universal(() => import('./Report'));
const Profile = universal(() => import('./Profile'));
const Buses = universal(() => import('../presentation/BusesTable'));
const Planes = universal(() => import('../presentation/PlanesTable'));
const Trains = universal(() => import('../presentation/TrainsTable'));
const Hostels = universal(() => import('../presentation/HostelsTable'));
const Bus = universal(() => import('../presentation/BusForm'));
const Plane = universal(() => import('../presentation/PlaneForm'));
const Train = universal(() => import('../presentation/TrainForm'));
const Hostel = universal(() => import('../presentation/HostelForm'));
const Login = universal(() => import('./Login'));
const Registration = universal(() => import('./Registration'));
const Logout = universal(() => import('./Logout'));
const AccountRecovery = universal(() => import('./AccountRecovery'));
const PasswordReset = universal(() => import('./PasswordReset'));
const PasswordChange = universal(() => import('./PasswordChange'));
const NotFound = universal(() => import('./NotFound'));

class App extends Component {
    componentDidMount() {
        const jssStyles = document.getElementById('jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    render() {
        return (
            <Fragment>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{this.props.appBarTitle === HOME ? HOME : `${HOME} - ${this.props.appBarTitle}`}</title>
                </Helmet>
                <Navbar/>
                <Switch>
                    <Route exact path="/" component={Auth(Report)}/>
                    <Route name="profile" path="/profile" component={Auth(Profile)}/>
                    <Route name="login" path="/login" component={Login}/>
                    <Route name="register" path="/register/:userId?/:bearerToken?" component={Registration}/>
                    <Route name="logout" path="/logout" component={Logout}/>
                    <Route name="buses" path="/bookings/buses/:current?/:page?" component={Auth(Buses)}/>
                    <Route name="bus" path="/bookings/bus/:id?" component={Auth(Bus)}/>
                    <Route name="planes" path="/bookings/planes/:current?/:page?" component={Auth(Planes)}/>
                    <Route name="plane" path="/bookings/plane/:id?" component={Auth(Plane)}/>
                    <Route name="trains" path="/bookings/trains/:current?/:page?" component={Auth(Trains)}/>
                    <Route name="train" path="/bookings/train/:id?" component={Auth(Train)}/>
                    <Route name="hostels" path="/bookings/hostels/:current?/:page?" component={Auth(Hostels)}/>
                    <Route name="hostel" path="/bookings/hostel/:id?" component={Auth(Hostel)}/>
                    <Route name="account-recovery" path="/account-recovery" component={AccountRecovery}/>
                    <Route name="password-reset" path="/password-reset/:userId/:token" component={PasswordReset}/>
                    <Route name="password-change" path="/password-change" component={Auth(PasswordChange)}/>
                    <Route name="404" path="*" component={NotFound}/>
                </Switch>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({appBarTitle: state.app.appBarTitle});

export default withRouter(connect(mapStateToProps)(withCookies(App)));