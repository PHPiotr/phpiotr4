import React from 'react';
import NavLink from '../nav/NavLink';

const Pagination = (props) => {

    if (props[props.bookingsLabel].data === undefined) {
        return null;
    }

    let bookings = props[props.bookingsLabel].data;

    if (bookings.pages_count <= 1) {
        return null;
    }

    let pages_count = bookings.pages_count;
    let active = bookings.active;
    let pages_counter = [];
    for (var i = 1; i <= pages_count; i++) {
        pages_counter.push(i);
    }
    let pages = pages_counter.map(page => (
        <NavLink current={bookings.current_page === page} className={bookings.is_first_page && page === 1 ? 'active' : ''}
            onClick={props.fetchBookings.bind(this, active, page)}
            key={`pagination-${props.bookingsLabel}-${active}-${page}`}
            to={`/bookings/${props.bookingsLabel}/${active}/${page}`}>{page}</NavLink>
    ));

    return (
        <div className="row-fluid">
            <nav aria-label="Page navigation">
                <ul className="pagination pagination-sm">
                    {pages}
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;