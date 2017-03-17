import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
import NavLink from './components/nav/NavLink.jsx';

class App extends Component {

    render() {
        let propsChildren = this.props.children && React.cloneElement(this.props.children, {
            callbacks: this.props.callbacks,
            socket: this.props.socket,
            planes: this.props.planes,
            plane: this.props.plane,
            planeErrors: this.props.planeErrors,
            planeErrorMessage: this.props.planeErrorMessage,
            planeInserted: this.props.planeInserted,
            buses: this.props.buses,
            bus: this.props.bus,
            busErrors: this.props.busErrors,
            busErrorMessage: this.props.busErrorMessage,
            busInserted: this.props.busInserted,
            trains: this.props.trains,
            train: this.props.train,
            trainErrors: this.props.trainErrors,
            trainErrorMessage: this.props.trainErrorMessage,
            trainInserted: this.props.trainInserted,
            hostels: this.props.hostels,
            hostel: this.props.hostel,
            hostelErrors: this.props.hostelErrors,
            hostelErrorMessage: this.props.hostelErrorMessage,
            hostelInserted: this.props.hostelInserted,
        });
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
                        {propsChildren}
                    </div>
                </div>
        );
    }
};

App.propTypes = {
    planes: PropTypes.object,
    planeErrors: PropTypes.object,
    planeErrorMessage: PropTypes.string,
    buses: PropTypes.object,
    busErrors: PropTypes.object,
    busErrorMessage: PropTypes.string,
    trains: PropTypes.object,
    trainErrors: PropTypes.object,
    trainErrorMessage: PropTypes.string,
    hostels: PropTypes.object,
    hostelErrors: PropTypes.object,
    hostelErrorMessage: PropTypes.string,
};

export default App;



