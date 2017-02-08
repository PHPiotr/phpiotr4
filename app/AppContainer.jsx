import React from 'react';
import {render} from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import AppWrapper from './AppWrapper.jsx';
import App from './App.jsx';
import Report from './components/Report.jsx';
import Buses from './components/bookings/Buses.jsx';
import Planes from './components/bookings/Planes.jsx';
import Trains from './components/bookings/Trains.jsx';
import Hostels from './components/bookings/Hostels.jsx';
import BusesCurrent from './components/bookings/BusesCurrent.jsx';
import PlanesCurrent from './components/bookings/PlanesCurrent.jsx';
import TrainsCurrent from './components/bookings/TrainsCurrent.jsx';
import HostelsCurrent from './components/bookings/HostelsCurrent.jsx';
import BusesPast from './components/bookings/BusesPast.jsx';
import PlanesPast from './components/bookings/PlanesPast.jsx';
import TrainsPast from './components/bookings/TrainsPast.jsx';
import HostelsPast from './components/bookings/HostelsPast.jsx';
import BusesNew from './components/bookings/BusesNew.jsx';
import PlanesNew from './components/bookings/PlanesNew.jsx';
import TrainsNew from './components/bookings/TrainsNew.jsx';
import HostelsNew from './components/bookings/HostelsNew.jsx';
import { AppContainer } from 'react-hot-loader';

let appContainer = (
        <AppContainer>
            <Router history={browserHistory}>
                <Route component={AppWrapper}>
                    <Route path="/" component={App}>
                        <IndexRoute component={Report} />
                        <Route name="buses" path="bookings/buses" component={Buses}>
                            <Route path="current" component={BusesCurrent}>
                                <Route path=":page" component={BusesCurrent}/ >
                            </Route>
                            <Route path="past" component={BusesPast}>
                                <Route path=":page" component={BusesPast}/ >
                            </Route>
                            <Route path="new" component={BusesNew} />
                        </Route>
                        <Route name="planes" path="bookings/planes" component={Planes}>
                            <Route path="current" component={PlanesCurrent}>
                                <Route path=":page" component={PlanesCurrent}/ >
                            </Route>
                            <Route path="past" component={PlanesPast}>
                                <Route path=":page" component={PlanesPast}/ >
                            </Route>
                            <Route path="new" component={PlanesNew} />
                        </Route>
                        <Route name="trains" path="bookings/trains" component={Trains}>
                            <Route path="current(/:page)" component={TrainsCurrent}>
                                <Route path=":page" component={TrainsCurrent}/ >
                            </Route>
                            <Route path="past(/:page)" component={TrainsPast}>
                                <Route path=":page" component={TrainsPast}/ >
                            </Route>
                            <Route path="new" component={TrainsNew} />
                        </Route>
                        <Route name="hostels" path="bookings/hostels" component={Hostels}>
                            <Route path="current(/:page)" component={HostelsCurrent}>
                                <Route path=":page" component={HostelsCurrent}/ >
                            </Route>
                            <Route path="past(/:page)" component={HostelsPast}>
                                <Route path=":page" component={HostelsPast}/ >
                            </Route>
                            <Route path="new" component={HostelsNew} />
                        </Route>
                    </Route>
                </Route>
            </Router>
        </AppContainer>
);

render(appContainer, document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
}