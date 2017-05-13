import React from 'react';
import formatPrice from '../helper/formatPrice';
import moment from 'moment';

const HostelsTable = (props) => {

    if (props.hostels.data === undefined) {
        return null;
    }

    let hostels = props.hostels.data;

    if (hostels.bookings_length === undefined) {
        return null;
    }

    let bookings_length = hostels.bookings_length;

    if (!bookings_length) {
        return (
            <div className="row-fluid">
                <p>{`No ${hostels.title.toLowerCase()}`}</p>
            </div>
        );
    }

    let indexCalc = (hostels.current_page - 1) * hostels.max_per_page;

    let bookings = hostels.bookings.map((booking, bookingIndex) => (
        <tr key={booking._id}>
            <td className="text-right">{`${bookingIndex + 1 + indexCalc}.`}</td>
            <td>{booking.booking_number}</td>
            <td className="text-right">{`£ ${formatPrice(booking.price)}`}</td>
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
                        <td className="info">£ {formatPrice(hostels.total_cost)}</td>
                        <td>£ {formatPrice(hostels.average_cost)}</td>
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
        </div>
    );
};

export default HostelsTable;