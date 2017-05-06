import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import AppWrapper from './AppWrapper.jsx';
import App from './App.jsx';
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
import Logout from './components/containers/Logout';

const AppRouter = () => (
    <Router history={browserHistory}>
        <Route component={AppWrapper}>
            <Route path="(/:from)(/:to)" component={App}>
                <Route name="login" path="login" component={Login}/>
                <IndexRoute component={Report}/>
                <Route name="logout" path="logout" component={Logout}/>
                <Route name="buses" path="bookings/buses" component={Buses}>
                    <Route name="buses" path=":current" component={Buses}>
                        <Route name="buses" path=":page" component={Buses}/>
                    </Route>
                </Route>
                <Route name="bus" path="bookings/bus" component={Bus}>
                    <Route name="bus" path=":id" component={Bus} />
                </Route>

                <Route name="planes" path="bookings/planes" component={Planes}>
                    <Route name="planes" path=":current" component={Planes}>
                        <Route name="planes" path=":page" component={Planes}/>
                    </Route>
                </Route>
                <Route name="plane" path="bookings/plane" component={Plane}>
                    <Route name="plane" path=":id" component={Plane} />
                </Route>

                <Route name="trains" path="bookings/trains" component={Trains}>
                    <Route name="trains" path=":current" component={Trains}>
                        <Route name="trains" path=":page" component={Trains}/>
                    </Route>
                </Route>
                <Route name="train" path="bookings/train" component={Train}>
                    <Route name="train" path=":id" component={Train} />
                </Route>

                <Route name="hostels" path="bookings/hostels" component={Hostels}>
                    <Route name="hostels" path=":current" component={Hostels}>
                        <Route name="hostels" path=":page" component={Hostels}/>
                    </Route>
                </Route>
                <Route name="hostel" path="bookings/hostel" component={Hostel}>
                    <Route name="hostel" path=":id" component={Hostel} />
                </Route>
            </Route>
        </Route>
    </Router>
);

export default AppRouter;