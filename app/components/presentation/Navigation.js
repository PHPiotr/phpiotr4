import React from 'react';
import NavLink from '../nav/NavLink';

const Navigation = (props) => {
    return (
        <div className="well well-sm clearfix">
            <ul className="nav nav-pills">
                <NavLink current={props[props.bookingsLabel] !== undefined && props[props.bookingsLabel].data.active === 'current'} onClick={props.fetchBookings.bind(this, 'current')}
                         to={`/bookings/${props.bookingsLabel}/current`}>Current</NavLink>
                <NavLink current={props[props.bookingsLabel] !== undefined && props[props.bookingsLabel].data.active === 'past'} onClick={props.fetchBookings.bind(this, 'past')}
                         to={`/bookings/${props.bookingsLabel}/past`}>Past</NavLink>
                <NavLink to={`/bookings/${props.bookingLabel}`}>Add</NavLink>
            </ul>
        </div>
    );
};

export default Navigation