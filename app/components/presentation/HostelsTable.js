import React from 'react';
import formatPrice from '../helper/formatPrice';
import moment from 'moment';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import Typography from 'material-ui/Typography';

const HostelsTable = ({bookings, bookings_length, title, current_page, max_per_page, total_cost, average_cost}) => {

    bookings_length || 0;
    if (!bookings_length) {
        return title ? <Typography type="title">{`No ${title.toLowerCase()}`}</Typography> : null;
    }
    const index = (current_page - 1) * max_per_page;
    const items = bookings.map((b, i) => (
        <TableRow key={b._id}>
            <TableCell>{`${i + 1 + index}.`}</TableCell>
            <TableCell>{b.booking_number}</TableCell>
            <TableCell>{formatPrice(b.price)}</TableCell>
            <TableCell>{moment(b.checkin_date, 'DD/MM/YYYY').format('DD/MM/YYYY')}</TableCell>
            <TableCell>{!!b.checkout_date && moment(b.checkout_date, 'DD/MM/YYYY').format('DD/MM/YYYY')}</TableCell>
            <TableCell>{b.hostel_name}</TableCell>
            <TableCell>{b.hostel_address}</TableCell>
        </TableRow>
    ));

    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Total</TableCell>
                        <TableCell>Average</TableCell>
                        <TableCell>Bookings</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell className="info">£ {formatPrice(total_cost)}</TableCell>
                        <TableCell>£ {formatPrice(average_cost)}</TableCell>
                        <TableCell>{bookings_length}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>No.</TableCell>
                        <TableCell>Code</TableCell>
                        <TableCell>£</TableCell>
                        <TableCell>Checkin</TableCell>
                        <TableCell>Checkout</TableCell>
                        <TableCell>Hostel</TableCell>
                        <TableCell>Address</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items}
                </TableBody>
            </Table>
        </div>
    );
};

export default HostelsTable;