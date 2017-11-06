import React from 'react';
import DateFilterForm from '../containers/DateFilter';
import {Link, withRouter} from 'react-router-dom';
import NavLink from './NavLink';
import {connect} from 'react-redux';
import {verifyIfNeeded, VERIFY_SUCCESS} from '../../actions/verify';
import getHeaders from '../../getHeaders';

let Navbar = (props) => {

    let navItems = null;
    let navLoginItems = (
        <ul className="navbar-nav mr-auto">
            <NavLink className="btn btn-link" to="/login">Login</NavLink>
            <NavLink className="btn btn-link" to="/register">Register</NavLink>
        </ul>
    );
    if (props.isLoggedIn) {

        let navItemsClass = 'navbar-nav';
        if (!props.dateFilter.isDateFilterEnabled) {
            navItemsClass += ' mr-auto';
        }

        navItems = (
            <ul className={navItemsClass}>
                <NavLink onClick={props.verify} current={props.isBusBeingAdded} className="btn btn-link" to="/bookings/buses">Buses</NavLink>
                <NavLink onClick={props.verify} current={props.isPlaneBeingAdded} className="btn btn-link" to="/bookings/planes">Planes</NavLink>
                <NavLink onClick={props.verify} current={props.isTrainBeingAdded} className="btn btn-link" to="/bookings/trains">Trains</NavLink>
                <NavLink onClick={props.verify} current={props.isHostelBeingAdded} className="btn btn-link" to="/bookings/hostels">Hostels</NavLink>
            </ul>
        );
        navLoginItems = (
            <ul className="navbar-nav navbar-right">
                <NavLink className="btn btn-link" to="/logout">Logout</NavLink>
            </ul>
        );
    }

    return (
        <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                data-target="#navbar-main" aria-controls="navbar-main" aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <Link className="navbar-brand" to="/">PHPiotr 4.0</Link>

            <div className="collapse navbar-collapse" id="navbar-main">
                {navItems}
                <DateFilterForm {...props}/>
                {navLoginItems}
            </div>
        </nav>
    );
};

const mapStateToProps = (state) => {
    const {dateFilter, auth: {isLoggedIn}, bookings: {bus, plane, train, hostel}} = state;
    return {
        isLoggedIn,
        dateFilter,
        isBusBeingAdded: bus.isAdd,
        isPlaneBeingAdded: plane.isAdd,
        isTrainBeingAdded: train.isAdd,
        isHostelBeingAdded: hostel.isAdd,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        verify() {
            dispatch(verifyIfNeeded(getHeaders())).then((json) => {
                if (json === undefined) {
                    return ownProps.history.push('/login');
                }
                if (json.type === undefined) {
                    return ownProps.history.push('/login');
                }
                if (json.type !== VERIFY_SUCCESS) {
                    return ownProps.history.push('/login');
                }
            });
        },
    };
};
Navbar = withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));

export default Navbar;