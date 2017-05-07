import React, {Component, PropTypes} from 'react';
import NavLink from './NavLink';

class Pagination extends Component {

    goToPage(page) {
        this.props.getBookingsCallback(this.props.booking_type, this.props.active, page);
    }

    render() {

        if (this.props.bookings_length <= this.props.max_per_page) {
            return null;
        }

        let previous = null;
        let next = null;
        let pages_count = this.props.pages_count;
        let booking_type = this.props.booking_type;
        let active = this.props.active;
        let current_page = this.props.current_page;
        let pages_counter = [];
        for (var i = 1; i <= pages_count; i++) {
            pages_counter.push(i);
        }
        let pages = pages_counter.map((page) => (
            <NavLink className={this.props.is_first_page && page === 1 ? 'active' : ''}
                     onClick={this.goToPage.bind(this, page)} key={`pagination-${booking_type}-${active}-${page}`}
                     to={`/bookings/${booking_type}/${active}/${page}`}>{page}</NavLink>
        ));

        if (!this.props.is_first_page) {
            let previous_page = current_page - 1;
            previous = (
                <NavLink onClick={this.goToPage.bind(this, previous_page)}
                         to={`/bookings/${booking_type}/${active}/${previous_page}`} aria-label="Previous"><span
                    aria-hidden="true">&laquo;</span></NavLink>
            );
        }

        if (!this.props.is_last_page) {
            let next_page = current_page + 1;
            next = (
                <NavLink onClick={this.goToPage.bind(this, next_page)}
                         to={`/bookings/${booking_type}/${active}/${next_page}`} aria-label="Next"><span
                    aria-hidden="true">&raquo;</span></NavLink>
            );
        }

        return (
            <div className="row-fluid">
                <nav aria-label="Page navigation">
                    <ul className="pagination pagination-sm">
                        {previous}
                        {pages}
                        {next}
                    </ul>
                </nav>
            </div>
        );
    }
}

Pagination.propTypes = {
    booking_type: PropTypes.string.isRequired,
    pages_count: PropTypes.number.isRequired,
    bookings_length: PropTypes.number.isRequired,
    max_per_page: PropTypes.number.isRequired,
    current_page: PropTypes.number.isRequired,
    is_first_page: PropTypes.bool.isRequired,
    is_last_page: PropTypes.bool.isRequired,
    active: PropTypes.string.isRequired,
    getBookingsCallback: PropTypes.func.isRequired
};

export default Pagination;

