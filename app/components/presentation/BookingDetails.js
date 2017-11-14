import React from 'react';
import PropTypes from 'prop-types';
import {TableCell, TableRow} from 'material-ui/Table';
import List, {ListItem, ListItemText} from 'material-ui/List';
import moment from 'moment';

const BookingDetails = ({details, isHostel, offset}) => {

    if (!details.length) {
        return null;
    }

    const formatDate = (date) => {
        if (typeof date === 'object') {
            return moment(date).format('DD/MM/YYYY');
        }
        if (typeof date === 'string') {
            return date.match(/\/+/) ? date : moment(date).format('DD/MM/YYYY');
        }

        return '';
    };

    const getPrice = (number) => {
        if (number === 0) {
            return '0.00';
        }
        if (number.toString().match(/\.+/)) {
            return number.toFixed(2);
        }
        return (number / 100).toFixed(2);
    };

    const items = [];
    if (isHostel) {
        details.map(function (row, i) {
            const checkIn = formatDate(row.checkin_date);
            const checkOut = formatDate(row.checkout_date);
            items.push(
                <TableRow key={`${i}hostel`}>
                    <TableCell>
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary={`${i + 1 + (offset || 0)}. ${checkIn} - ${checkOut}`}
                                    secondary={row.hostel_name} />
                            </ListItem>
                        </List>
                    </TableCell>
                    <TableCell>£{getPrice(row.price)}</TableCell>
                </TableRow>
            );
        });
    } else {
        details.map(function (row, i) {
            const departDate = formatDate(row.departure_date);
            const returnDate = row.is_return ? ' - ' + formatDate(row.return_departure_date) : '';
            items.push(
                <TableRow key={i}>
                    <TableCell>
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary={`${i + 1 + (offset || 0)}. ${departDate}${returnDate}`}
                                    secondary={`${row.from} - ${row.to}`} />
                            </ListItem>
                        </List>
                    </TableCell>
                    <TableCell>£{getPrice(row.price)}</TableCell>
                </TableRow>
            );
        });
    }

    return items;
};

BookingDetails.propTypes = {
    details: PropTypes.array.isRequired,
    isHostel: PropTypes.bool,
};

BookingDetails.defaultProps = {
    isHostel: false,
};

BookingDetails.displayName = 'BookingCell';

export default BookingDetails;