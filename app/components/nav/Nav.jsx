import React, { Component } from 'react';
import NavLink from './NavLink.jsx';

class Nav extends Component {
    render(){
        return(
            <div className="well well-sm clearfix">
                <ul className="nav nav-pills">
                    <NavLink to={"/bookings/" + this.props.booking + "/current"}>Current</NavLink>
                    <NavLink to={"/bookings/" + this.props.booking + "/past"}>Past</NavLink>
                    <NavLink to={"/bookings/" + this.props.booking + "/new"}>Add</NavLink>
                </ul>
            </div>
        );
    };
};

export default Nav;

