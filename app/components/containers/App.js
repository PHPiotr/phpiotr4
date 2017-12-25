import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Route, Switch} from 'react-router-dom';
import Navbar from '../presentation/Navbar';
import {withCookies} from 'react-cookie';
import universal from 'react-universal-component';

const Report = universal(() => import('./Report'));
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
const NotFound = universal(() => import('./NotFound'));

class App extends Component {
    componentDidMount() {
        const jssStyles = document.getElementById('jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    render() {
        return [
            <Navbar key={1}/>,
            <div key={2} style={{paddingTop: 70}}>
                <Switch>
                    <Route exact path="/" component={Report}/>
                    <Route name="login" path="/login" component={Login}/>
                    <Route name="register" path="/register/:userId?/:bearerToken?" component={Registration}/>
                    <Route name="logout" path="/logout" component={Logout}/>
                    <Route name="buses" path="/bookings/buses/:current?/:page?" component={Buses}/>
                    <Route name="bus" path="/bookings/bus/:id?" component={Bus}/>
                    <Route name="planes" path="/bookings/planes/:current?/:page?" component={Planes}/>
                    <Route name="plane" path="/bookings/plane/:id?" component={Plane}/>
                    <Route name="trains" path="/bookings/trains/:current?/:page?" component={Trains}/>
                    <Route name="train" path="/bookings/train/:id?" component={Train}/>
                    <Route name="hostels" path="/bookings/hostels/:current?/:page?" component={Hostels}/>
                    <Route name="hostel" path="/bookings/hostel/:id?" component={Hostel}/>
                    <Route name="account-recovery" path="/users/account-recovery" component={AccountRecovery}/>
                    <Route name="404" path="*" component={NotFound}/>
                </Switch>
            </div>,
        ];
    }
}

export default withRouter(connect()(withCookies(App)));