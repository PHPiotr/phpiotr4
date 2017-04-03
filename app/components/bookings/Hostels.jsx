import React, {Component, PropTypes} from 'react';
import Nav from '../nav/Nav.jsx';
import Pagination from '../nav/Pagination.jsx';
import Auth from '../hoc/Auth.jsx';
import moment from 'moment';

class Hostels extends Component {

    render() {
        let bookings = this.props.bookings;
        let propsChildren = this.props.children && React.cloneElement(this.props.children, {
            hostels: bookings.hostels,
            hostel: bookings.hostel,
            hostelErrors: bookings.hostelErrors,
            hostelErrorMessage: bookings.hostelErrorMessage,
            hostelInserted: bookings.hostelInserted,
            callbacks: this.props.callbacks,
            socket: this.props.socket,
            getContent: this.getContent.bind(this),
            labelPlural: 'hostels',
            labelSingular: 'hostel'
        });
        return (
            <div>
                <Nav booking="hostels"/>
                {propsChildren}
            </div>
        );
    }

    getContent() {
        let hostels = this.props.bookings.hostels;
        let bookings_length = hostels.bookings_length;

        if (!bookings_length) {
            return (
                <div className="row-fluid">
                    <p>{`No ${hostels.title}`}</p>
                </div>
            );
        }

        let indexCalc = (hostels.current_page - 1) * hostels.max_per_page;

        let bookings = hostels.bookings.map((booking, bookingIndex) => (
            <tr key={booking._id}>
                <td className="text-right">{`${bookingIndex + 1 + indexCalc}.`}</td>
                <td>{booking.booking_number}</td>
                <td className="text-right">{`£ ${this.props.callbacks.formatPrice(booking.price)}`}</td>
                <td>{moment(booking.checkin_date, 'DD/MM/YYYY').format('DD/MM/YYYY')}</td>
                <td>{booking.checkout_date ? moment(booking.checkout_date, 'DD/MM/YYYY').format('DD/MM/YYYY') : ''}</td>
                <td>{booking.hostel_name}</td>
                <td>{booking.hostel_address}</td>
            </tr>
        ));

        return (
            <div>
                <div className="row-fluid">
                    <table className="table table-hover table-condensed table-bordered">
                        <thead>
                        <tr>
                            <th>Total</th>
                            <th>Average</th>
                            <th>Bookings</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="info">£ {this.props.callbacks.formatPrice(hostels.total_cost)}</td>
                            <td>£ {this.props.callbacks.formatPrice(hostels.average_cost)}</td>
                            <td>{hostels.bookings_length}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="row-fluid">
                    <table className="table table-hover table-condensed table-bordered">
                        <thead>
                        <tr>
                            <th></th>
                            <th>Booking number</th>
                            <th className="text-right">Price</th>
                            <th>Checkin date</th>
                            <th>Checkout date</th>
                            <th>Hostel name</th>
                            <th>Hostel address</th>
                        </tr>
                        </thead>
                        <tbody>
                        {bookings}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    booking_type={hostels.selected}
                    pages_count={hostels.pages_count}
                    bookings_length={hostels.bookings_length}
                    max_per_page={hostels.max_per_page}
                    current_page={hostels.current_page}
                    is_first_page={hostels.is_first_page}
                    is_last_page={hostels.is_last_page}
                    active={hostels.active}
                    getBookingsCallback={this.props.callbacks.handleList}
                />
            </div>
        );
    }
}

Hostels.propTypes = {
    hostels: PropTypes.object,
    hostel: PropTypes.object,
    hostelErrors: PropTypes.object,
    hostelInserted: PropTypes.object,
    hostelErrorMessage: PropTypes.string,
};

Hostels.displayName = 'Hostels';

export default Auth(Hostels);

