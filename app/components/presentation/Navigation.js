import React from 'react';
import NavLink from '../nav/NavLink.jsx';

const Navigation = (props) => {
    return (
        <div className="well well-sm clearfix">
            <ul className="nav nav-pills">
                <NavLink onClick={props.fetchBookings.bind(this, 'current')}
                         to={`/bookings/${props.bookingsLabel}/current`}>Current</NavLink>
                <NavLink onClick={props.fetchBookings.bind(this, 'past')}
                         to={`/bookings/${props.bookingsLabel}/past`}>Past</NavLink>
                <NavLink to={`/bookings/${props.bookingLabel}`}>Add</NavLink>
            </ul>
        </div>
    );
};

export default Navigation