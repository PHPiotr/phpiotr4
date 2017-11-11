import React from 'react';
import BottomNavigation, {BottomNavigationButton} from 'material-ui/BottomNavigation';

const Pagination = (props) => {

    if (props[props.bookingsLabel].data === undefined) {
        return null;
    }
    const bookings = props[props.bookingsLabel].data || {};
    if (!bookings.pages_count || bookings.pages_count <= 1) {
        return null;
    }
    const pages_count = bookings.pages_count;
    const active = bookings.active;
    const pages_counter = [];
    for (var i = 1; i <= pages_count; i++) {
        pages_counter.push(i);
    }
    const pages = pages_counter.map(page => (
        <BottomNavigationButton key={page} label={page} href={`/bookings/${props.bookingsLabel}/${active}/${page}`}/>
    ));

    const handleOnChange = (event, value) => {
        event.preventDefault();
        props.fetchBookings(active, value + 1);
        const url = `/bookings/${props.bookingsLabel}/${active}/${value + 1}`;
        if (props.history.location.pathname !== url) {
            props.history.push(url);
        }
    };

    return (
        <BottomNavigation
            value={bookings.current_page - 1}
            onChange={handleOnChange}
            showLabels
        >
            {pages}
        </BottomNavigation>
    );
};

export default Pagination;