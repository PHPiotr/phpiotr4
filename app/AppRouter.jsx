import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import AppWrapper from './AppWrapper.jsx';
import App from './App.jsx';
import Report from './components/containers/Report';
import Buses from './components/containers/Buses';
import Planes from './components/containers/Planes';
import Trains from './components/containers/Trains';
import Hostels from './components/containers/Hostels';
import BusesNew from './components/bookings/BusesNew.jsx';
import PlanesNew from './components/bookings/PlanesNew.jsx';
import TrainsNew from './components/bookings/TrainsNew.jsx';
import HostelsNew from './components/bookings/HostelsNew.jsx';
import Login from './components/auth/Login.jsx';
import Logout from './components/auth/Logout.jsx';
import Register from './components/auth/Register.jsx';

const AppRouter = () => (
    <Router history={browserHistory}>
        <Route component={AppWrapper}>
            <Route path="(/:from)(/:to)" component={App}>
                <Route name="login" path="login" component={Login}/>
                <Route name="register" path="register" component={Register}/>
                <IndexRoute component={Report}/>
                <Route name="logout" path="logout" component={Logout}/>
                <Route name="buses" path="bookings/buses" component={Buses}>
                    <Route name="buses" path=":current" component={Buses}>
                        <Route name="buses" path=":page" component={Buses} />
                    </Route>
                </Route>
                <Route name="busesNew" path="bookings/new/buses" component={BusesNew}/>
                
                <Route name="planes" path="bookings/planes" component={Planes}>
                    <Route name="planes" path=":current" component={Planes}>
                        <Route name="planes" path=":page" component={Planes} />
                    </Route>
                </Route>
                <Route name="planesNew" path="bookings/new/planes" component={PlanesNew}/>
                
                <Route name="trains" path="bookings/trains" component={Trains}>
                    <Route name="trains" path=":current" component={Trains}>
                        <Route name="trains" path=":page" component={Trains} />
                    </Route>
                </Route>
                <Route name="trainsNew" path="bookings/new/trains" component={TrainsNew}/>
                
                <Route name="hostels" path="bookings/hostels" component={Hostels}>
                    <Route name="hostels" path=":current" component={Hostels}>
                        <Route name="hostels" path=":page" component={Hostels} />
                    </Route>
                </Route>
                <Route name="hostelsNew" path="bookings/new/hostels" component={HostelsNew}/>
            </Route>
        </Route>
    </Router>
);

export default AppRouter;