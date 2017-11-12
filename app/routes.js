import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Report from './components/containers/Report';
import Buses from './components/containers/Buses';
import Planes from './components/containers/Planes';
import Trains from './components/containers/Trains';
import Hostels from './components/containers/Hostels';
import Bus from './components/containers/Bus';
import Plane from './components/containers/Plane';
import Train from './components/containers/Train';
import Hostel from './components/containers/Hostel';
import Login from './components/containers/Login';
import Registration from './components/containers/Registration';
import Logout from './components/containers/Logout';
import Auth from './components/containers/Auth';
import NoAuth from './components/containers/NoAuth';

const routes = () => (
    <Switch>
        <Route exact path="/" component={Auth(Report)}/>
        <Route name="login" path="/login" component={NoAuth(Login)}/>
        <Route name="register" path="/register" component={NoAuth(Registration)}/>
        <Route name="logout" path="/logout" component={Logout}/>
        <Route name="buses" path="/bookings/buses/:current?/:page?" component={Auth(Buses)}/>
        <Route name="bus" path="/bookings/bus/:id?" component={Auth(Bus)}/>
        <Route name="planes" path="/bookings/planes/:current?/:page?" component={Auth(Planes)}/>
        <Route name="plane" path="/bookings/plane/:id?" component={Auth(Plane)}/>
        <Route name="trains" path="/bookings/trains/:current?/:page?" component={Auth(Trains)}/>
        <Route name="train" path="/bookings/train/:id?" component={Auth(Train)}/>
        <Route name="hostels" path="/bookings/hostels/:current?/:page?" component={Auth(Hostels)}/>
        <Route name="hostel" path="/bookings/hostel/:id?" component={Auth(Hostel)}/>
    </Switch>
);

export default routes;