import React from 'react';
import DateFilterForm from '../helper/DateFilterForm';
import {Link} from 'react-router';
import NavLink from './NavLink.jsx';
import {connect} from 'react-redux';

let Navbar = (props) => {

    let navItems = null;
    let navLoginItems = (
        <ul className="nav navbar-nav">
            <NavLink className="btn btn-link" to="/login">Login</NavLink>
            <NavLink className="btn btn-link" to="/register">Register</NavLink>
        </ul>
    );
    if (props.isLoggedIn) {
        navItems = (
            <ul className="nav navbar-nav">
                <NavLink className="btn btn-link" to="/bookings/buses">Buses</NavLink>
                <NavLink className="btn btn-link" to="/bookings/planes">Planes</NavLink>
                <NavLink className="btn btn-link" to="/bookings/trains">Trains</NavLink>
                <NavLink className="btn btn-link" to="/bookings/hostels">Hostels</NavLink>
            </ul>
        );
        navLoginItems = (
            <ul className="nav navbar-nav navbar-right">
                <NavLink className="btn btn-link" to="/logout">Logout</NavLink>
            </ul>
        );
    }

    return (
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
                    <DateFilterForm {...props}/>
                    {navLoginItems}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isLoggedIn,
    dateFilter: state.dateFilter,
});
Navbar = connect(mapStateToProps)(Navbar);

export default Navbar;