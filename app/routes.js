import React from 'react';
import {Route, Switch} from 'react-router-dom';
import universal from 'react-universal-component';
const Report = universal(() => import('./components/containers/Report'));
const Buses = universal(() => import('./components/presentation/BusesTable'));
const Planes = universal(() => import('./components/presentation/PlanesTable'));
const Trains = universal(() => import('./components/presentation/TrainsTable'));
const Hostels = universal(() => import('./components/presentation/HostelsTable'));
import Bus from './components/presentation/BusForm';
import Plane from './components/presentation/PlaneForm';
import Train from './components/presentation/TrainForm';
import Hostel from './components/presentation/HostelForm';
import Login from './components/containers/Login';
import Registration from './components/containers/Registration';
import Logout from './components/containers/Logout';
import Auth from './components/containers/Auth';
import Booking from './components/containers/Booking';
import NoAuth from './components/containers/NoAuth';

const routes = () => (
    <Switch>
        <Route exact path="/" component={Report}/>
        <Route name="login" path="/login" component={NoAuth(Login)}/>
        <Route name="register" path="/register/:userId?/:bearerToken?" component={NoAuth(Registration)}/>
        <Route name="logout" path="/logout" component={Logout}/>
        <Route name="buses" path="/bookings/buses/:current?/:page?" component={Buses}/>
        <Route name="bus" path="/bookings/bus/:id?" component={Auth(Booking(Bus))}/>
        <Route name="planes" path="/bookings/planes/:current?/:page?" component={Planes}/>
        <Route name="plane" path="/bookings/plane/:id?" component={Auth(Booking(Plane))}/>
        <Route name="trains" path="/bookings/trains/:current?/:page?" component={Trains}/>
        <Route name="train" path="/bookings/train/:id?" component={Auth(Booking(Train))}/>
        <Route name="hostels" path="/bookings/hostels/:current?/:page?" component={Hostels}/>
        <Route name="hostel" path="/bookings/hostel/:id?" component={Auth(Booking(Hostel))}/>
    </Switch>
);

export default routes;