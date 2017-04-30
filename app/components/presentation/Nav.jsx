import React from 'react';
import NavLink from '../nav/NavLink.jsx';

const Nav = (props) => (
    <div className="well well-sm clearfix">
        <ul className="nav nav-pills">
            <NavLink to={`/bookings/${props.booking}/current`}>Current</NavLink>
            <NavLink to={`/bookings/${props.booking}/past`}>Past</NavLink>
            <NavLink to={`/bookings/${props.booking}/new`}>Add</NavLink>
        </ul>
    </div>
);

export default Nav;

