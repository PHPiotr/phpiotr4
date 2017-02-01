import React, { Component } from 'react';
import NavLink from './NavLink.jsx';

class Nav extends Component {
    render(){
        return(
            <div className="well well-sm">
                <ul className="nav nav-pills">
                    <NavLink to={"/bookings/" + this.props.booking + "/current"}>Current bookings</NavLink>
                    <NavLink to={"/bookings/" + this.props.booking + "/past"}>Past bookings</NavLink>
                    <NavLink to={"/bookings/" + this.props.booking + "/new"}>Add booking</NavLink>
                </ul>
            </div>
        );
    };
};

export default Nav;

