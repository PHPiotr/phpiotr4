import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
import NavLink from './components/nav/NavLink.jsx';
import 'react-css-modules';
import 'bootstrap-css';
import './css/style.css';
import config from '../config';

class App extends Component {

    constructor(props) {
        super(props);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillUnmount() {
        this.props.socket.removeListener(config.event.auth_failed);
        this.props.socket.removeListener(config.event.token_received);
    }

    handleFocus(event) {
        this.props.callbacks.handleFocusDate(event);
    }

    handleBlur(event) {
        this.props.callbacks.handleBlurDate(event);
    }

    handleChange(event) {
        this.props.callbacks.handleChangeDate(event);
    }

    handleSubmit(event) {
        this.props.callbacks.handleSubmitDate(event);
    }

    render() {
        let propsChildren = this.props.children && React.cloneElement(this.props.children, {
                callbacks: this.props.callbacks,
                report: this.props.report,
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
                hostelInserted: this.props.hostelInserted,
                hostelErrorMessage: this.props.hostelErrorMessage,
                login: this.props.login,
                loginErrors: this.props.loginErrors,
                loginErrorMessage: this.props.loginErrorMessage,
            });
        let navItems = null;
        let searchItems = null;
        let navLoginItems = (
            <ul className="nav navbar-nav">
                <NavLink className="btn btn-link" to="/login">Login</NavLink>
                <NavLink className="btn btn-link" to="/register">Register</NavLink>
            </ul>
        );
        if (this.props.callbacks.handleIsLoggedIn()) {
            navItems = (
                <ul className="nav navbar-nav">
                    <NavLink className="btn btn-link" to="/bookings/buses">Buses</NavLink>
                    <NavLink className="btn btn-link" to="/bookings/planes">Planes</NavLink>
                    <NavLink className="btn btn-link" to="/bookings/trains">Trains</NavLink>
                    <NavLink className="btn btn-link" to="/bookings/hostels">Hostels</NavLink>
                </ul>
            );
            if (this.props.isDateFilterEnabled) {
                searchItems = (
                    <form onSubmit={this.handleSubmit} componentName={this.props.componentName}>
                        <div className="form-group">
                            <input onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange}
                                   type={this.props.fromDateFieldType} name="from" className="form-control"
                                   placeholder="From" value={this.props.fromDate}/>
                        </div>
                        <div className="form-group">
                            <input onFocus={this.handleFocus} onBlur={this.handleBlur} onChange={this.handleChange}
                                   type={this.props.toDateFieldType} name="to" className="form-control"
                                   placeholder="To" value={this.props.toDate}/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-default">Search</button>
                        </div>
                    </form>
                );
            }
            navLoginItems = (
                <ul className="nav navbar-nav navbar-right">
                    <NavLink className="btn btn-link" to="/logout">Logout</NavLink>
                </ul>
            );
        }

        return (
            <div>
                <div className="navbar navbar-default clearfix">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="collapsed navbar-toggle" data-toggle="collapse"
                                    data-target="#navbar-main" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"/>
                                <span className="icon-bar"/>
                                <span className="icon-bar"/>
                            </button>
                            <Link className="navbar-brand" to="/">PHPiotr 4.0</Link>
                        </div>
                        <div className="collapse navbar-collapse" id="navbar-main">
                            {navItems}
                            {searchItems}
                            {navLoginItems}
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    {propsChildren}
                </div>
            </div>
        );
    }
}

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
    login: PropTypes.object,
    loginErrors: PropTypes.object,
    loginErrorMessage: PropTypes.string,
};

App.defaultProps = {
    fromDateFieldType: 'text',
    toDateFieldType: 'text',
    isDateFilterEnabled: false,
};

App.displayName = 'App';

export default App;



