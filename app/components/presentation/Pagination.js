import React from 'react';
import BottomNavigation, {BottomNavigationButton} from 'material-ui/BottomNavigation';

const Pagination = (props) => {

    const {bookingLabel, bookingsLabel} = props;
    const bookings = props[bookingLabel].data || {};
    const pagesCount = bookings.pages_count;
    const active = bookings.active || 'all';
    if (!pagesCount || pagesCount <= 1) {
        return null;
    }
    const currentPage = bookings.currentPage;
    const style = {paddingLeft: 0, paddingRight: 0, minWidth: '40px', maxWidth: '40px'};
    const pages = [];
    const handleOnChange = (event, page) => {
        event.preventDefault();
        if (page === currentPage) {
            return;
        }
        props.fetchBookings(active, page);
        props.history.push(`/bookings/${bookingsLabel}/${active}/${page}`);
    };
    for (let page = 1; page <= pagesCount; page++) {
        pages.push(<BottomNavigationButton key={page} value={page} label={page} style={style}
            href={`/bookings/${bookingsLabel}/${active}/${page}`}/>);
    }

    return (
        <BottomNavigation style={{justifyContent: 'left'}} value={currentPage} onChange={handleOnChange} showLabels>
            {pages}
        </BottomNavigation>
    );
};

export default Pagination;