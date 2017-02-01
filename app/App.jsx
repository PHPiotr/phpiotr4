import React, { Component } from 'react';
import {render} from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';
import Report from './components/Report.jsx';
import Buses from './components/bookings/Buses.jsx';
import Planes from './components/bookings/Planes.jsx';
import Trains from './components/bookings/Trains.jsx';
import Hostels from './components/bookings/Hostels.jsx';
import { AppContainer } from 'react-hot-loader';
import NavLink from './components/nav/NavLink.jsx';

class App extends Component {

    componentDidMount() {
        
    }

    render() {
        let navItems = (
                <ul className="nav navbar-nav">
                    <NavLink className="btn btn-link" to="/bookings/buses">Buses</NavLink>
                    <NavLink className="btn btn-link" to="/bookings/planes">Planes</NavLink>
                    <NavLink className="btn btn-link" to="/bookings/trains">Trains</NavLink>
                    <NavLink className="btn btn-link" to="/bookings/hostels">Hostels</NavLink>
                </ul>
        );
        return (
                <div>
                    <div className="navbar navbar-default">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <button type="button" className="collapsed navbar-toggle" data-toggle="collapse" data-target="#navbar-main" aria-expanded="false">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar" />
                                    <span className="icon-bar" />
                                    <span className="icon-bar" />
                                </button>
                                <Link className="navbar-brand" to="/">PHPiotr 4.0</Link>
                            </div>
                            <div className="collapse navbar-collapse" id="navbar-main">
                                {navItems}  
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        {this.props.children}
                    </div>
                </div>
        );
    }
};



export default App;



