import React from 'react';
import BottomNavigation, {BottomNavigationButton} from 'material-ui/BottomNavigation';

const Pagination = (props) => {

    if (props[props.bookingLabel].data === undefined) {
        return null;
    }
    const bookings = props[props.bookingLabel].data || {};
    if (!bookings.pages_count || bookings.pages_count <= 1) {
        return null;
    }
    const pages_count = bookings.pages_count;
    const active = bookings.active;
    const pages_counter = [];
    for (var i = 1; i <= pages_count; i++) {
        pages_counter.push(i);
    }

    const style = {
        paddingLeft: 0,
        paddingRight: 0,
        minWidth: '40px',
        maxWidth: '40px',
    };

    const pages = pages_counter.map(page => (
        <BottomNavigationButton style={style} key={page} label={page} href={`/bookings/${props.bookingsLabel}/${active}/${page}`}/>
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
            style={{justifyContent: 'left'}}
            value={bookings.current_page - 1}
            onChange={handleOnChange}
            showLabels
        >
            {pages}
        </BottomNavigation>
    );
};

export default Pagination;